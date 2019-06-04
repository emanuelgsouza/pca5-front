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
      <QCard style="min-width: 400px">
        <QCardSection>
          <div class="text-h6 text-center">Faça um pesquisa !</div>
        </QCardSection>

        <QCardSection>
          <QInput
          label="O que deseja encontrar ?"
          placeholder="Smartphone..."
          dense
          v-model="search"
          autofocus
          @keyup.enter="prompt = false"
          >
            <template v-slot:prepend>
              <QIcon name="search" />
            </template>
          </QInput>

          <br />
          <br />

          <QSlider
          v-model="value"
          :min="500"
          :max="20000"
          :step="500"
          label
          :label-value="value + ' Metros'"
          label-always
          color="red"
          >
            <template v-slot:prepend>
              <QIcon name="place" />
            </template>
          </QSlider>

        </QCardSection>

        <QCardActions align="right" class="text-primary">
          <QBtn
          icon="search"
          color="teal"
          flat
          label="Pesquisar"
          v-close-popup
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
import { QRouteTab, QTab, QTabs, QDialog, QCard, QInput, QBtn, QSlider } from 'quasar'

export default {
  name: 'FloatingButton',
  mixins: [ injectUserMixin ],
  components: { QRouteTab, QTab, QTabs, QDialog, QCard, QInput, QBtn, QSlider },
  computed: {
    isRegisterRoute () {
      return this.$route.name.indexOf('register') !== -1
    }
  },
  data () {
    return {
      prompt: false,
      value: 0,
      search: ''
    }
    // alert('Pombo da esperaca')
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
