<template>
  <div class="product-image">
  </div>
</template>

<script>
import StepsMixin from '../mixins/steps'

export default {
  name: 'ProductImage',
  mixins: [ StepsMixin ],
  mounted () {
    if (this.isOnlineProduct) {
      this.$emit('nextStep')
    }
  }
}
</script>

<style>

</style>
