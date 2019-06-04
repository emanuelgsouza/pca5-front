<template>
  <div class="service-description">
    <QInput
      autogrow
      :value="model.description"
      type="textarea"
      v-model="text"
      label="Descrição"
      hint="Opcional"
      placeholder="Adicione uma pequena descrição"
      :rules="[ val => val.length <= 140 || 'Insira no máximo 140 caracteres!']"
    />

  </div>
</template>

<script>

import StepMixin from '../mixins/steps'

export default {
  name: 'ServiceDescription',
  mixins: [ StepMixin ],
  data () {
    return {
      text: ''
    }
  }
}
</script>
