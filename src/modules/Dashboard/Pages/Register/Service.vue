<template>
  <div>
    <p class="text-h6"> Cadastre aqui o serviço </p>

    <CreateServiceForm ref="form" @data="onData" />
  </div>

</template>

<script>
import CreateServiceForm from 'src/domains/Service/components/Form/Create'

export default {
  components: { CreateServiceForm },
  data: () => ({
    model: {}
  }),
  methods: {
    onData (model) {
      // Requisição para a API
      this.models = { ...model }

      return Promise.resolve(true)
        .then(() => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Serviço cadastrado com sucesso'
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

<style> </style>
