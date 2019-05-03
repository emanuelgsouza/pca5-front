<template>
  <div class="product-image">
    <!-- <QUploader /> -->
    Aqui vai uma imagem

    <AppFirebaseUploader />
  </div>
</template>

<script>
import StepsMixin from '../mixins/steps'
import AppFirebaseUploader from 'src/components/AppFirebaseUploader'

export default {
  name: 'ProductImage',
  mixins: [ StepsMixin ],
  components: { AppFirebaseUploader },
  mounted () {
    if (this.isOnlineProduct) {
      this.$emit('nextStep')
    }
  }
}
</script>

<style>

</style>
