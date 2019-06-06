<template>
  <div class="feed-filters row justify-between">
    <div>
      <QChip square dense color="primary" v-if="hasLabelData">
        {{ labelData }}
      </QChip>
    </div>

    <div>
      <QBtnDropdown
        ref="menu"
        color="primary"
        label="Filtros"
        icon="filter_list"
        outline
      >
        <div class="q-pa-md">
          <QSelect
            map-options
            emit-value
            class="teste"
            :value="model.type"
            :options="optionsToSearch"
            label="Tipo de produto/serviço"
            @input="onChange"
          />
        </div>
      </QBtnDropdown>
    </div>
  </div>
</template>

<script>
import { isNil } from 'lodash'
import { QSelect, QBtnDropdown, QChip } from 'quasar'
import { FEED_TYPES, FEED_TYPES_NAMES } from 'src/domains/Feed/constants'
import feedFilterMixin from 'src/domains/Feed/mixins/filter'

export default {
  name: 'FeedFilter',
  mixins: [ feedFilterMixin ],
  components: { QSelect, QBtnDropdown, QChip },
  data: () => ({
    optionsToSearch: [
      {
        label: 'Produto Online',
        value: 'po'
      },
      {
        label: 'Produto Físico',
        value: 'pf'
      },
      {
        label: 'Serviço',
        value: 'se'
      },
      {
        label: 'Todos os tipos',
        value: 'all'
      }
    ],
    model: {
      type: FEED_TYPES.ALL
    }
  }),
  computed: {
    hasLabelData () {
      return !isNil(this.labelData)
    },
    labelData () {
      const type = this.model.type
      if (type === FEED_TYPES.ALL) {
        return null
      }

      const name = FEED_TYPES_NAMES[type]
      return `Filtrando por ${name}`
    }
  },
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
