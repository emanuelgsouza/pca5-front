import { isNil, get, isEmpty } from 'lodash'
import load from 'src/domains/Geolocalization/support/load-coordinates'
import getAddress from 'src/domains/Geolocalization/support/load-address'
import getCategories from 'src/domains/Categories/support/load-categories'
import * as TYPES from './mutation-types'
// import { feedDataMock } from 'src/domains/Feed/mock'
import $http from 'src/services/http'

const buildLoadFeedURL = payload => {
  const type = payload.type || 'all'
  const page = payload.page || 1

  return `/api/search/all?type=${type}&page=${page}`
}

export function loadCoordinates ({ commit }) {
  return load()
    .then(coordinates => {
      commit(TYPES.SET_COORDINATES, coordinates)
    })
    .catch(err => {
      console.error(err)

      commit(TYPES.SET_COORDINATES_ERROR, err)
    })
}

export function loadCategories ({ commit }) {
  return getCategories()
    .then(categories => {
      commit(TYPES.SET_CATEGORIES, categories)
    })
    .catch(err => {
      console.error(err)
      const erroObj = {
        message: 'Erro ao buscar as categorias'
      }

      commit(TYPES.SET_ERROR, erroObj)
    })
}

export function loadAddress ({ state }) {
  const { coordinates } = state
  const { lat, lon } = coordinates

  if (isNil(lat) || isNil(lon)) {
    return Promise.resolve(true)
  }

  return getAddress(lat, lon)
}

export function loadFeed ({ commit }, payload = {}) {
  // const filter = payload.filter || {}
  commit(TYPES.SET_FEED_LOADING, true)
  // TODO: pensar em quando der merda na execução do código, mostrar um erro para o usuário relacionado ao feed

  return $http
    .get(buildLoadFeedURL(payload))
    .then(result => {
      const feedData = get(result, 'data', [])
      commit(TYPES.SET_FEED, feedData)
      commit(TYPES.SET_FEED_LOADING, false)

      if (isEmpty(feedData)) {
        commit(TYPES.SET_STOP_FEED_LOADING)
      }
      return Promise.resolve(feedData)
    })
}
