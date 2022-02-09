import { actions } from "../redux/adminAuth-reducer"
import firebase from "firebase";

export const apiAdmin = {
  async signIn(email: string, password: string, dispatch: any) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { 
      })
      .catch((error) => {
        dispatch(actions.setLoginError(error.message))
      })
  },
  signOut() {
    firebase.auth().signOut().catch((error) => {
      console.error(error.code, error.message)
    })
  },
}