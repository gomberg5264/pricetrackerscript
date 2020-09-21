import express from 'express'
import * as admin from 'firebase-admin'
import { Expression } from 'typescript'
import FirebaseConnector from './firebase_connector'
import * as serviceAccount from './service_account.json'

admin.initializeApp({
    // @ts-ignore -> suppressing service account error
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bot-olaus.firebaseio.com"
})

const APP: express.Application = express()
const SERVER_PORT: number = 8081
const ONE_DAY: number = 86400000
const firebaseConnector: FirebaseConnector = new FirebaseConnector()

const formattedTimeStamp: Function = () => {
    const date: Date = new Date()
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`
}

const processLogMessage: Function = (statusMessage) => {
    let logMessage = `[server]: ${formattedTimeStamp()}\t-->\t${statusMessage}`
}

APP.listen(SERVER_PORT, () => { 
    console.log(`[server]: Server now running at https://localhost:${SERVER_PORT}\n`)
    FirebaseConnector.getInstance().getAndAddDataForAllItems()
        .then((confirm) => processLogMessage(confirm))
    setInterval(() => {
        FirebaseConnector.getInstance().getAndAddDataForAllItems()
            .then((confirm) => processLogMessage(confirm))
    }, ONE_DAY)
})  