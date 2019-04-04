<template>
  <div>
    <QInput
      label="Nome"
      v-model="model.name" />

    <QToggle
      v-model="model.is_online"
      label="O produto é de uma loja física ou online?" />

    <QInput
      v-if="isOnlineProduct"
      label="URL do produto"
      v-model="model.url" />

    <QInput
      label="Valor do produto"
      type="number"
      :min="0"
      v-model="model.value" />

    <QSelect
      label="Categoria"
      :options="optionsToCategory"
      v-model="model.category" />

    <div class="q-mt-md">
      <QBtn label="Cadastrar" type="submit" color="primary"/>
      <QBtn label="Limpar" type="reset" color="negative" class="q-ml-sm" />
    </div>
  </div>
</template>

<script>
import { QInput, QSelect, QToggle } from 'quasar'

export default {
  name: 'CreateProductForm',
  components: { QInput, QSelect, QToggle },
  data: () => ({
    optionsToCategory: [],
    model: {
      name: null,
      url: null,
      category: null,
      is_online: false,
      value: null
    }
  }),
  computed: {
    isOnlineProduct () {
      return this.model.is_online
    }
  }
}
</script>

<style>

</style>
