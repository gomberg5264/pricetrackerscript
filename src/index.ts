import firebase from 'firebase/app'
import { firebaseConfig } from './firebase_config'
import FirebaseConnector from './firebase_connector'

firebase.initializeApp(firebaseConfig)

const firebaseConnector = new FirebaseConnector()

FirebaseConnector.getInstance().addItemToTrackingList('touch-tennis-floor-lines',
    'https://www.amazon.de/gp/product/B07PDGY8Y8/ref=ox_sc_saved_title_1?smid=A2LDWKTP76QY65&psc=1')
    .then((confirm) => console.log(confirm))


// TODO: Have the bot start as windows boots and run the fetch-script at a specific time. This way it can be run as a service on a server.
// TODO: Visualize the price history of each item on an html site with chart.js and react / vue / angular or only express.


