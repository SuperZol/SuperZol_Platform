from math import radians, sin, cos, sqrt, atan2
from typing import Dict, List


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

    def get_cheapest_supermarkets(self, shopping_list: Dict[str, int], user_lat: float, user_lng: float,
                                  distance_preference: float) -> List[Dict[str, float]]:
        stores = self.supermarket_collection.find()
        store_costs = []
        for store in stores:
            store_id = store['StoreId']
            distance = self.get_supermarket_distance(store, distance_preference, user_lat, user_lng)
            if distance is None:
                continue
            cart_info = self.calculate_cart_prices(shopping_list, store_id)
            if cart_info:
                store_costs.append({
                    'store_id': store_id,
                    'store_address': store['Address'],
                    'store_city': store['City'],
                    'total_cost': cart_info['total_cost'],
                    'products_available': cart_info['products_available'],
                    'distance': distance
                })

        store_costs.sort(key=lambda x: (x['total_cost'], -x['products_available'], x['distance']))
        return store_costs

    def get_supermarket_distance(self, store, distance_preference, user_lat, user_lng):
        store_lat = store.get('Latitude')
        store_lng = store.get('Longitude')
        distance = 0
        if store_lat is None or store_lng is None:
            return None
        if int(store_lat) > 0 and int(store_lng) > 0:
            distance = self.haversine(user_lat, user_lng, store_lat, store_lng)
            if distance > distance_preference:
                return None
        return distance

    def calculate_cart_prices(self, shopping_list: Dict[str, int], store_id: str) -> Dict[str, float]:
        total_cost = 0
        products_available = 0

        for item_code, amount in shopping_list.items():
            product = self.product_collection.find_one({'ItemCode': item_code, 'StoreId': store_id})
            if product:
                total_cost += float(product['ItemPrice']) * amount
                products_available += 1

        if products_available > len(shopping_list) // 2:  # show only supermarkets with at least 50% of the products
            return {
                'total_cost': total_cost,
                'products_available': products_available
            }
