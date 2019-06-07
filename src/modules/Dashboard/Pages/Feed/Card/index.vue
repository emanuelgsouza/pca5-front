<template>
  <QCard class="full-width" @click="expand">
    <QCardSection :class="`bg-${cardColor} text-white relative-position`">
      <QIcon
        class="card-icon absolute-left"
        square
        size="28px"
        color="white"
        :name="categoryIcon"
      />
      <div class="text-h5 relative-position text-center">
        {{ dataName }}
      </div>
    </QCardSection>

    <QCardSection class="no-padding text-center" v-if="isFisicoProduct">
      <div>
        <figure>
          <img :src="imagePath">
        </figure>
      </div>
    </QCardSection>

    <QCardSection class="card-footer no-padding">
      <div class="text-center q-px-md q-pb-md">
        <p class="text-body1 feed-price"> R$ {{ dataValue }} </p>
      </div>

      <!-- Informacoes dos produtos online -->
      <template v-if="isOnlineProduct">
        <QExpansionItem v-model="expanded">
          <QSeparator  />
          <div class="q-pa-md">
            <QIcon
              size="24px"
              name="language"
              :color="cardColor"
            />
              <span> {{ url }} </span>
          </div>
        </QExpansionItem>
      </template>

      <!-- Informacoes dos servicos -->
      <template v-if="isService">
        <QExpansionItem v-model="expanded">
          <QSeparator  />
          <div class="q-pa-md">
            <QIcon
              size="24px"
              name="place"
              :color="cardColor"
            />
              <span> {{ adressExtens }} </span>
          </div>
        </QExpansionItem>
      </template>

      <!-- Informacoes dos produtos fisicos -->
      <template v-if="isFisicoProduct">
        <QExpansionItem v-model="expanded">
          <QSeparator  />
          <div class="q-pa-md">
            <QIcon
              size="24px"
              name="place"
              :color="cardColor"
            />
              <span> {{ adressExtens }} </span>
          </div>
        </QExpansionItem>
      </template>
    </QCardSection>
  </QCard>
</template>

<script>
import {
  QCard,
  QIcon,
  // QChip,
  QSeparator,
  QCardSection,
  QExpansionItem
} from 'quasar'
import { get, isEmpty, capitalize } from 'lodash'
import { FEED_TYPES, FEED_TYPES_NAMES } from 'src/domains/Feed/constants'
import { loadIconCategories } from 'src/domains/Categories/support/load-categories'
import { getColorByType } from 'src/domains/Feed/support'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    QIcon,
    // QChip,
    QSeparator,
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
      return getColorByType(this.dataType)
    },
    category () {
      return get(this.data, 'categoria', '')
    },
    categoryIcon () {
      return loadIconCategories(this.category)
    },
    adress () {
      return this.data.adress || {}
    },
    adressExtens () {
      return [
        this.adress.rua,
        this.adress.numero,
        this.adress.cidade,
        this.adress.estado,
        this.adress.pais
      ]
        .map(capitalize)
        .reduce((acc, word) => {
          acc += acc.length ? `, ${word}` : word
          return acc
        }, '')
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

.card-icon {
  top: 10px;
  left: 10px;
}
</style>
