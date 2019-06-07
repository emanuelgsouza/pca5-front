<template>
  <QPage class="body">
    <Hero />
    <div class="q-pa-xs">
      <QPullToRefresh
        @refresh="resetLoadData"
        icon="lightbulb"
      >
        <QInfiniteScroll
          ref="infiniteScroll"
          :offtet="100"
          @load="onLoadMoreData"
        >
          <FeedFilters />
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

      <QInnerLoading :showing="feedLoading">
        <QSpinnerFacebook size="50px" color="primary" />
      </QInnerLoading>

      <QPageScroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[20, 20]"
      >
        <QBtn
          fab
          color="accent"
          icon="refresh"
          @click="resetLoadData"
        />
      </QPageScroller>
    </div>
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
import { mapActions, mapState, mapMutations } from 'vuex'
import Card from './Card'
import Hero from './Hero'
import FeedFilters from './FeedFilters'

export default {
  name: 'DashboardPageFeed',
  components: {
    Card,
    Hero,
    FeedFilters,
    QInnerLoading,
    QPageScroller,
    QPullToRefresh,
    QInfiniteScroll,
    QSpinnerFacebook
  },
  computed: {
    ...mapState('application', ['feed', 'stopFeed', 'feedLoading'])
  },
  watch: {
    stopFeed: 'processStopFeed'
  },
  methods: {
    ...mapActions('application', ['loadFeed', 'resetFeed']),
    ...mapMutations('application', ['setPagination']),
    processStopFeed (bool) {
      if (bool) {
        this.$refs.infiniteScroll.stop()
        return
      }

      this.$refs.infiniteScroll.reset()
      this.$refs.infiniteScroll.resume()
    },
    onLoadMoreData (page, done) {
      this.setPagination({ page })

      this.$nextTick(() => {
        this.loadFeed().then(done)
      })
    },
    processError () {
      this.$refs.infiniteScroll.stop()
      this.$q.notify({
        color: 'negative',
        duration: 500,
        message: 'Houve um erro no carregamento dos dados'
      })
    },
    loadData (done) {
      this.loadFeed()
        .then(() => {
          if (isFunction(done)) {
            done()
          }
        })
        .catch(this.processError)
    },
    resetLoadData (done) {
      this.resetFeed()
        .then(() => {
          if (isFunction(done)) {
            done()
          }
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
