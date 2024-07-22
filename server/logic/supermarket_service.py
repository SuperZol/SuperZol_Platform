import os
from math import radians, sin, cos, sqrt, atan2
from typing import Dict, List
from concurrent.futures import ThreadPoolExecutor, as_completed

from server.data.cheapest_supermarkets_request import CheapestSupermarketsRequest


class SupermarketService:
    def __init__(self, product_collection, supermarket_collection):
        self.product_collection = product_collection
        self.supermarket_collection = supermarket_collection

    @staticmethod
    def haversine(lat1, lon1, lat2, lon2):
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        lon = lon2 - lon1
        lat = lat2 - lat1
        a = sin(lat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(lon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        radius = 6371  # Radius of Earth in kilometers
        return radius * c

    async def get_cheapest_supermarkets(self, request: CheapestSupermarketsRequest) -> List[Dict]:
        stores = list(self.supermarket_collection.find())

        with ThreadPoolExecutor(max_workers=os.cpu_count()) as executor:
            futures = [
                executor.submit(self.get_relevant_stores, chunk, request.shopping_list, request.lat, request.lng,
                                request.distance_preference)
                for chunk in self.store_chunk(stores)
            ]

            stores_in_range = []
            for future in as_completed(futures):
                stores_in_range.extend(future.result())

        stores_in_range.sort(key=lambda x: (x['total_cost'], -x['products_available'], x['distance']))
        return stores_in_range

    @staticmethod
    def store_chunk(stores):
        n = len(stores)
        chunk_size = max(1, n // os.cpu_count())
        return [stores[i:i + chunk_size] for i in range(0, n, chunk_size)]

    def get_relevant_stores(self, stores_chunk: List[Dict], shopping_list: Dict[str, int], user_lat: float,
                            user_lng: float, distance_preference: float) -> List[Dict]:
        stores = []
        for store in stores_chunk:
            store_id = store['StoreId']
            if store.get('Latitude') is None or store.get('Longitude') is None:
                continue
            distance = self.haversine(user_lat, user_lng, store.get('Latitude', 0), store.get('Longitude', 0))
            if distance > distance_preference:
                continue

            store_products = self.product_collection.find(
                {"StoreId": store_id, "ItemCode": {"$in": list(shopping_list.keys())}})
            cart_info = self.calculate_cart_prices(shopping_list, store_products)

            if cart_info:
                stores.append({
                    'store_id': store_id,
                    'store_address': store['Address'],
                    'store_city': store['City'],
                    'total_cost': cart_info['total_cost'],
                    'products_available': cart_info['products_available'],
                    'distance': distance
                })
        return stores

    @staticmethod
    def calculate_cart_prices(shopping_list: Dict[str, int], store_products) -> Dict[str, float]:
        total_cost = 0
        products_available = 0

        product_dict = {product['ItemCode']: product for product in store_products}
        for item_code, amount in shopping_list.items():
            product = product_dict.get(item_code)
            if product:
                total_cost += float(product['ItemPrice']) * amount
                products_available += 1

        if products_available > len(shopping_list) // 2:  # show only supermarkets with at least 50% of the products
            return {
                'total_cost': total_cost,
                'products_available': products_available
            }
        return {}
