import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import firebase from './auth/firebaseConfig'

function checkState(auth: Auth) {
  const check = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log(user)
        resolve(user)
      } else {
        console.log("falseだよ")
        reject("error")
      }
    })
  })
  return check
}

export async function isLoggedIn() {
  const auth = getAuth(firebase)
  try {
    await checkState(auth);
  } catch {
    return false
  }
  return true
}

