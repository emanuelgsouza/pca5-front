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

      return Promise.resolve(true)
        .then(() => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Produto cadastrado com sucesso'
          })

          this.$refs.form.clear()
        })
        .catch(err => {
          console.error(err)
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Houve um erro na hora de salvar os dados'
          })
        })
    }
  }
}
</script>

<style>

</style>
