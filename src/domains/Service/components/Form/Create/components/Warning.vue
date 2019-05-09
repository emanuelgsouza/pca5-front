<template>
  <div class="service-warning">
    <QChip
      square
      icon="info"
      color="info"
    >
      {{ message }}
    </QChip>
  </div>
</template>

<script>
import { QChip } from 'quasar'
import stepsMixin from '../mixins/steps'

export default {
  name: 'ServiceWarning',
  mixins: [ stepsMixin ],
  components: { QChip },
  computed: {
    message () {
      return 'Este é um serviço de loja física'
      //    if (this.isOnlineService) {
      //      return 'Este é um serviço de loja online'
      //  }
    }
  }
}
</script>
