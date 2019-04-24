import { firebase } from 'services/firebase'
import * as TYPES from 'domains/User/vuex/mutation-types'
import { wasLogin, getWasLogin } from 'src/domains/User/support/localforage'

const initializeApp = async store => {
  // Para ter certeza que estou dizendo que vou capturar dados do usuário
  store.commit(`auth/${TYPES.SET_USER_LOADING}`)
  console.log('Get user information')

  const value = await getWasLogin()
  store.commit(`auth/${TYPES.SET_WAS_LOGIN}`, value)

  // firebase.initializeApp()
  firebase.auth().onAuthStateChanged(async user => {
    console.log('User information loaded')

    await wasLogin(false)

    if (!user) {
      store.commit(`auth/${TYPES.CLEAR_USER_LOADING}`)
      store.commit(`auth/${TYPES.CLEAR_USER}`)
      return
    }

    store.dispatch('auth/login', user)
  })
}
export default [ initializeApp ]
