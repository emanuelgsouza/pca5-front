<template>
  <QCard>
    <QCardSection>
      <div class="text-h6 relative-position">
        {{ dataName }}
        <QIcon
          size="1em"
          :name="dataIcon"
          right
          class="absolute-right"
        />
      </div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div> {{ dataDescription }} </div>
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
    data: {
      type: Object
    }
  },
  computed: {
    dataName () {
      return get(this.data, 'name', '')
    },
    dataDescription () {
      return get(this.data, 'description', '')
    },
    dataIsOnline () {
      return get(this.data, 'is_online', false)
    },
    dataIcon () {
      if (this.dataIsOnline) {
        return 'fas fa-link'
      }

      return 'fas fa-store-alt'
    }
  }
}
</script>

<style>

</style>
