import http from 'services/http'
import { setToken } from 'services/http/client'
import * as TYPES from './mutation-types'

export const login = ({ commit, dispatch }, userObject) => {
  commit(TYPES.SET_USER_LOADING)

  return http
    .post('/login', userObject)
    .then(token => {
      setToken(token)

      return dispatch('getMe')
    })
    .catch(err => {
      commit(TYPES.SET_ERROR, err.message)
      commit(TYPES.CLEAR_USER_LOADING)

      return Promise.reject(err.message)
    })
}

export const getMe = ({ commit }) => {
  return http
    .get('/me')
    .then(user => {
      commit(TYPES.CLEAR_USER_LOADING)
      commit(TYPES.SET_USER, user)
      return Promise.resolve(user)
    })
    .catch(err => {
      commit(TYPES.CLEAR_USER_LOADING)
      commit(TYPES.SET_ERROR, err.message)

      return Promise.reject(err.message)
    })
}
