from math import radians, sin, cos, sqrt, atan2
import requests
from fastapi.responses import JSONResponse
from server.data.product import Product
from typing import List

GOOGLE_MAPS_API_KEY = "AIzaSyCzTsBRe71uehImIT2zSl5JbPEPY8pEJsM"


# 32.088910 - lat
#
# 34.890850 - long
class AlgorithmService:
    def __init__(self, product_collection, user_collection, supermarket_collection):
        self.product_collection = product_collection
        self.user_collection = user_collection
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
    def geocode_address(address: str, city: str, api_key: str):
        full_address = f"{address}" if city is None else f"{city} {address}"
        endpoint = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {'address': full_address, 'key': api_key}
        response = requests.get(endpoint, params=params)
        data = response.json()
        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
        return None, None

    def find_cheapest_supermarkets(self, shopping_list: List[Product], user: dict):
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
                if address:  # Ensure address is not None
                    store_lat, store_lng = self.geocode_address(address, city, GOOGLE_MAPS_API_KEY)
                    if store_lat and store_lng:
                        self.supermarket_collection.update_one({'_id': store['_id']},
                                                               {'$set': {'Latitude': store_lat,
                                                                         'Longitude': store_lng}})
                    else:
                        continue

            distance = self.haversine(user["lat"], user["lng"], store_lat, store_lng)
            if distance > float(user["distance_preference"]):
                continue

            total_cost = 0
            products_available = 0

            for item in shopping_list:
                item_code = item.ItemCode
                quantity = float(item.Quantity)
                print(item_code)
                product = self.product_collection.find_one({'ItemCode': item_code, 'StoreId': store_id})
                if product:
                    total_cost += float(product['ItemPrice']) * quantity
                    products_available += 1

            store_costs.append({
                'store_id': store_id,
                'store_address': store['Address'],
                'store_city': store['City'],
                'total_cost': total_cost,
                'products_available': products_available,
                'distance': distance
            })

        store_costs.sort(key=lambda x: (x['total_cost'], -x['products_available']))
        return store_costs
