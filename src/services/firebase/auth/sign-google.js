import firebase from '../firebase'
import { wasLogin } from 'src/domains/User/support/localforage'

export default () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  return wasLogin(true)
    .then(() => {
      return firebase
        .auth()
        .signInWithRedirect(provider)
    })
}
