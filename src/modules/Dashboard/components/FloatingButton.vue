<template>
  <QTabs align="justify">
    <QRouteTab
      :to="{
        name: 'dashboard'
      }"
      icon="home"
      color="black"
    />

    <QTab
      icon="search"
      color="black"
    />

    <QRouteTab
      icon="add"
      color="black"
      :to="{
        name: 'dashboard.register'
      }"
    />
  </QTabs>
</template>

<script>
import { QRouteTab, QTab, QTabs } from 'quasar'

export default {
  name: 'FloatingButton',
  components: { QRouteTab, QTab, QTabs },
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
