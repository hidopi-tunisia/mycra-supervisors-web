import { FIREBASE_CONFIG } from '@/config/firebase.config'
import { initializeApp } from 'firebase/app'
const app = initializeApp(FIREBASE_CONFIG)
export { app }
