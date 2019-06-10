<template>
  <QCard class="full-width">
    <QCardSection
      :class="`bg-${cardColor} text-white relative-position cursor-pointer`"
      @click="expand"
    >
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

    <QCardSection
      class="no-padding text-center" v-if="isFisicoProduct"
      @click="expand"
    >
      <div>
        <figure>
          <img :src="imagePath">
        </figure>
      </div>
    </QCardSection>

    <QCardSection class="card-footer no-padding">

      <div class="text-center q-px-md q-pb-md">
        {{ countOfLikes }}
        <QBtn
          flat
          color="grey"
          icon="far fa-thumbs-up"
          @click="like"
        />

        <p class="text-body1 feed-price"> R$ {{ dataValue }} </p>

        <QBtn
          flat
          class="asd"
          color="grey"
          icon="far fa-thumbs-down"
          @click="desLike"
        />
        {{ countOfDesLikes }}
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
              <span
                class="text-bold cursor-pointer"
                @click="openUrl"> Acesse aqui a página produto
              </span>
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
              <span class="text-bold cursor-pointer" @click="openMaps"> {{ adressExtens }} </span>
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
              <span class="text-bold cursor-pointer" @click="openMaps"> {{ adressExtens }} </span>
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
import { get, isEmpty, first, last, capitalize } from 'lodash'
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
    expanded: true,
    countOfLikes: 0, // this.data.like
    countOfDesLikes: 0 // this.data.desLike
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
    },
    longitude () {
      return first(get(this.data, 'loc.coordinates'))
    },
    latitude () {
      return last(get(this.data, 'loc.coordinates'))
    },
    mapsUrl () {
      return `https://maps.google.com/?ll=${this.latitude},${this.longitude}`
    }
  },
  methods: {
    expand () {
      this.expanded = !this.expanded
    },
    openMaps () {
      window.open(this.mapsUrl, 'blank')
    },
    openUrl () {
      window.open(this.url, 'blank')
    },
    like () {
      this.countOfLikes++
    },
    desLike () {
      this.countOfDesLikes++
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
  top: 18px;
  left: 15px;
}
.text-bold {
  font-weight: 500;
}

.asd {
  -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

</style>
