const factoryUser = userFromGoogle => {
  return {
    name: userFromGoogle.displayName,
    email: userFromGoogle.email,
    uid: userFromGoogle.uid,
    is_first_login: true // @TODO: remover quando o login estiver funcionando
  }
}

export default factoryUser
