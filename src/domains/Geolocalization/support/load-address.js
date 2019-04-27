import axios from 'axios'
import parseHereMapsData from './parse-here-maps-data'

/**
 * @method loadAddress
 * @param  {Number} lat
 * @param  {Number} lon
 * @return {Promise<Object>}
 */
const loadAddress = (lat, lon) => {
  const params = {
    prox: `${lat},${lon}`,
    mode: 'retrieveAddresses',
    maxresults: 1,
    app_id: process.env.HERE_APP_ID,
    app_code: process.env.HERE_APP_CODE
  }
  return axios
    .get('https://reverse.geocoder.api.here.com/6.2/reversegeocode.json', { params })
    .then(axiosResponse => axiosResponse.data)
    .then(parseHereMapsData)
}

export default loadAddress
