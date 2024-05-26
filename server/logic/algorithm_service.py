from math import radians, sin, cos, sqrt, atan2
import requests
from typing import Dict
import os
from dotenv import load_dotenv

current_dir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(current_dir, '../.env'))


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

    @staticmethod
    def geocode_address(address: str, city: str, zip_code: str, api_key: str):
        city_address = f"{address}" if city is None else f"{city} {address}"
        full_address = f"{city_address}" if zip_code is None else f"{city_address} {zip_code}"
        endpoint = os.getenv("GOOGLE_MAPS_URL")
        params = {'address': full_address, 'key': api_key}
        response = requests.get(endpoint, params=params)
        data = response.json()
        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
        return None, None

    def find_cheapest_supermarkets(self, shopping_list: Dict[str, int], user_lat: float, user_lng: float,
                                   distance_preference: str):
        load_dotenv()
        stores = self.supermarket_collection.find()
        store_costs = []
        for store in stores:
            try:
                store_id = store['StoreID']
            except:
                store_id = store['StoreId']

            store_lat = store.get('Latitude')
            store_lng = store.get('Longitude')
            if store_lat is None or store_lng is None:
                city = store.get('City')
                address = store.get('Address')
                zip_code = store.get('ZipCode')
                if address:  # Ensure address is not None
                    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
                    store_lat, store_lng = self.geocode_address(address, city, zip_code, api_key)
                    if store_lat and store_lng:
                        self.supermarket_collection.update_one({'_id': store['_id']},
                                                               {'$set': {'Latitude': store_lat,
                                                                         'Longitude': store_lng}})
                    else:
                        continue

            distance = self.haversine(user_lat, user_lng, store_lat, store_lng)
            if distance > float(distance_preference):
                continue

            total_cost = 0
            products_available = 0

            for item_code, amount in shopping_list.items():
                product = self.product_collection.find_one({'ItemCode': item_code, 'StoreId': store_id})
                if product:
                    total_cost += float(product['ItemPrice']) * amount
                    products_available += 1
            if products_available > len(shopping_list) // 2:  # show only supermarkets with at least 50% of the products
                store_costs.append({
                    'store_id': store_id,
                    'store_address': store['Address'],
                    'store_city': store['City'],
                    'total_cost': total_cost,
                    'products_available': products_available,
                    'distance': distance
                })

        store_costs.sort(key=lambda x: (x['total_cost'], -x['products_available'], x['distance']))
        return store_costs
