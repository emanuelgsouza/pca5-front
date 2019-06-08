<template>
  <QPage padding>
    <div class="feed-filter q-gutter-md">
      <QSelect
        v-model="produto"
        use-input
        option-value="nomeProduto"
        option-label="nomeProduto"
        input-debounce="0"
        label="Pesquise por um produto"
        :options="options"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
      />

      <div>
        <label for="slider"> Distância: {{ model.metters }} Km</label>
        <QSlider
          color="servico"
          id="slider"
          v-model="model.metters"
          :min="1"
          :max="40"
          :step="1"
        />
      </div>

      <div class="text-right">
        <QBtn
          :disabled="btnDisabled"
          label="Pesquisar"
          color="positive"
          @click="onClick"
        />
      </div>
    </div>

    <div class="feed-container row q-col-gutter-sm">
      <div class="col-12 col-md-4" v-for="(data, key) in cards" :key="key">
        <Card class="feed-card" :data="data" />
      </div>
    </div>

    <div v-if="noData" class="text-center q-mt-md">
      <p> A busca não retornou nenhum resultado de {{ productName }} num raio de {{ model.metters }} Kms </p>
    </div>
  </QPage>
</template>

<script>
import { isEmpty, capitalize, get } from 'lodash'
import { QSelect, QSlider } from 'quasar'
import Card from 'src/domains/Feed/components/Card'
import { loadAutocomplete, loadSearchResult } from 'src/domains/Feed/support'
import injectCoordinatesMixin from 'src/domains/Geolocalization/vuex/inject-mixin'

export default {
  name: 'SearchPage',
  mixins: [ injectCoordinatesMixin ],
  components: { QSelect, QSlider, Card },
  data: () => ({
    model: {
      name: '',
      metters: 3
    },
    produto: {},
    options: [],
    cards: [],
    fetchData: false
  }),
  computed: {
    btnDisabled () {
      return isEmpty(this.produto) && this.model.metters > 0
    },
    hasCards () {
      return !isEmpty(this.cards)
    },
    noData () {
      return this.fetchData && !this.hasCards
    },
    productName () {
      return get(this.produto, 'nomeProduto', null)
    }
  },
  methods: {
    filterFn (val, update, abort) {
      if (isEmpty(val)) {
        return
      }

      return loadAutocomplete(val)
        .then(data => {
          update(() => {
            this.options = data.map(option => {
              return {
                ...option,
                nomeProduto: capitalize(option.nomeProduto)
              }
            })
          })
        })
    },

    abortFilterFn () {
      console.log('delayed filter aborted')
    },
    onClick () {
      const config = {
        name: this.productName,
        distance: this.model.metters * 1000,
        lat: get(this.coordinates, 'lat'),
        log: get(this.coordinates, 'lon')
      }

      return loadSearchResult(config)
        .then(data => {
          this.fetchData = true
          this.cards = [ ...data ]
        })
        .catch(err => {
          console.error(err)
          this.$q.notify({
            color: 'negative',
            message: 'Houve um erro na busca dos dados'
          })
        })
    }
  },
  mounted () {
    this.loadCoordinates()
  }
}
</script>

<style>

</style>
