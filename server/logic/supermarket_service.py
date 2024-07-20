import os
from math import radians, sin, cos, sqrt, atan2
from typing import Dict, List
from pymongo import MongoClient
from concurrent.futures import ThreadPoolExecutor, as_completed


class AlgorithmService:
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

    async def get_cheapest_supermarkets(self, shopping_list: Dict[str, int], user_lat: float, user_lng: float,
                                        distance_preference: float) -> List[Dict[str, float]]:
        stores = list(self.supermarket_collection.find())
        products = list(self.product_collection.find())

        with ThreadPoolExecutor(max_workers=os.cpu_count()) as executor:
            futures = [
                executor.submit(self.get_relevant_stores, chunk, products, shopping_list, user_lat, user_lng,
                                distance_preference)
                for chunk in self.store_chunk(stores)
            ]

            store_costs = []
            for future in as_completed(futures):
                store_costs.extend(future.result())

        store_costs.sort(key=lambda x: (x['total_cost'], -x['products_available'], x['distance']))
        return store_costs

    @staticmethod
    def store_chunk(stores):
        n = len(stores)
        chunk_size = max(1, n // os.cpu_count())
        return [stores[i:i + chunk_size] for i in range(0, n, chunk_size)]

    def get_relevant_stores(self, stores_chunk: List[Dict], products: List[Dict], shopping_list: Dict[str, int],
                            user_lat: float, user_lng: float, distance_preference: float) -> List[Dict[str, float]]:
        store_costs = []
        for store in stores_chunk:
            store_id = store['StoreId']
            distance = self.haversine(user_lat, user_lng, store.get('Latitude', 0),
                                      store.get('Longitude', 0))
            if distance > distance_preference:
                continue
            cart_info = self.calculate_cart_prices(shopping_list, products, store_id)
            if cart_info:
                store_costs.append({
                    'store_id': store_id,
                    'store_address': store['Address'],
                    'store_city': store['City'],
                    'total_cost': cart_info['total_cost'],
                    'products_available': cart_info['products_available'],
                    'distance': distance
                })
        return store_costs

    @staticmethod
    def calculate_cart_prices(shopping_list: Dict[str, int], products: List[Dict], store_id: str) -> Dict[str, float]:
        total_cost = 0
        products_available = 0

        for item_code, amount in shopping_list.items():
            product = next((product for product in products if
                            product['ItemCode'] == item_code and product['StoreId'] == store_id), None)
            if product:
                total_cost += float(product['ItemPrice']) * amount
                products_available += 1

        if products_available > len(shopping_list) // 2:  # show only supermarkets with at least 50% of the products
            return {
                'total_cost': total_cost,
                'products_available': products_available
            }
        return {}
