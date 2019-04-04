<template>
  <QPage padding class="q-pa-md row items-start q-gutter-md">
    <p> Veja aqui os produtos / serviços que selecionamos para você </p>
    <ProductCard
      v-for="(product, key) in products"
      :key="key"
      :product="product" />

    <QPageSticky position="bottom-right" :offset="[18, 18]">
      <QBtn fab color="primary" icon="add" />
    </QPageSticky>
  </QPage>
</template>

<script>
import { QPageSticky } from 'quasar'
import ProductCard from 'src/domains/Product/components/Card'

export default {
  name: 'DashboardPageIndex',
  components: {
    QPageSticky,
    ProductCard
  },
  data: () => ({
    products: [
      {
        name: 'Teste',
        is_online: false,
        value: 40,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores eum quasi iusto vitae ratione, consequuntur dolor ad quas eaque magnam nulla fugiat. Adipisci illum esse modi? Nisi, voluptatum sint.',
        user: {
          name: 'Anonymous'
        },
        createdAt: new Date(),
        category: {
          name: 'Vestuário'
        }
      },
      {
        name: 'Teste',
        is_online: true,
        value: 40,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores eum quasi iusto vitae ratione, consequuntur dolor ad quas eaque magnam nulla fugiat. Adipisci illum esse modi? Nisi, voluptatum sint.',
        user: {
          name: 'Anonymous'
        },
        createdAt: new Date(),
        category: {
          name: 'Vestuário'
        }
      },
      {
        name: 'Teste',
        is_online: false,
        value: 40,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores eum quasi iusto vitae ratione, consequuntur dolor ad quas eaque magnam nulla fugiat. Adipisci illum esse modi? Nisi, voluptatum sint.',
        user: {
          name: 'Anonymous'
        },
        createdAt: new Date(),
        category: {
          name: 'Vestuário'
        }
      },
      {
        name: 'Teste',
        is_online: false,
        value: 40,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores eum quasi iusto vitae ratione, consequuntur dolor ad quas eaque magnam nulla fugiat. Adipisci illum esse modi? Nisi, voluptatum sint.',
        user: {
          name: 'Anonymous'
        },
        createdAt: new Date(),
        category: {
          name: 'Vestuário'
        }
      }
    ]
  })
}
</script>

<style>

</style>
