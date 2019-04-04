<template>
  <QForm
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md">
    <QInput
      filled
      label="Nome"
      v-model="model.name"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Não esqueça de colocar o nome do produto'
      ]"
      />

    <QToggle
      v-model="model.is_online"
      label="O produto é de uma loja física ou online?" />

    <br />

    <QInput
      filled
      v-if="isOnlineProduct"
      label="URL do produto"
      v-model="model.url" />

    <QInput
      filled
      label="Valor do produto"
      type="number"
      :min="0"
      v-model="model.value"
      lazy-rules
      :rules="[
        val => val !== null || 'Não esqueça de colocar um preço para o produto',
        val => val > 0 && val < 100 || 'Defina um valor verídico para o produto'
      ]" />

    <QSelect
      label="Categoria"
      :options="optionsToCategory"
      v-model="model.category"
      lazy-rules
      :rules="[
        val => val !== null || 'Não esqueça de definir uma categoria para o produto'
      ]" />

    <div class="q-mt-md">
      <QBtn label="Cadastrar" type="submit" color="primary"/>
      <QBtn label="Limpar" type="reset" color="negative" class="q-ml-sm" />
    </div>
  </QForm>
</template>

<script>
// TODO: implementar captura de latitude e longitude do usuário, para pegar os restantes dos dados e assim exibí-los no form
import { QForm, QInput, QSelect, QToggle } from 'quasar'

export default {
  name: 'CreateProductForm',
  components: { QForm, QInput, QSelect, QToggle },
  data: () => ({
    optionsToCategory: [
      { label: 'Moda', value: 'modal' },
      { label: 'Comida', value: 'comida' }
    ],
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
  },
  methods: {
    onSubmit () {
      // Esta função só será invocada quando o formulário estiver corretamente preenchido
      this.$emit('data', { ...this.model })
    },
    onReset () {
      // Esta função tem como objetivo resetar os dados do formulário
      this.model = {
        ...this.$options.data().model
      }
    }
  }
}
</script>

<style>

</style>
