import firebase from 'firebase/app'
import { firebaseConfig } from './firebase_config'
import FirebaseConnector from './firebase_connector'

firebase.initializeApp(firebaseConfig)

const firebaseConnector = new FirebaseConnector()
// FirebaseConnector.getInstance().writeItemData('huanuo-monitor-holder')
// FirebaseConnector.getInstance().addItemToTrackingList('samsung-ultrawide-gaming-monitor', '').then((items) => console.log(items))

// FirebaseConnector.getInstance().getTrackedItemKeys().then((items) => console.log(items))
// FirebaseConnector.getInstance().getTrackedItemKeys().then((items) => items.forEach(item => console.log(item)))

/*
*/

// FirebaseConnector.getInstance().getTrackedItemKeys().then((itemKeys) => console.log(itemKeys))
FirebaseConnector.getInstance().addItemToTrackingList('touch-tennis-floor-lines',
    'https://www.amazon.de/gp/product/B07PDGY8Y8/ref=ox_sc_saved_title_1?smid=A2LDWKTP76QY65&psc=1')
    .then((conf) => console.log(conf))

