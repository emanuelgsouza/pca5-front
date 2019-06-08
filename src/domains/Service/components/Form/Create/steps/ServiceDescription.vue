<template>
  <div class="service-description">
    <QInput
      autogrow
      :value="model.description"
      type="textarea"
      label="Descrição"
      hint="Opcional"
      placeholder="Adicione uma pequena descrição"
      @input="value => updateModel('description', value)"
      :rules="[
        val => val.length <= 140 || 'Insira no máximo 140 caracteres!',
        val => val !== null || 'Não esqueça de definir uma categoria para o serviço',
        val => val !== '' || 'Não esqueça de definir uma categoria para o serviço'
      ]"
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
