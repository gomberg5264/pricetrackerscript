import firebase from 'firebase'
import WebScraper from './webscraper'

/**
 * Handles the connection and data transfer between app and Firebase.
 * 
 * @author Nicolaus Rossi
 * @since 2020-8-17
 */
export default class FirebaseConnector {
    private static instance: FirebaseConnector
    private firebaseDatabase: firebase.database.Database = firebase.database()
    private webScraper: WebScraper = new WebScraper()

    constructor() {
        if (FirebaseConnector.instance) {
            throw new Error('Firebase-Connector has already been instantiated!')
        }
        FirebaseConnector.instance = this
    }

    public static getInstance(): FirebaseConnector {
        return FirebaseConnector.instance
    }

    /**
     * Appends the price and date (both at the time of execution) to the data tab of the passed item in the database.
     * @param jsonItemName the item's name in the database.
     */
    public writeItemData(jsonItemName: string): void {
        this.getItemUrl(jsonItemName).then((url: string) => {
            this.webScraper.fetchItemPrice(url).then((price) => {
                this.firebaseDatabase.ref(`tracked-items/${jsonItemName}/data`).child(this.getFormattedDate()).set(price)
            })
        })
    }

    /**
     * Gets the Amazon url to the passed item.
     * @param jsonItemName the item's name in the database.
     */
    private getItemUrl(jsonItemName: string) {
        return new Promise((resolve, reject) => {
            this.firebaseDatabase.ref(`tracked-items/${jsonItemName}/url`)
                .once('value')
                .then((snapshot) => {
                    resolve(snapshot.val())
                })
                .catch((error) => reject(error))
        })
    }
    
    /**
     * Returns the current date in dd-MM-YYYY format.
     * @returns the formatted date.
     */
    private getFormattedDate(): string {
        const date = new Date()
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
    }
}