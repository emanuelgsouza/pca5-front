import { set, get } from 'lodash'
import {
  QForm,
  QInput,
  QSelect,
  QToggle,
  QOptionGroup
} from 'quasar'

export default {
  components: {
    QForm,
    QInput,
    QSelect,
    QToggle,
    QOptionGroup
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isOnlineProduct () {
      return get(this.model, 'is_online', false) || false
    }
  },
  methods: {
    updateModel (path, value) {
      const model = { ...this.model }
      set(model, path, value)
      this.$emit('update:model', { ...model })
    },
    validate () {
      if (this.$refs.form) {
        return this.$refs.form.validate()
          .then(success => {
            console.log({ success })
            this.$emit('validate', !success)

            if (success) {
              return Promise.resolve(success)
            }

            return Promise.reject(new Error('Validação de formulário...'))
          })
      }
    }
  }
}
