<template>
  <div class="product-localization">
    <!-- <QToogle /> -->

    <!-- Ao entrar nesta etapa, capturar os dados de localização do usuário -->

    <QForm ref="form">
      <QInput
        dense
        v-if="isOnlineProduct"
        label="URL do produto"
        :value="model.url"
        @input="value => updateModel('url', value)"
      />
    </QForm>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StepsMixin from '../mixins/steps'

export default {
  name: 'ProductLocalization',
  mixins: [ StepsMixin ],
  data: () => ({
    geolocalization: {}
  }),
  methods: {
    ...mapActions('application', ['loadAddress'])
  },
  mounted () {
    this.$q.loading.show({
      message: 'Pegando o endereço...'
    })

    this.loadAddress()
      .then(res => {
        console.log({ res })
        this.geolocalization = { ...res }
        this.$q.loading.hide()
      })
      .catch(err => {
        console.error(err.message)
        this.$q.loading.hide()
      })
  }
}
</script>

<style>

</style>
