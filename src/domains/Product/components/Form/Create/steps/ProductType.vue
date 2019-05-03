<template>
  <div class="product-type">
    <!-- <p> Nos diga o tipo de produto que está cadastrando </p> -->
    <QOptionGroup
      inline
      dense
      color="primary"
      :value="model.is_online"
      :options="options"
      @input="value => updateModel('is_online', value)"
    />
  </div>
</template>

<script>
import StepsMixin from '../mixins/steps'

export default {
  name: 'ProductType',
  mixins: [ StepsMixin ],
  data: () => ({
    options: [
      {
        label: 'Loja física',
        value: false
      },
      {
        label: 'Loja online',
        value: true
      }
    ]
  })
}
</script>

<style>

</style>
