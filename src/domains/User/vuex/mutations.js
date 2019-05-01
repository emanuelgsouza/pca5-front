import * as TYPES from './mutation-types'

export default {
  [ TYPES.SET_USER ] (state, obj) {
    state.user = obj
  },
  [ TYPES.SET_TOKEN ] (state, token) {
    state.token = token
  },
  [ TYPES.CLEAR_USER ] (state) {
    state.user = null
    state.token = null
  },
  [ TYPES.CLEAR_ERROR ] (state) {
    state.error = false
    state.error_message = null
  },
  [ TYPES.SET_USER_LOADING ] (state) {
    console.log('auth/setUserLoading')
    state.loadingUser = true
  },
  [ TYPES.CLEAR_USER_LOADING ] (state) {
    console.log('auth/clearUserLoading')
    state.loadingUser = false
  },
  [ TYPES.SET_WAS_LOGIN ] (state, value) {
    console.log('auth/setWasLogin: ' + value)
    state.wasLogin = value
  }
}
