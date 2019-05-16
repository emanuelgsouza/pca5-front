import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('application', ['coordinates'])
  }
}
