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
    }
  }
}
