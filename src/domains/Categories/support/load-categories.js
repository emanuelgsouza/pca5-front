// import http from 'src/services/http'

const loadCategories = () => {
  // return http
  //   .get('/categories')
  return Promise.resolve([
    { name: 'Moda', id: 'modal' },
    { name: 'Comida', id: 'comida' }
  ])
}

export default loadCategories
