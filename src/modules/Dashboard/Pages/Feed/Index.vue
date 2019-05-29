<template>
  <QPage padding class="body">
    <p> Veja aqui os produtos / serviços que selecionamos para você </p>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(data, key) in feedData" :key="key">
        <Card class="feed-card" :data="data" />
      </div>
    </div>

  </QPage>
</template>

<script>
import { mapState } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
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
