import { set } from 'lodash'
import {
  QForm,
  QInput,
  QSelect,
  QToggle
} from 'quasar'

export default {
  components: {
    QForm,
    QInput,
    QSelect,
    QToggle
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
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
            this.$emit('validate', success)

            if (success) {
              return Promise.resolve(success)
            }

            return Promise.reject(new Error('Deu ruim no form ...'))
          })
      }
    }
  }
}
