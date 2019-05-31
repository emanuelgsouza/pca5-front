import { get } from 'lodash'
import http from 'src/services/http'
import { logout } from 'src/services/firebase/auth'
import { setToken } from 'src/services/http/client'
import * as TYPES from './mutation-types'
import factoryUser from 'src/domains/User/support/factory-user'

export const login = ({ commit, dispatch }, userObject) => {
  const user = factoryUser(userObject)
  commit(TYPES.SET_USER, user)
  return http
    .post('/auth/login', user)
    .then(data => {
      setToken(get(data, 'data.token', ''))

      return dispatch('loadUserInformation')
    })
    .catch(err => {
      commit(TYPES.SET_ERROR, err.message)
      commit(TYPES.CLEAR_USER_LOADING)

      return Promise.reject(err.message)
    })
}

export const loadUserInformation = ({ commit, state }) => {
  return http
    .get('/auth/me')
    .then(data => {
      const user = get(data, 'data.user', {})
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

export const logoutUser = ({ commit }) => {
  return logout()
    .then(() => {
      commit(TYPES.CLEAR_USER)
      return Promise.resolve()
    })
}
