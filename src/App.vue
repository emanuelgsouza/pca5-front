<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import injectUser from 'src/domains/User/mixins/inject-user'

export default {
  name: 'App',
  mixins: [ injectUser ],
  watch: {
    user: 'checkUserInformation',
    isUserLoading: 'updateLoadingStatus'
  },
  methods: {
    checkUserInformation (user) {
      if (!user) {
        return null
      }

      if (user.is_first_login) {
        this.$router.push({
          name: 'dashboard.register.update'
        })
      }
    },
    updateLoadingStatus (val) {
      if (val) {
        return this.showLoadingToUser()
      }

      this.hideLoadingToUser()
    },
    showLoadingToUser () {
      return this.$q.loading.show({
        message: 'Carregando os dados do usuário'
      })
    },
    hideLoadingToUser () {
      return this.$q.loading.hide()
    }
  },
  mounted () {
    this.updateLoadingStatus(this.isUserLoading)
  }
}
</script>

<style>
</style>
