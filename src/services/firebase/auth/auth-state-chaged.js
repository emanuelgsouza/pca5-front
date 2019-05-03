import { firebase } from 'src/services/firebase'

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(resolve)
  })
}

export default onAuthStateChanged
