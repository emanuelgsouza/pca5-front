<template>
  <QCard class="full-width">
    <QCardSection>
      <div class="text-h6 relative-position text-center">
        {{ dataName }}
      </div>
    </QCardSection>

    <QSeparator />

    <QCardSection class="text-center">
      <div class="feed-price">
        R$ {{ dataValue }}
      </div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div class="q-gutter-xs">
        <!-- <QChip
          color="primary"
          text-color="white"
          icon="cake"> {{  }} </QChip> -->
        <QChip
          square
          outline
          color="primary"
          text-color="white"
          icon="fab fa-product-hunt">
          {{ dataTypeName }}
        </QChip>

        <QBtn
          flat
          color="negative"
          :icon="qtnIcon"
          :label="qtnLabel"
          @click="expand"
        />
      </div>

      <template v-if="hasUrl">
        <br />
        <QExpansionItem v-model="expanded">
          <a :href="url" target="blanck"> Link do produto </a>
        </QExpansionItem>
      </template>

      <template v-if="hasDescription">
        <br />
        <QExpansionItem v-model="expanded">
          {{ dataDescription }}
        </QExpansionItem>
      </template>

      <template v-if="hasImagePath">
        <br />
        <QExpansionItem v-model="expanded">
          <div class="text-center">
            <figure>
              <img :src="imagePath" />
            </figure>
          </div>
        </QExpansionItem>
      </template>
    </QCardSection>
  </QCard>
</template>

<script>
import { QCard, QCardSection, QSeparator, QChip, QExpansionItem } from 'quasar'
import { get, isEmpty } from 'lodash'
import { FEED_TYPES, FEED_TYPES_NAMES } from 'src/domains/Feed/constants'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    QChip,
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
    },
    qtnLabel () {
      if (this.isOnlineProduct) {
        return 'URL do Produto'
      }

      if (this.isFisicoProduct) {
        return 'Imagem'
      }

      return 'Descrição'
    },
    qtnIcon () {
      if (this.isOnlineProduct) {
        return 'fas fa-external-link-alt'
      }

      if (this.isFisicoProduct) {
        return 'far fa-images'
      }

      return 'far fa-comment-alt'
    }
  },
  methods: {
    expand () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style>

</style>
