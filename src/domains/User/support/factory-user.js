const factoryUser = userFromGoogle => {
  return {
    name: userFromGoogle.displayName,
    email: userFromGoogle.email,
    uid: userFromGoogle.uid
  }
}

export default factoryUser
