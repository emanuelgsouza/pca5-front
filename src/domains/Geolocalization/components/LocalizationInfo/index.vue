<template>
  <div class="localization-info">
    <QForm ref="form">
      <QInput
        v-for="(input, key) in inputs"
        :key="key"
        v-bind="input"
        dense
        lazy-rules
        :hint="input.required ? 'Obrigatório' : null"
        :value="model[input.path]"
        @input="val => onInput(input.path, val)"
      />
    </QForm>
  </div>
</template>

<script>
import { set } from 'lodash'
import { QForm, QInput } from 'quasar'

export default {
  name: 'LocalizationInfo',
  components: { QForm, QInput },
  props: {
    model: Object
  },
  data: () => ({
    inputs: [
      {
        label: 'Rua',
        path: 'street',
        rules: [
          val => val !== null || 'É necessário informar a Rua'
        ],
        required: true
      },
      {
        label: 'Número',
        path: 'house_number'
      },
      {
        label: 'Bairro',
        path: 'district',
        rules: [
          val => val !== null || 'É necessário informar o bairro'
        ],
        required: true
      },
      {
        label: 'Cidade',
        path: 'city',
        rules: [
          val => val !== null || 'É necessário informar a Cidade'
        ],
        required: true
      },
      {
        label: 'Estado',
        path: 'state',
        rules: [
          val => val !== null || 'É necessário informar o Estado'
        ],
        required: true
      },
      {
        label: 'País',
        path: 'country',
        rules: [
          val => val !== null || 'É necessário informar o País'
        ],
        required: true
      }
    ]
  }),
  methods: {
    onInput (path, value) {
      const model = { ...this.model }
      set(model, path, value)
      this.$emit('update:model', { ...model })
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>

<style>

</style>
