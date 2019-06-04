import { get } from 'lodash'

export function hasCoordinateError (state) {
  return get(state, 'coordinates.error', null)
}

export function getDataFromFeed (state) {
  return get(state, 'feed.data', [])
}

// export function feedDocs (state) {
//   return get(state, 'feed.docs', [])
// }
