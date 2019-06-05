import {
  QDialog,
  QCard,
  QCardActions,
  QCardSection
} from 'quasar'

export default {
  components: {
    QDialog,
    QCard,
    QCardActions,
    QCardSection
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    }
  }
}
