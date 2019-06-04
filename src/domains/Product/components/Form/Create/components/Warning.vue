<template>
  <div class="product-warning">
    <QChip
      square
      color="orange"
      text-color="black"
      icon="info"
      class="full-width"
    >
      {{ message }}
    </QChip>
  </div>
</template>

<script>
import { QChip } from 'quasar'
import stepsMixin from '../mixins/steps'

export default {
  name: 'ProductWarning',
  mixins: [ stepsMixin ],
  components: { QChip },
  computed: {
    message () {
      if (this.isOnlineProduct) {
        return 'Este é um produto de loja online'
      }

      return 'Este é um produto de loja física'
    }
  }
}
</script>

<style>

</style>
