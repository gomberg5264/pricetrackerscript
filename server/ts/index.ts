import * as admin from 'firebase-admin'
import FirebaseConnector from './firebase_connector'
import * as serviceAccount from './service_account.json'

admin.initializeApp({
    // @ts-ignore -> suppressing service account error
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bot-olaus.firebaseio.com"
})

const firebaseConnector: FirebaseConnector = new FirebaseConnector()

const formattedTimeStamp: Function = () => {
    const date: Date = new Date()
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`
}

const processLogMessage: Function = (statusMessage) => {
    return `[server]: ${formattedTimeStamp()}\t-->\t${statusMessage}`
}

FirebaseConnector.getInstance().getAndAddDataForAllItems()
    .then((success) => {
        console.log(processLogMessage(success))
        process.exit()
    })