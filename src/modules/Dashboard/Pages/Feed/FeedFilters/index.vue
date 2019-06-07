<template>
  <div class="feed-filters q-my-md">
    <!-- <p class="text-body1"> Filtrar por </p> -->
    <div class="row justify-between">
      <Item
        class="col-3"
        v-for="(item, key) in filters"
        :key="key"
        :data="item"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import feedFilterMixin from 'src/domains/Feed/mixins/filter'
import Item from './Item'

export default {
  name: 'FeedFilter',
  mixins: [ feedFilterMixin ],
  components: {
    Item
  },
  data: () => ({
    model: {
      type: 'all'
    },
    filters: [
      {
        label: 'Online',
        icon: 'fas fa-at',
        value: 'po'
      },
      {
        label: 'Físico',
        value: 'pf',
        icon: 'fas fa-shopping-cart'
      },
      {
        label: 'Serviço',
        value: 'se',
        icon: 'fas fa-wrench'
      },
      {
        label: 'Todos',
        value: 'all',
        icon: 'fas fa-globe'
      }
    ]
  }),
  methods: {
    onChange (type) {
      this.model.type = type
      this.onSearch()
      this.$refs.menu.hide()
    }
  }
}
</script>

<style>

</style>
