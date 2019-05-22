<template>
  <QPage padding class="q-pa-md row items-start q-gutter-md">
    <p> Veja aqui os produtos / serviços que selecionamos para você </p>
    <Card
      v-for="(data, key) in feedData"
      :key="key"
      :data="data" />

    <QPageSticky position="bottom-right" :offset="[18, 18]">
      <QBtn fab color="primary" icon="add" />
    </QPageSticky>
  </QPage>
</template>

<script>
import { QPageSticky } from 'quasar'
import { mapState } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
    QPageSticky,
    Card
  },
  computed: {
    ...mapState('application', ['feed']),
    feedData () {
      return this.feed.data || []
    }
  }
}
</script>

<style>

</style>
