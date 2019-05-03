<template>
  <QPage>
    <QTabs
      v-model="activeTab"
      inline-label
      :breakpoint="0"
      align="justify"
      class="bg-secondary text-white">
      <QRouteTab
        name="product"
        :to="{ name: 'dashboard.register.product' }"
        label="Produto" />
      <QRouteTab
        name="service"
        :to="{ name: 'dashboard.register.service' }"
        label="Serviço" />
    </QTabs>

    <div class="register_wrapper">
      <router-view />
    </div>
  </QPage>
</template>

<script>
import { QTabs, QRouteTab } from 'quasar'

export default {
  name: 'Register',
  components: {
    QTabs,
    QRouteTab
  },
  data: () => ({
    activeTab: 'product',
    model: {
      name: ''
    }
  })
}
</script>

<style>

</style>
