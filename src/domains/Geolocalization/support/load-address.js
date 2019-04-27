// import http from 'src/services/http'

/**
 * @method loadAddress
 * @param  {Number} lat
 * @param  {Number} lon
 * @return {Promise<Object>}
 */
const loadAddress = (lat, lon) => {
  // return http
  //   .get(`/geolocation?lat=${lat}&lon=${lon}`)
  return Promise.resolve({
    state: 'Rio de Janeiro',
    city: 'Duque de Caxias',
    address: 'Rua Sem Número',
    number: 20
  })
}

export default loadAddress
