import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCCZ0CpX20B7pKb95JirXUmGF8QubE-VA0",
    authDomain: "host-horizon-events.firebaseapp.com",
    projectId: "host-horizon-events",
    storageBucket: "host-horizon-events.firebasestorage.app",
    messagingSenderId: "916808612161",
    appId: "1:916808612161:web:c78cb858deef4992bdc9c0",
    measurementId: "G-0VY6X26V39"
  };

  const app = getApps().find(app => app.name === 'hostApp') || initializeApp(firebaseConfig, 'hostApp')


const hostAuth = getAuth(app)
const hostProvider = new GoogleAuthProvider()
const hostFirestore = getFirestore(app)

export { hostAuth, hostProvider, hostFirestore }
