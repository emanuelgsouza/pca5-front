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
      @click="prompt = true"
    />

    <QTab
      icon="add"
      class="text-primary"
      @click="goToRegisterProduct"
    />
  </QTabs>

  <QDialog v-model="prompt">
      <QCard style="min-width: 400px" class="q-px-sm q-pb-md">
        <QCardSection>
          <div class="text-h6 text-center">Faça um pesquisa !</div>
        </QCardSection>

        <QCardSection>
          <QItem>
          <QItemSection avatar>
            <QIcon name="fas fa-search" />
          </QItemSection>

          <QInput
          class="teste"
          dense
          autofocus
          label="O que deseja encontrar ?"
          debounce="1000"
          v-model="search"
          @keyup.enter="prompt = false"
          >
          </QInput>
        </QItem>

        <QItem >
          <QItemSection avatar>
            <QIcon name="fas fa-question" />
          </QItemSection>
          <QSelect
            class="teste"
            v-model="optionsSearch"
            :options="optionsToSearch"
            label="Tipo de busca"
          />
        </QItem>

        <br />

        <QItem >
          <QItemSection avatar>
            <QIcon name="place" />
          </QItemSection>
          <QItemSection>
            <QSlider
            class="slider"
             v-model="value"
             :min="500"
             :max="20000"
             :step="500"
             label
             :label-value="value + ' Metros'"
             label-always
             color="primary"
            />
          </QItemSection>
        </QItem>

        </QCardSection>

        <QCardActions class="q-pa-sm">
          <QBtn
          class="q-ml-sm"
          color="primary"
          flat
          icon="search"
          label="Pesquisar"
          @click="modalSearch"
          />

          <QBtn
          icon="cancel"
          color="negative"
          flat
          label="Cancelar"
          v-close-popup
          />
        </QCardActions>
      </QCard>

  </QDialog>

  </div>
</template>

<script>
import injectUserMixin from 'src/domains/User/mixins/inject-user'
import { QRouteTab, QTab, QTabs, QDialog, QCard, QInput, QBtn, QSlider, QSelect } from 'quasar'

export default {
  name: 'FloatingButton',
  mixins: [ injectUserMixin ],
  components: { QRouteTab, QTab, QTabs, QDialog, QCard, QInput, QBtn, QSlider, QSelect },
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
    modalSearch () {
      alert(`Objeto a ser enviado ( Distancia:
        ${this.value} , ${this.search} , ${this.optionsSearch} `)
    },

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
