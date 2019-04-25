<template>
  <div class="create-product-stepper">
    <ProductWarning :model="model" />
    <QStepper
      v-model="step"
      animated
      vertical
      ref="stepper"
      color="primary"
      done-color="secondary"
    >
      <QStep
        :name="1"
        title="Nos diga o tipo de produto"
        icon="settings"
        :done="step > 1"
      >
        <ProductType
          :model.sync="model"
        />
      </QStep>

      <QStep
        :name="2"
        title="Nos dê mais informações sobre ele"
        icon="info"
        :error="hasErrors.generalInfo"
        :done="step > 2"
      >
        <GeneralInformations
          ref="generalInfoForm"
          :model.sync="model"
          @validate="value => onValidate('generalInfo', value)"
        />
      </QStep>

      <QStep
        :name="3"
        title="Nos dê uma imagem desse produto (Opcional)"
        icon="add_a_photo"
        :done="step > 3"
      >
        <ProductImage
          :model.sync="model"
          @nextStep="$refs.stepper.next()"
        />
      </QStep>

      <QStep
        :name="4"
        title="Como podemos encontrar esse produto?"
        icon="navigation"
        :error="hasErrors.localization"
        :done="step > 4"
      >
        <ProductLocalization
          ref="localizationForm"
          :model.sync="model"
          @validate="value => onValidate('localization', value)"
        />
      </QStep>

      <template v-slot:navigation>
        <QStepperNavigation>
          <QBtn
            color="secondary"
            :label="step === 4 ? 'Salvar' : 'Continue'"
            @click="onNextStep"
          />

          <QBtn
            v-if="step > 1"
            class="q-ml-sm"
            flat
            color="primary"
            label="Voltar"
            @click="$refs.stepper.previous()"
          />
        </QStepperNavigation>
      </template>
    </QStepper>
  </div>
</template>

<script>
// TODO: implementar captura de latitude e longitude do usuário, para pegar os restantes dos dados e assim exibí-los no form
import { QStepper, QStepperNavigation, QStep } from 'quasar'
import { set, identity } from 'lodash'
import { mapActions } from 'vuex'
import StepsComponents from './steps'
import Components from './components'

export default {
  name: 'CreateProductForm',
  components: {
    QStepper,
    QStep,
    ...Components,
    ...StepsComponents,
    QStepperNavigation
  },
  data: () => ({
    step: 1,
    model: {
      name: null,
      url: null,
      category: null,
      is_online: false,
      value: null
    },
    hasErrors: {
      generalInfo: false,
      localization: false
    }
  }),
  computed: {
    isOnlineProduct () {
      return this.model.is_online
    },
    finishedSteps () {
      return this.step === 4
    }
  },
  methods: {
    ...mapActions('application', ['loadCoordinates', 'loadCategories']),
    onSubmit () {
      return this.execValidations()
        .then(() => {
          this.$emit('data', { ...this.model })
        })
        .catch(err => {
          console.error(err.message)

          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Há erros no preenchimento do formulário'
          })
        })
    },
    onNextStep () {
      if (this.finishedSteps) {
        return this.onSubmit()
      }

      if (this.step === 2) {
        this.$refs.generalInfoForm.validate()
      }

      if (this.step === 4) {
        this.$refs.localizationForm.validate()
      }

      this.$refs.stepper.next()
    },
    execValidations () {
      // TODO: implementar validações e mostrar em qual etapa contem-se erros
      return new Promise((resolve, reject) => {
        const val = Object.values(this.hasErrors).every(identity)
        if (val) {
          return resolve(val)
        }

        return reject(new Error('Erros na validação de form...'))
      })
    },
    onValidate (path, value) {
      // console.log({ path, value })
      set(this.hasErrors, path, value)
    }
  },
  mounted () {
    this.loadCoordinates()

    this.loadCategories()
  }
}
</script>
