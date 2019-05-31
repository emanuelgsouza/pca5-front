<template>
  <QTabs align="justify">
    <QRouteTab
      :to="{
        name: 'dashboard'
      }"
      icon="home"
      class="text-primary"
    />

    <QTab
      icon="search"
      class="text-primary"
    />

    <QTab
      icon="add"
      class="text-primary"
      @click="goToRegisterProduct"
    />
  </QTabs>
</template>

<script>
import injectUserMixin from 'src/domains/User/mixins/inject-user'
import { QRouteTab, QTab, QTabs } from 'quasar'

export default {
  name: 'FloatingButton',
  mixins: [ injectUserMixin ],
  components: { QRouteTab, QTab, QTabs },
  computed: {
    isRegisterRoute () {
      return this.$route.name.indexOf('register') !== -1
    }
  },
  methods: {
    goToRegisterProduct () {
      if (this.hasUser) {
        this.$router.push({
          name: 'dashboard.register'
        })
        return
      }

      this.$q.notify({
        color: 'negative',
        icon: 'far fa-frown',
        message: 'É necessário estar logado para executar essa ação'
      })
    }
  }
}
</script>

<style>
</style>
