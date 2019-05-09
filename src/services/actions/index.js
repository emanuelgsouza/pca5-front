// import http from 'src/services/http'

/**
 * @method createPost
 * @param  {Object} product
 * @param  {String} tipo
 * @return {Promise<Object>}
 */
export const createPost = (product, tipo) => {
  return Promise.resolve({ product, tipo })
  // @TODO: substituir com a chamada abaixo
  // return http
  //   .post('/api/post/add', product, {
  //     params: {
  //       tipo
  //     }
  //   })
}
