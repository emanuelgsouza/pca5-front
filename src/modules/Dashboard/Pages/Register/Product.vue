<template>
  <div class="q-pa-xs">
    <!-- <p class="text-h6"> Cadastre aqui o produto </p> -->
    <CreateProductForm ref="form" @data="onData" />
  </div>
</template>

<script>
import CreateProductForm from 'src/domains/Product/components/Form/Create'
import { createPost } from 'src/services/actions'
import injectCoordinatesMixin from 'src/domains/Geolocalization/vuex/inject-mixin'

export default {
  components: { CreateProductForm },
  mixins: [ injectCoordinatesMixin ],
  data: () => ({
    model: {}
  }),
  methods: {
    onData (model) {
      // Função responsável por fazzer a requisição para a API
      this.model = { ...model }
      const type = this.model.is_online ? 'po' : 'pf'

      return createPost(this.model, type, this.coordinates)
        .then(() => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Produto cadastrado com sucesso'
          })

          this.$refs.form.clear()

          this.$router.push({
            name: 'dashboard'
          })
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
