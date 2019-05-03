export default user => {
  return Promise.resolve({
    ...user,
    is_first_login: false
  })
}// Mexer nessa treta futuramente
