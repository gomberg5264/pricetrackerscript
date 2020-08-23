import * as admin from 'firebase-admin'
import FirebaseConnector from './firebase_connector'
import * as serviceAccount from '../../service_account.json'

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bot-olaus.firebaseio.com"
})
const firebaseConnector = new FirebaseConnector()

FirebaseConnector.getInstance().getAndAddDataForAllItems().then((confirm) => console.log(confirm))

// TODO: Have the bot start as windows boots and run the fetch-script at a specific time. This way it can be run as a service on a server.
// TODO: Visualize the price history of each item on an html site with chart.js and react / vue / angular or only express.