import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAAi_lDUe9ihvgn5qkHXtsU4FcGvkcJdUs",
    authDomain: "chat-app-3c2c1.firebaseapp.com",
    projectId: "chat-app-3c2c1",
    storageBucket: "chat-app-3c2c1.appspot.com",
    messagingSenderId: "213485822163",
    appId: "1:213485822163:web:6e8b4a969e03daea897426"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }