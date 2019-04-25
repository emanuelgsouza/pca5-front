import load from 'src/domains/Geolocalization/support/load-coordinates'
import getCategories from 'src/domains/Categories/support/load-categories'
import * as TYPES from './mutation-types'

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
