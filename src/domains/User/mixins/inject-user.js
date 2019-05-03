import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { get } from 'lodash'
import { SET_USER } from '../vuex/mutation-types'

const GETTERS = [
  'hasUser',
  'username',
  'isUserLoading',
  'userUid'
]

const STATE = ['user']

export default {
  computed: {
    ...mapGetters('auth', GETTERS),
    ...mapState('auth', STATE)
  },
  methods: {
    ...mapMutations('auth', [SET_USER]),
    ...mapActions('auth', ['logoutUser']),
    injectUserInModel () {
      this.model = {
        ...this.model,
        name: get(this.user, 'name', ''),
        email: get(this.user, 'email', ''),
        phone: get(this.user, 'phone', '')
      }
    }
  }
}
