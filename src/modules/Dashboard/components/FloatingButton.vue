<template>
  <QPageSticky position="bottom-right" :offset="[18, 18]" v-if="!isRegisterRoute">
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
  computed: {
    isRegisterRoute () {
      return this.$route.name.indexOf('register') !== -1
    }
  },
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
