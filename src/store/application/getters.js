import { get } from 'lodash'

export function hasCoordinateError (state) {
  return get(state, 'coordinates.error', null)
}
