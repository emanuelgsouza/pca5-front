<template>
  <div class="product-localization">
    <!-- <QToogle /> -->

    <!-- Ao entrar nesta etapa, capturar os dados de localização do usuário -->

    <QInput
      dense
      v-if="isOnlineProduct"
      label="URL do produto"
      :value="model.url"
      @input="value => updateModel('url', value)"
    />
  </div>
</template>

<script>
import StepsMixin from '../mixins/steps'

export default {
  name: 'ProductLocalization',
  mixins: [ StepsMixin ]
}
</script>

<style>

</style>
