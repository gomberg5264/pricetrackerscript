from typing import List, Dict
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db as database

class FireBaseFetch:
    '''Fetches item data from Firebase's realtime database.'''
    def __init__(self):
        self.__firebase_database = database

    def get_item_data(self, json_item_name: str) -> Dict[str, str]: 
        '''Fetches stored data of the passed item'''
        return self.__firebase_database.reference(f'tracked-items/{json_item_name}/data').get()

    def get_tracked_item_keys(self) -> List[str]:
        '''Fetches the names of all tracked items.'''
        return self.__firebase_database.reference(f'tracked-items/').get().keys()

firebase_admin.initialize_app(credentials.Certificate('page/service_account.json'), {
    'databaseURL': 'https://bot-olaus.firebaseio.com/'
})

firebase_fetch = FireBaseFetch()
# print(list(firebase_fetch.get_item_data('samsung-ultrawide-gaming-monitor').keys()))
# print(firebase_fetch.get_tracked_item_keys())
# print(list(firebase_fetch.get_item_data('samsung-ultrawide-gaming-monitor').values()))
