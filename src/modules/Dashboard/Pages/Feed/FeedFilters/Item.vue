<template>
  <div :class="`filter-container text-center text-${color}`">
    <QIcon
      size="28px"
      :name="icon"
      @click="setFilter"
    />
    <p> {{ label }} </p>
  </div>
</template>

<script>
import { QIcon } from 'quasar'
import { mapGetters } from 'vuex'
import { getColorByType } from 'src/domains/Feed/support'

export default {
  name: 'FeedItem',
  components: { QIcon },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters('application', ['filterType']),
    icon () {
      return this.data.icon || ''
    },
    label () {
      return this.data.label || ''
    },
    value () {
      return this.data.value || 'all'
    },
    color () {
      if (this.isActive) {
        return getColorByType(this.value)
      }

      return 'grey'
    },
    isActive () {
      return this.filterType === this.value
    }
  },
  methods: {
    setFilter () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style>

</style>
