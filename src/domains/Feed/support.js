import { get } from 'lodash'
import $http from 'src/services/http'

export const getMettersToApi = metters => metters || 3

export const getFilter = (filterObject = {}) => {
  return {
    type: filterObject.type || 'all',
    metters: getMettersToApi(filterObject.metters || 3)
  }
}

export const buildLoadFeedURL = (payload = {}) => {
  const type = payload.type || 'all'
  const page = payload.page || 1

  return `/api/search/all?type=${type}&page=${page}`
}

export const getFeed = payload => {
  return $http
    .get(buildLoadFeedURL(payload))
    .then(axiosData => get(axiosData, 'data', []))
}
