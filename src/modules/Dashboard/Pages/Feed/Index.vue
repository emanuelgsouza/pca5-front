<template>
  <QPage padding class="body">
    <!-- <p> Veja aqui os produtos / serviços que selecionamos para você </p> -->

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(data, key) in feedDocs" :key="key">
        <Card class="feed-card" :data="data" />
      </div>
    </div>

  </QPage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from './Card'

export default {
  name: 'DashboardPageFeed',
  components: {
    Card
  },
  computed: {
    ...mapGetters('application', ['feedDocs'])
  },
  methods: {
    ...mapActions('application', ['loadFeed'])
  },
  mounted () {
    this.$q.loading.show({
      message: 'Carregando Feed'
    })

    this.loadFeed()
      .then(() => {
        this.$q.loading.hide()
      })
  }
}
</script>

<style>

</style>
