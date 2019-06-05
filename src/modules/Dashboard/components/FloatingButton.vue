<template>
<div class="q-pa-md q-gutter-sm">

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
      @click="openSearch"
    />

    <QTab
      icon="add"
      class="text-primary"
      @click="goToRegisterProduct"
    />
  </QTabs>
  <SearchModal ref="searchModal" />
  </div>
</template>

<script>
import injectUserMixin from 'src/domains/User/mixins/inject-user'
import { QRouteTab, QTab, QTabs } from 'quasar'
import SearchModal from './Search'

export default {
  name: 'FloatingButton',
  mixins: [ injectUserMixin ],
  components: { QRouteTab, QTab, QTabs, SearchModal },
  computed: {
    isRegisterRoute () {
      return this.$route.name.indexOf('register') !== -1
    }
  },
  data () {
    return {
      prompt: false,
      value: 500,
      search: '',
      optionsSearch: null,
      optionsToSearch: ['Produto Fisico', 'Produto on-line', 'Servico']
    }
  },
  methods: {
    openSearch () {
      this.$refs.searchModal.open()
    },

    // validateGetSearch () {
    //   return new Promise((resolve, reject) => {
    //     const value = Object.values(this.hasErrors).every()
    //
    //     if (value) {
    //       return resolve(value)
    //     }

    //     return reject(new Error('Algo de errado nao esta certo na busca...'))
    //   })
    // },

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
.teste {
  width: 100%;
}
</style>
