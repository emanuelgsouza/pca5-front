import * as TYPES from './mutation-types'
import { getFilter } from 'src/domains/Feed/support'

export default {
  [ TYPES.SET_COORDINATES ] (state, coordinates) {
    const { coords } = coordinates
    state.coordinates = {
      lat: coords.latitude,
      lon: coords.longitude,
      accuracy: coords.accuracy,
      error: false,
      errorCode: null,
      errorMessage: null
    }
  },
  [ TYPES.SET_COORDINATES_ERROR ] (state, positionError) {
    state.coordinates = {
      lat: null,
      lon: null,
      accuracy: null,
      error: true,
      errorCode: positionError.code,
      errorMessage: positionError.message
    }
  },
  [ TYPES.SET_CATEGORIES ] (state, categories) {
    state.categories = [ ...categories ]
  },
  [ TYPES.SET_ERROR ] (state, erroObj) {
    state.hasError = true
    state.errorMessage = erroObj.message
  },
  [ TYPES.SET_FEED ] (state, feed) {
    state.feed = [ ...state.feed, ...feed ]
  },
  [ TYPES.RESET_FEED ] (state, feed) {
    state.feed = [ ...feed ]
  },
  [ TYPES.STOP_FEED ] (state) {
    state.stopFeed = false
  },
  [ TYPES.SET_FEED_LOADING ] (state, loading) {
    state.feedLoading = loading
  },
  [ TYPES.SET_STOP_FEED_LOADING ] (state) {
    state.stopFeed = true
  },
  [ TYPES.SET_FILTER ] (state, filterObject) {
    state.filter = getFilter(filterObject)
  }
}
