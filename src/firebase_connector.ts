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
    public writeItemData(jsonItemName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getItemUrl(jsonItemName).then((url: string) => {
                this.webScraper.fetchItemPrice(url).then((price) => {
                    this.firebaseDatabase.ref(`tracked-items/${jsonItemName}/data`).child(this.getFormattedDate()).set(price)
                    resolve('Data successfully saved to database!')
                })
            })
            .catch((error) => reject(error))
        })
    }

    /**
     * Adds a new item to the list and initialises it's data with the current price.
     * (since Firebase does not allow to push empty JSON maps :c.)
     * @param jsonItemName name of the new item.
     * @param itemUrl the url to the new item.
     */
    public addItemToTrackingList(jsonItemName: string, itemUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getTrackedItems().then((items) => {
                if (Object.keys(items).includes(jsonItemName)) {
                    reject('Duplicate item key detected!')
                    return
                }
                this.firebaseDatabase.ref(`tracked-items`).child(jsonItemName)
                    .child('url').set(itemUrl)
                    .then(() => resolve('Item has been added to the database successfully!'))
                    .catch((error) => reject(error))
                this.writeItemData(jsonItemName)
                    .then((confirm) => resolve(confirm))
                    .catch((error) => reject(error))
            })
        })
    }

    /**
     * Gets all items that have been added to the database.
     */
    public getTrackedItemKeys(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.getTrackedItems()
                .then((items) => resolve(Object.keys(items)))
                .catch((error) => reject(error))
        })
    }

    /**
     * Gets all items that have been added to the database with all their child-properties.
     */
    public getTrackedItems(): Promise<object> {
        return new Promise((resolve, reject) => {
            this.firebaseDatabase.ref(`tracked-items`)
                .once('value')
                .then((snapshot) => resolve(snapshot.val()))
                .catch((error) => reject(error))
        })
    }

    /**
     * Gets the Amazon url of the passed item.
     * @param jsonItemName the item's name in the database.
     */
    public getItemUrl(jsonItemName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.firebaseDatabase.ref(`tracked-items/${jsonItemName}/url`)
                .once('value')
                .then((snapshot) => resolve(snapshot.val()))
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