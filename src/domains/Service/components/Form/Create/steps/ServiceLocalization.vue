<template>
  <div class="product-localization">
    <QForm ref="form">
      <QInput
        dense
        label="Nome do local"
        :value="model.place"
        lazy-rules
        hint="Obrigatório"
        :rules="[
          val => val !== null || 'É necessário informar o nome do local'
        ]"
        @input="value => updateModel('place', value)"
      />
    </QForm>

    <LocalizationInfo
      ref="localizationForm"
      :model.sync="model.localization"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { identity } from 'lodash'
import LocalizationInfo from 'src/domains/Geolocalization/components/LocalizationInfo'
import StepsMixin from '../mixins/steps'

export default {
  name: 'ServiceLocalization',
  mixins: [ StepsMixin ],
  components: { LocalizationInfo },
  data: () => ({
    geolocalization: {}
  }),
  methods: {
    ...mapActions('application', ['loadAddress']),
    validate () {
      const validations = [ this.$refs.form.validate() ]

      if (!this.isOnlineProduct) {
        validations.push(this.$refs.localizationForm.validate())
      }

      return Promise.all(validations)
        .then(listOfSuccess => {
          const success = listOfSuccess.every(identity)

          this.$emit('validate', success)

          if (success) {
            return Promise.resolve(success)
          }

          return Promise.reject(new Error('Campos de Localização mal informados'))
        })
    }
  },
  mounted () {
    if (this.isOnlineProduct) {
      return
    }

    this.$q.loading.show({
      message: 'Pegando o endereço...'
    })

    this.loadAddress()
      .then(res => {
        this.geolocalization = { ...res }
        this.updateModel('localization', { ...res })
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
