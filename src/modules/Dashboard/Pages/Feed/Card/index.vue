<template>
  <QCard class="full-width" @click="expand">
    <QCardSection :class="`bg-${cardColor} relative-position`">
      <QChip
        class="absolute-left"
        square
        color="white"
        :icon="categoryIcon"
      />
      <div class="text-h5 relative-position text-center">
        {{ dataName }}
      </div>
    </QCardSection>

    <QCardSection class="no-padding text-center" >
      <div>
        <figure>
          <img :src="imagePath">
        </figure>
      </div>
    </QCardSection>

    <QCardSection class="card-footer">
      <div class="row justify-between items-center">
        <div>
          <!-- TODO: Implementar filtro para preço -->
          <p class="text-body1 feed-price"> R$ {{ dataValue }} </p>
        </div>
        <div>
          <QBtn
            round
            flat
            class="btn-info"
            color="primary"
            icon="fas fa-info-circle"
            @click="expand"
          />
        </div>
      </div>

      <!-- Informacoes dos produtos online -->
      <template v-if="isOnlineProduct">
        <QExpansionItem v-model="expanded">
          <div class="text-center q-my-md">
            <QIcon
              size="24px"
              name="fas fa-external-link-alt"
              :color="cardColor"
            />
          </div>

          <div class="text-left">
            <p> <a :href="url" target="blanck"> Confira o produto </a> </p>
          </div>

        </QExpansionItem>
      </template>

      <!-- Informacoes dos servicos -->
      <template v-if="isService">
        <QExpansionItem v-model="expanded">
          <div class="q-my-md">
            <QIcon
              size="24px"
              name="fas fa-map-marker-alt"
              :color="cardColor"
            />

              {{ data.adress.rua }} ,
              {{ data.adress.numero }},
              {{ data.adress.bairro }},
              {{ data.adress.cidade }},
              {{ data.adress.estado }}
          </div>

          <p class="text-italic"> {{ dataDescription }} </p>
          <!-- {{ dataDescription }} -->
        </QExpansionItem>
      </template>

      <!-- Informacoes dos produtos fisicos -->
      <template v-if="isFisicoProduct">
        <QExpansionItem v-model="expanded">
          <div class="q-my-md">
            <QIcon
              size="24px"
              name="fas fa-map-marker-alt"
              :color="cardColor"
            />
              {{ data.adress.rua }} ,
              {{ data.adress.numero }},
              {{ data.adress.bairro }},
              {{ data.adress.cidade }},
              {{ data.adress.estado }}
          </div>
        </QExpansionItem>
      </template>
    </QCardSection>
  </QCard>
</template>

<script>
import {
  QCard,
  QChip,
  QCardSection,
  QExpansionItem
} from 'quasar'
import { get, isEmpty } from 'lodash'
import { FEED_TYPES, FEED_TYPES_NAMES } from 'src/domains/Feed/constants'
import { loadIconCategories } from 'src/domains/Categories/support/load-categories'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    QChip,
    QCardSection,
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
    },
    cardColor () {
      if (this.isOnlineProduct) {
        return 'primary'
      }

      return this.isFisicoProduct ? 'secondary' : 'info'
    },
    category () {
      return get(this.data, 'categoria', '')
    },
    categoryIcon () {
      return loadIconCategories(this.category)
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
  display: inline;
}
/* Gambi das brabas */
.btn-info {
  left: 25%;
}

.card-footer {
  padding-top: 16px !important;
}

.q-chip__icon--left {
  margin: 0 !important;
}
</style>
