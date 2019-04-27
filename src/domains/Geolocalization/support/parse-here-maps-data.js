import { get, isEmpty, first, toNumber, isNil, find } from 'lodash'

const getValueFromKey = key => list => {
  const founded = find(list, ['key', key]) || {}
  return founded.value || null
}

const getCountryName = getValueFromKey('CountryName')

const getStateName = getValueFromKey('StateName')

/**
 * @method parseHereMapsData
 * @param  {HereMapsData<SearchResultType>} data
 * @return {Promise<GeolocationObject>}
 *
 * Description of GeolocationObject
 * {
 *    address: 'Complete Address',
 *    hour_number: '',
 *    district: 'Santa Cruz',
 *    city: 'Duque de Caxias',
 *    state: 'Rio de Janeiro'
 *    short_state: 'RJ'
 *    country: 'Brasil',
 *    short_country: 'BRA'
 * }
 */
const parseHereMapsData = data => {
  const resultView = get(data, 'Response.View') || []

  if (isEmpty(resultView)) {
    return Promise.reject(new Error('No response'))
  }

  if (resultView.length > 1) {
    return Promise.reject(new Error('Too much data'))
  }

  const result = first(first(resultView).Result)
  const addressResult = get(result, 'Location.Address')
  const _get = path => get(addressResult, path, null)
  const additionalData = _get('AdditionalData')

  return {
    address: _get('Label'),
    street: _get('Street'),
    house_number: isNil(_get('HouseNumber')) ? null : toNumber(_get('HouseNumber')),
    district: _get('District'),
    city: _get('City'),
    state: getStateName(additionalData),
    short_state: _get('State'),
    country: getCountryName(additionalData),
    short_country: _get('Country')
  }
}

export default parseHereMapsData
