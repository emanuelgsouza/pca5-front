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
        <ProductType :model.sync="model" />
      </QStep>

      <QStep
        :name="2"
        title="Nos dê mais informações sobre ele"
        icon="info"
        :done="step > 2"
      >
        <GeneralInformations :model.sync="model" />
      </QStep>

      <QStep
        :name="3"
        title="Nos dê uma imagem desse produto (Opcional)"
        icon="add_a_photo"
        :done="step > 3"
      >
        <ProductImage :model.sync="model" @nextStep="$refs.stepper.next()" />
      </QStep>

      <QStep
        :name="4"
        title="Como podemos encontrar esse produto?"
        icon="navigation"
        :done="step > 4"
      >
        <ProductLocalization :model.sync="model" />
      </QStep>

      <template v-slot:navigation>
        <QStepperNavigation>
          <QBtn
            color="secondary"
            :label="step === 4 ? 'Finish' : 'Continue'"
            @click="$refs.stepper.next()"
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
    }
  }),
  computed: {
    isOnlineProduct () {
      return this.model.is_online
    }
  },
  methods: {
    onSubmit () {
      // Esta função só será invocada quando o formulário estiver corretamente preenchido
      this.$emit('data', { ...this.model })
    },
    onReset () {
      // Esta função tem como objetivo resetar os dados do formulário
      this.model = {
        ...this.$options.data().model
      }
    },
    clear () {
      this.onReset()
    }
  }
}
</script>
