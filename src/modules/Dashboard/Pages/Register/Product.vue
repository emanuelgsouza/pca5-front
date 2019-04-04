<template>
  <div>
    <p class="text-h6"> Cadastre aqui o produto </p>

    <CreateProductForm ref="form" @data="onData" />
  </div>
</template>

<script>
import CreateProductForm from '../../../../domains/Product/components/Form/Create'

export default {
  components: { CreateProductForm },
  data: () => ({
    model: {}
  }),
  methods: {
    onData (model) {
      // Função responsável por fazzer a requisição para a API
      this.models = { ...model }

      this.$refs.form.clear()
    }
  }
}
</script>

<style>

</style>
