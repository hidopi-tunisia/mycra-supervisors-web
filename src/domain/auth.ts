import { app } from '@/domain'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'

const auth = getAuth(app)

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}
const signOut = () => {
  return auth.signOut()
}
const onAuthStateChanged = (callback) => {
  auth.onAuthStateChanged(callback)
}
const currentUser = () => {
  return auth.currentUser
}
const getAuthorization = () => {
  return auth.currentUser.getIdToken(true)
}
const sendResetPasswordEmail = (email) => {
  return sendPasswordResetEmail(auth, email)
}
export {
  onAuthStateChanged,
  signIn,
  signOut,
  currentUser,
  getAuthorization,
  sendResetPasswordEmail
}
