import { isNil } from 'lodash'

const factoryUser = userFromGoogle => {
  if (isNil(userFromGoogle)) {
    return null
  }

  return {
    name: userFromGoogle.displayName,
    email: userFromGoogle.email,
    uid: userFromGoogle.uid
  }
}

export default factoryUser
