<template>
  <QPageSticky position="bottom-right" :offset="[18, 18]">
    <QBtn
      fab
      icon="add"
      color="negative"
      @click="onClick" />
  </QPageSticky>
</template>

<script>
import { QPageSticky, QBtn } from 'quasar'

export default {
  name: 'FloatingButton',
  components: { QPageSticky, QBtn },
  methods: {
    onClick () {
      this.$router.push({
        name: 'dashboard.register'
      })
    }
  }
}
</script>

<style>

</style>
