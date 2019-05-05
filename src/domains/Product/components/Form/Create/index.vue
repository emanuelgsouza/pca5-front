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
        :error="!hasErrors.generalInfo"
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
          ref="productImage"
          :model.sync="model"
          @nextStep="$refs.stepper.next()"
        />
      </QStep>

      <QStep
        :name="4"
        title="Como podemos encontrar esse produto?"
        icon="navigation"
        :error="!hasErrors.localization"
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
            :label="finishedSteps ? 'Salvar' : 'Continue'"
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
import { DEFAULT_PRODUCT_DATA } from '../../../support/constants'

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
    model: { ...DEFAULT_PRODUCT_DATA },
    hasErrors: {
      generalInfo: true,
      localization: true
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

          this.notifyError('Há erros no preenchimento do formulário')
        })
    },
    async onNextStep () {
      try {
        // General informations: wait form validations
        if (this.step === 2) {
          await this.$refs.generalInfoForm.validate()
        }

        // Product Image: wait image upload
        if (this.step === 3) {
          this.$q.loading.show({
            message: 'Aguarde enquanto fazemos o upload da imagem'
          })

          await this.$refs.productImage.upload()

          this.$q.loading.hide()

          if (this.model.url) {
            this.$q.notify({
              message: 'A imagem chegou em nossos serviço',
              color: 'positive'
            })
          }
        }

        // Localization: wait form validations
        if (this.step === 4) {
          await this.$refs.localizationForm.validate()
        }

        if (this.finishedSteps) {
          return this.onSubmit()
        }

        this.$nextTick(() => {
          this.$refs.stepper.next()
        })
      } catch (err) {
        console.error(err)

        this.notifyError('Há erros no preenchimento do formulário')
      }
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
      set(this.hasErrors, path, value)
    },
    clear () {
      this.model = { ...this.$options.data().model }
    },
    notifyError (message) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message
      })
    }
  },
  mounted () {
    this.loadCoordinates()

    this.loadCategories()
  }
}
</script>
