import WebScraper from './webscraper'
import { firebaseConfig } from './firebase_config'
import firebase from 'firebase/app'

const webScraper = new WebScraper()

firebase.initializeApp(firebaseConfig)
const database = firebase.database()
