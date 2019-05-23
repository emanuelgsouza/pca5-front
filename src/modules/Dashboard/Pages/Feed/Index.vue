<template>
  <QPage padding>
    <p> Veja aqui os produtos / serviços que selecionamos para você </p>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(data, key) in feedData" :key="key">
        <Card :data="data" />
      </div>
    </div>

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
