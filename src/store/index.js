import Vue from 'vue'
import Vuex from 'vuex'
import auth from 'src/domains/User/vuex'
import plugins from './plugins'

import application from './application'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      application
    },
    plugins
  })

  return Store
}
