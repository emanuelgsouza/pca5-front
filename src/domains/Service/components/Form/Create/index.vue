<template>
  <div class="create-service-stepper">
    <!-- <ServiceWarning :model="model" /> -->
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
        title="Nos dê algumas informações sobre o serviço !"
        icon="info"
        :error="!hasErrors.generalInfo"
        :done="step > 1"
      >
        <GeneralInformation
          ref="generalInfoForm"
          :model.sync="model"
          @validate="value => onValidate('generalInfo', value)"
        />
      </QStep>

      <QStep
        :name="2"
        title="Como podemos encontrar esse serviço ?"
        icon="navigation"
        :error="!hasErrors.localization"
        :done="step > 2"
      >
        <ServiceLocalization
          ref="localizationForm"
          :model.sync="model"
          @validate="value => onValidate('localization', value)"
        />

      </QStep>

      <QStep
        :name="3"
        title="Informe uma pequena descrição para ele"
        icon="info"
      >
        <ServiceDescription
          ref="ServiceDescription"
          :model.sync="model"
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
import { QStepper, QStepperNavigation, QStep } from 'quasar'
import { set, identity } from 'lodash'
import { mapActions } from 'vuex'
import StepsComponents from './steps'
// import Components from './components'
import { DEFAULT_SERVICE_DATA } from '../../../support/constants'

export default {
  name: 'CreateServiceForm',
  components: {
    QStepper,
    QStep,
    // ...Components,
    ...StepsComponents,
    QStepperNavigation
  },
  data: () => ({
    step: 1,
    model: { ...DEFAULT_SERVICE_DATA },
    hasErrors: {
      generalInfo: true,
      localization: true
    }
  }),
  computed: {
    finishedSteps () {
      return this.step === 3
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
        if (this.step === 1) {
          await this.$refs.generalInfoForm.validate()
        }

        if (this.step === 2) {
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
      return new Promise((resolve, reject) => {
        const val = Object.values(this.hasErrors).every(identity)
        if (val) {
          return resolve(val)
        }

        return reject(new Error('Erros na validação do form...'))
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
