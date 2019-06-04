<template>
  <QPage padding class="body">
    <!-- <p> Veja aqui os produtos / serviços que selecionamos para você </p> -->

    <QInfiniteScroll
      ref="infiniteScroll"
      :offtet="100"
      @load="onLoadMoreData"
    >
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-4" v-for="(data, key) in feed" :key="key">
          <Card class="feed-card" :data="data" />
        </div>
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <QSpinnerFacebook size="50px" color="primary" />
        </div>
      </template>
    </QInfiniteScroll>

    <QInnerLoading :showing="visible">
      <QSpinnerFacebook size="50px" color="primary" />
    </QInnerLoading>

  </QPage>
</template>

<script>
import { QInnerLoading, QSpinnerFacebook, QInfiniteScroll } from 'quasar'
import { mapActions, mapState } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
    Card,
    QInnerLoading,
    QInfiniteScroll,
    QSpinnerFacebook
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapState('application', ['feed', 'stopFeed'])
  },
  watch: {
    stopFeed: 'processStopFeed'
  },
  methods: {
    ...mapActions('application', ['loadFeed']),
    processStopFeed (bool) {
      this.$refs.infiniteScroll.stop()
    },
    onLoadMoreData (index, done) {
      const data = {
        type: 'all',
        page: index
      }

      // console.log(data)
      this.loadFeed(data)
        .then(done)
    }
  },
  mounted () {
    this.visible = true

    this.loadFeed()
      .then(() => {
        this.visible = false
      })
  }
}
</script>

<style>

</style>
