import axios from 'axios'

/**
 * @method factoryHttp
 * @param  {Object} options
 * @return {Object} AxiosInstance
 */
const factoryHttp = options => axios.create({
  baseURL: process.env.API_URL,
  ...options
})

// global instance
const http = factoryHttp()

const setToken = token => {
  http.defaults.headers.Authorization = `Bearer ${token}`
}

export { http, factoryHttp, setToken }
