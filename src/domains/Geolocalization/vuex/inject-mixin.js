import { mapState, mapActions } from 'vuex'

/**
 * @type {Vue}
 */
export default {
  computed: {
    ...mapState('application', ['coordinates'])
  },
  methods: {
    ...mapActions('application', ['loadCoordinates'])
  }
}
