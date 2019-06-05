import { get } from 'lodash'
import $http from 'src/services/http'

export const getMettersToApi = metters => metters || 3

export const getFilter = (filterObject = {}) => {
  return {
    type: filterObject.type || 'all',
    metters: getMettersToApi(filterObject.metters || 3)
  }
}

export const buildLoadFeedURL = (filter = {}, pagination = {}) => {
  const type = filter.type || 'all'
  const page = pagination.page || 1

  return `/api/search/all?type=${type}&page=${page}`
}

export const getFeed = (filter, pagination) => {
  return $http
    .get(buildLoadFeedURL(filter, pagination))
    .then(axiosData => get(axiosData, 'data', []))
}
