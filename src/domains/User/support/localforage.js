import store from 'localforage'

/**
 * @method wasLogin
 * @param  {Boolean} value
 * @return {Promise}
 */
export const wasLogin = value => store.setItem('WAS_LOGIN', value)

/**
 * @method getWasLogin
 * @return {Promise}
 */
export const getWasLogin = _ => store.getItem('WAS_LOGIN')
