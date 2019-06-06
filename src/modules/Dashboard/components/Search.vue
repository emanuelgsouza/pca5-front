<template>
  <QDialog
   style="width: 100%"
   ref="modal"
   @hide="onClose"
  >
    <QCard>
      <QCardSection>
        <div class="text-h5 text-center"> Encontre o que procura </div>
      </QCardSection>

      <QCardSection>
        <!-- TODO: implementar o autocomplete aqui -->
        <!-- <QInput
          label="O que deseja encontrar?"
          debounce="1000"
          v-model="model.search"
        /> -->

        <br />

        <QItemSection>
          <label for="slider"> Selecione uma distância (Km) </label>
          <QSlider
            id="slider"
            v-model="model.metters"
            :min="1"
            :max="10"
            :step="1"
            label
            :label-value="model.metters + ' Km'"
          />
        </QItemSection>

      </QCardSection>

      <QCardActions align="right">
        <QBtn
          color="negative"
          flat
          label="Cancelar"
          v-close-popup
        />
        <QBtn
          class="q-ml-sm"
          color="primary"
          flat
          label="Pesquisar"
          @click="onSearch"
        />
      </QCardActions>
    </QCard>

  </QDialog>
</template>

<script>
import {
  // QInput,
  QSlider
} from 'quasar'
import feedFilterMixin from 'src/domains/Feed/mixins/filter'
import modalMixin from 'src/support/mixins/modal'

export default {
  name: 'SearchModal',
  mixins: [ modalMixin, feedFilterMixin ],
  components: {
    // QInput,
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

</style>
