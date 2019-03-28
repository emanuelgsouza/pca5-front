<template>
  <QCard>
    <QCardSection>
      <div class="text-h6 relative-position">
        {{ productName }}
        <QIcon size="1em" :name="productIcon" right class="absolute-right" />
      </div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div> {{ productDescription }} </div>
    </QCardSection>
  </QCard>
</template>

<script>
import { QCard, QCardSection, QSeparator } from 'quasar'
import { get } from 'lodash'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    QCardSection,
    QSeparator
  },
  props: {
    product: {
      type: Object
    }
  },
  computed: {
    productName () {
      return get(this.product, 'name', '')
    },
    productDescription () {
      return get(this.product, 'description', '')
    },
    productIsOnline () {
      return get(this.product, 'is_online', false)
    },
    productIcon () {
      if (this.productIsOnline) {
        return 'fas fa-link'
      }

      return 'fas fa-store-alt'
    }
  }
}
</script>

<style>

</style>
