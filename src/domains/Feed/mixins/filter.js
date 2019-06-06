import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('application', ['filter'])
  },
  watch: {
    filter: 'syncFilter'
  },
  methods: {
    ...mapMutations('application', ['setFilter']),
    onSearch () {
      this.setFilter(this.model)
    },
    syncFilter (filter) {
      this.model = { ...filter }
    }
  },
  mounted () {
    this.syncFilter(this.filter)
  }
}
