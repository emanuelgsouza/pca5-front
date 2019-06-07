<template>
  <QDialog
   style="width: 100%"
   ref="modal"
   @hide="onClose"
  >
    <QCard class="card-size">
      <QCardSection>
        <div class="text-h5 text-center"> Buscar produto </div>
      </QCardSection>

      <QCardSection>

        <QItemSection>
        <!-- TODO: implementar o autocomplete aqui -->
        <QInput
          label="Nome do produto"
          debounce="1000"
          v-model="model.search"
        />

        </QItemSection>

        <br />

        <label for="slider"> Distância: {{ model.metters }} Km</label>
          <QSlider
            color="servico"
            id="slider"
            v-model="model.metters"
            :min="1"
            :max="10"
            :step="1"
          />
            <!-- label
            :label-value="model.metters + ' Km'" -->
      </QCardSection>

      <QCardActions align="center">
        <QBtn
          flat
          color="servico"
          label="Cancelar"
          v-close-popup
        />
        <QBtn
          flat
          color="fisico"
          label="Pesquisar"
          @click="onSearch"
        />
      </QCardActions>
    </QCard>

  </QDialog>
</template>

<script>
import {
  QInput,
  QSlider
} from 'quasar'
import feedFilterMixin from 'src/domains/Feed/mixins/filter'
import modalMixin from 'src/support/mixins/modal'

export default {
  name: 'SearchModal',
  mixins: [ modalMixin, feedFilterMixin ],
  components: {
    QInput,
    QSlider
  },
  data: () => ({
    model: {
      search: '',
      type: 'all',
      metters: 3
    }
  }),
  methods: {
    onSearch () {
      this.setFilter(this.model)

      this.close()
    },
    onClose () {
      this.syncFilter(this.filter)
    }
  }
}
</script>

<style>
.card-size {
  min-width: 400px;
}
</style>
