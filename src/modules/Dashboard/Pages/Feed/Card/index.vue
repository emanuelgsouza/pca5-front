<template>
  <QCard class="full-width">
    <QCardSection>
      <div class="text-h5 relative-position text-center">
        {{ dataName }}
      </div>
    </QCardSection>

    <!-- <QSeparator /> -->

    <QCardSection class="no-padding text-center">
      <div>
        <figure>
          <img :src="imagePath">
        </figure>
      </div>

      <div class="feed-price">R$ {{ dataValue }}</div>

        <!-- <QChip
          rounded
          outline
          color="primary"
          text-color="white"
          icon="fab fa-product-hunt">
          {{ dataTypeName }}
        </QChip> -->

        <QBtn
          flat
          class="btn-info"
          color="primary"
          icon="fas fa-info"
          @click="expand"
        />
    </QCardSection>

    <QSeparator />

    <QCardSection class="text-center">
      <!-- <div class="q-gutter-xs">
        <QCardActions align="around">
          <QBtn class="btn-likeUp" flat round color="primary" icon="far fa-thumbs-up" />
          <QBtn class="btn-likeDown" flat round color="primary" icon="far fa-thumbs-down" />
        </QCardActions>

      </div> -->

      <template v-if="hasUrl">
        <br />
        <QExpansionItem v-model="expanded">

          <QItemSection avatar>
            <QIcon name="fas fa-external-link-alt" />
          </QItemSection>

          <a
          :href="url"
          target="blanck">
          {{ dataName }}
          </a>

        </QExpansionItem>
      </template>

      <template v-if="hasDescription">
        <br />
        <QExpansionItem v-model="expanded">
          <div class="text-center">
            Categoria do serviço: {{ data }} <br />
            Rua: {{ data.adress.rua }} <br />
            Numero: {{ data.adress.numero }} <br />
            Bairro: {{ data.adress.bairro }} <br />
            Cidade: {{ data.adress.cidade }} <br />
            Estado: {{ data.adress.estado }} <br />

            Uma pequena descrição do serviço: {{ dataDescription }}

          </div>
          <!-- {{ dataDescription }} -->
        </QExpansionItem>
      </template>

      <template v-if="hasImagePath">
        <br />
        <QExpansionItem v-model="expanded">
          <div class="text-left">
            Categoria do produto: {{ data.categoria }} <br />
            Rua: {{ data.adress.rua }} <br />
            Numero: {{ data.adress.numero }} <br />
             Bairro: {{ data.adress.bairro }} <br />
            Cidade: {{ data.adress.cidade }} <br />
            Estado: {{ data.adress.estado }} <br />

            <!-- <figure>
              <img :src="imagePath" />
            </figure> -->
          </div>
        </QExpansionItem>
      </template>
    </QCardSection>
  </QCard>
</template>

<script>
import { QCard, QCardSection, QSeparator, QExpansionItem } from 'quasar'
import { get, isEmpty } from 'lodash'
import { FEED_TYPES, FEED_TYPES_NAMES } from 'src/domains/Feed/constants'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    // QChip,
    QCardSection,
    QSeparator,
    QExpansionItem
  },
  props: {
    data: {
      type: Object
    }
  },
  data: () => ({
    expanded: false
  }),
  computed: {
    dataName () {
      return get(this.data, 'nomeProduto', '')
    },
    dataDescription () {
      return get(this.data, 'description', '')
    },
    hasDescription () {
      return !isEmpty(this.dataDescription)
    },
    dataType () {
      return get(this.data, 'tipoProduto', 'se')
    },
    isOnlineProduct () {
      return this.dataType === FEED_TYPES.PRODUTO_ONLINE
    },
    isFisicoProduct () {
      return this.dataType === FEED_TYPES.PRODUTO_FISICO
    },
    isService () {
      return this.dataType === FEED_TYPES.SERVICO
    },
    dataTypeName () {
      return FEED_TYPES_NAMES[this.dataType]
    },
    imagePath () {
      return get(this.data, 'imagePath', null)
    },
    hasImagePath () {
      return !isEmpty(this.imagePath)
    },
    url () {
      return get(this.data, 'url', null)
    },
    hasUrl () {
      return !isEmpty(this.url)
    },
    dataValue () {
      return get(this.data, 'valorProduto', 0)
    }
    // qtnLabel () {
    //   if (this.isOnlineProduct) {
    //     return 'URL do Produto'
    //   }

    //   if (this.isFisicoProduct) {
    //     return 'Imagem'
    //   }

    //   return 'Descrição'
    // },
    // qtnIcon () {
    //   if (this.isOnlineProduct) {
    //     return 'fas fa-external-link-alt'
    //   }

    //   if (this.isFisicoProduct) {
    //     return 'far fa-images'
    //   }

    //   return 'far fa-comment-alt'
    // }
  },
  methods: {
    expand () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style>
.feed-card {
  width: 100%;
}
.feed-price {
  font-size: 25pt;
  display: inline;
}
/* Gambi das brabas */
.btn-info {
  left: 25%;
}
</style>
