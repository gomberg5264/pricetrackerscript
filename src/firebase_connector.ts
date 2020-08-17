import { firebaseConfig } from './firebase_config'
import firebase from 'firebase/app'


/**
 * Handles the connection between app and Firebase.
 * 
 * @author Nicolaus Rossi
 * @since 2020-8-17
 */
export default class FirebaseConnector {
    private static instance: FirebaseConnector
    private firebaseDatabase = firebase.database()

    constructor() {
        if (FirebaseConnector.instance) {
            throw new Error('Firebase-Connector has already been instantiated!')
        }
        FirebaseConnector.instance = this
    }

    public static getInstance(): FirebaseConnector {
        return FirebaseConnector.instance
    }
}
