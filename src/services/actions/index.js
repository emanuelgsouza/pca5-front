import http from 'src/services/http'
import factoryPost from './factory-post'

/**
 * @method createPost
 * @param  {Object} body
 * @param  {String} type
 * @return {Promise<Object>}
 */
export const createPost = (body, type, coordinates) => {
  // @TODO: substituir com a chamada abaixo
  const data = factoryPost(body, type, coordinates)
  return http
    .post('/api/post/add', data, {
      params: {
        tipo: type
      }
    })
}
