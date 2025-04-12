import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxFrF36ICL4zJSIpajn1v8DFhVembztRc",
  authDomain: "horizon-events-7bb71.firebaseapp.com",
  projectId: "horizon-events-7bb71",
  storageBucket: "horizon-events-7bb71.firebasestorage.app",
  messagingSenderId: "987819852321",
  appId: "1:987819852321:web:723f1a8c1abec2db395960",
  measurementId: "G-029QQTDQ1Z"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export { auth, db, provider }