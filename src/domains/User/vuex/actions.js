// import http from 'src/services/http'
// import { setToken } from 'services/http/client'
import * as TYPES from './mutation-types'
import factoryUser from 'src/domains/User/support/factory-user'

export const login = ({ commit, dispatch }, userObject) => {
  commit(TYPES.SET_USER, factoryUser(userObject))
  return dispatch('loadUserInformation')
  // return http
  //   .post('/login', userObject)
  //   .then(token => {
  //     setToken(token)

  //     return dispatch('getMe')
  //   })
  //   .catch(err => {
  //     commit(TYPES.SET_ERROR, err.message)
  //     commit(TYPES.CLEAR_USER_LOADING)

  //     return Promise.reject(err.message)
  //   })
}

export const loadUserInformation = ({ commit, state }) => {
  // return http
  // .get('/me')
  // @TODO: remover a chamada de state
  return Promise.resolve(state.user)
    .then(user => {
      commit(TYPES.CLEAR_USER_LOADING)
      commit(TYPES.SET_USER, user)

      return Promise.resolve(user)
    })
    .catch(err => {
      commit(TYPES.CLEAR_USER_LOADING)
      // commit(TYPES.SET_ERROR, err.message)

      return Promise.reject(err.message)
    })
}
