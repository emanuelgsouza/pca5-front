<template>
  <!-- <QPageSticky position="bottom-right" :offset="[18, 18]" v-if="!isRegisterRoute">
    <QBtn
      fab
      icon="add"
      color="negative"
      @click="onClick" />
  </QPageSticky> -->

  <QBtnGroup spread class="toolbar">
      <QBtn
      to="/"
      icon="home"
      color="black"
      />

      <QBtn
      icon="search"
      color="black"
      />

      <QBtn
      icon="add"
      color="black"
      @click="onClick"
      />
    </QBtnGroup>
</template>

<script>
import { QBtn, QBtnGroup } from 'quasar'

export default {
  name: 'FloatingButton',
  components: { QBtn, QBtnGroup },
  computed: {
    isRegisterRoute () {
      return this.$route.name.indexOf('register') !== -1
    }
  },
  methods: {
    onClick () {
      this.$router.push({
        name: 'dashboard.register'
      })
    }
  }
}
</script>

<style>
.toolbar {
  height: 35px;
}
</style>
