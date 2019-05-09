<template>
  <div class="service-description">
    <QInput
      filled
      autogrow
      :value="model.description"
      type="textarea"
      v-model="text"
      label="Descrição"
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
  // el: '#q-app',
    return {
      text: ''
    }
  }
  // data: () => ({
  //   options: [
  //     {
  //       label: 'Loja física',
  //       value: false
  //     },
  //     {
  //       label: 'Loja online',
  //       value: true
  //     }
  //   ]
  // })
}
</script>
