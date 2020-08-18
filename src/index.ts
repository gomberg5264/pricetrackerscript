import firebase from 'firebase/app'
import { firebaseConfig } from './firebase_config'
import FirebaseConnector from './firebase_connector'

firebase.initializeApp(firebaseConfig)

const firebaseConnector = new FirebaseConnector()
// FirebaseConnector.getInstance().writeItemData('samsung-ultrawide-gaming-monitor')
// FirebaseConnector.getInstance().addItemToTrackingList('samsung-ultrawide-gaming-monitor', '').then((items) => console.log(items))

// FirebaseConnector.getInstance().getTrackedItemKeys().then((items) => console.log(items))
FirebaseConnector.getInstance().getTrackedItems().then((items) => console.log(typeof(items)))