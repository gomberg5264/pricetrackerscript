import os
from pathlib import Path
from dotenv import load_dotenv
from typing import List, Dict
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db as database

class FireBaseFetch:
    '''Fetches item data from Firebase's realtime database.'''
    __instance = None

    def __init__(self):
        if FireBaseFetch.__instance != None:
            raise Exception('FirebaseFetch has already been instantiated!')
        FireBaseFetch.__instance = self
        load_dotenv(dotenv_path = Path('.') / '.env')
        firebase_admin.initialize_app(credentials.Certificate(os.getenv('SERVICE_ACCOUNT')), {
            'databaseURL': 'https://bot-olaus.firebaseio.com/'
        })
        self.__firebase_database = database

    def get_instance(self):
        return FireBaseFetch.__instance

    def get_item_data(self, json_item_name: str) -> Dict[str, str]: 
        '''Fetches stored data of the passed item'''
        return self.__firebase_database.reference(f'tracked-items/{json_item_name}/data').get()

    def get_tracked_item_keys(self) -> List[str]:
        '''Fetches the names of all tracked items.'''
        return self.__firebase_database.reference(f'tracked-items/').get().keys()