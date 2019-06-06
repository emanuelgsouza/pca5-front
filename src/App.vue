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
  },
  created () {
    document.addEventListener('sw:update', () => {
      const reload = () => document.location.reload(true)
      this.$q.dialog({
        title: 'Atualização disponível',
        message: 'Uma versão mais atualizada já está disponível, clique em Ok para atualizar',
        position: 'top',
        cancel: true
      })
        .onOk(reload)
        .onCancel(_ => {
          console.log('Evento cancelado. Atualização sairá no próximo refresh de página')
        })
    })
  }
}
</script>

<style>
</style>
