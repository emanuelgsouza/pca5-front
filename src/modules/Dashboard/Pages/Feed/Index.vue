<template>
  <QPage padding class="body">
    <!-- <p> Veja aqui os produtos / serviços que selecionamos para você </p> -->

    <QPullToRefresh
      @refresh="resetLoadData"
      icon="lightbulb"
    >
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
    </QPullToRefresh>

    <QInnerLoading :showing="visible">
      <QSpinnerFacebook size="50px" color="primary" />
    </QInnerLoading>

    <QPageScroller expand position="top" :scroll-offset="150" :offset="[0, 0]">
      <div
        class="col cursor-pointer q-pa-sm bg-positive text-white text-center"
        @click="resetLoadData"
      >
        Recarregar
      </div>
    </QPageScroller>
  </QPage>
</template>

<script>
import {
  QInnerLoading,
  QPageScroller,
  QPullToRefresh,
  QInfiniteScroll,
  QSpinnerFacebook
} from 'quasar'
import { isFunction } from 'lodash'
import { mapActions, mapState } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
    Card,
    QInnerLoading,
    QPageScroller,
    QPullToRefresh,
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
    ...mapActions('application', ['loadFeed', 'resetFeed']),
    processStopFeed (bool) {
      if (bool) {
        this.$refs.infiniteScroll.stop()
        return
      }

      this.$refs.infiniteScroll.reset()
      this.$refs.infiniteScroll.resume()
    },
    onLoadMoreData (index, done) {
      const data = {
        type: 'all',
        page: index
      }

      this.loadFeed(data)
        .then(done)
    },
    processError () {
      this.$refs.infiniteScroll.stop()
      this.visible = false
      this.$q.notify({
        color: 'negative',
        duration: 500,
        message: 'Houve um erro no carregamento dos dados'
      })
    },
    loadData (done) {
      this.visible = true
      this.loadFeed()
        .then(() => {
          if (isFunction(done)) {
            done()
          }
          this.visible = false
        })
        .catch(this.processError)
    },
    resetLoadData (done) {
      this.visible = true
      this.resetFeed()
        .then(() => {
          if (isFunction(done)) {
            done()
          }
          this.visible = false
        })
        .catch(this.processError)
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>

</style>
