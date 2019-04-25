const loadCoordinates = () => {
  if ('geolocation' in window.navigator) {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  return Promise.reject(new Error('Não tem acesso'))
}

export default loadCoordinates
