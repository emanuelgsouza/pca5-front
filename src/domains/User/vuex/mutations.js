import * as TYPES from './mutation-types'

export default {
  [ TYPES.SET_USER ] (store, obj) {
    store.user = obj
  },
  [ TYPES.SET_TOKEN ] (store, token) {
    store.token = token
  },
  [ TYPES.CLEAR_USER ] (store) {
    store.user = null
    store.token = null
  },
  [ TYPES.CLEAR_ERROR ] (store) {
    store.error = false
    store.error_message = null
  },
  [ TYPES.SET_USER_LOADING ] (store) {
    console.log('auth/setUserLoading')
    store.loadingUser = true
  },
  [ TYPES.CLEAR_USER_LOADING ] (store) {
    console.log('auth/clearUserLoading')
    store.loadingUser = false
  },
  [ TYPES.SET_WAS_LOGIN ] (store, value) {
    console.log('auth/setWasLogin: ' + value)
    store.wasLogin = value
  }
}
