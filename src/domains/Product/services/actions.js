import http from 'src/services/http'

/**
 * @method createProduct
 * @param  {Object} product
 * @return {Promise<Object>}
 */
export const createProduct = (product) => {
  return http
    .post('/product', product)
}
