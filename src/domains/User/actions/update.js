import http from 'src/services/http'

export default user => http.post('/auth/update', user)
