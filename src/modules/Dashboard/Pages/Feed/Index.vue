<template>
  <QPage padding class="body">
    <!-- <p> Veja aqui os produtos / serviços que selecionamos para você </p> -->

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(data, key) in feedDocs" :key="key">
        <Card class="feed-card" :data="data" />
      </div>
    </div>

    <QInnerLoading :showing="visible">
      <QSpinnerFacebook size="50px" color="primary" />
    </QInnerLoading>

  </QPage>
</template>

<script>
import { QInnerLoading, QSpinnerFacebook } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
    Card,
    QInnerLoading,
    QSpinnerFacebook
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapGetters('application', ['feedDocs'])
  },
  methods: {
    ...mapActions('application', ['loadFeed'])
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
