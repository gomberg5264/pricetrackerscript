import firebase from 'firebase/app'
import { firebaseConfig } from './firebase_config'
import FirebaseConnector from './firebase_connector'

firebase.initializeApp(firebaseConfig)

const firebaseConnector = new FirebaseConnector()
FirebaseConnector.getInstance().writeItemData('samsung-ultrawide-gaming-monitor')