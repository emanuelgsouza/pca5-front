<template>
  <div>
    <p> Cadastre aqui o produto </p>

    <CreateProductForm />
  </div>
</template>

<script>
import CreateProductForm from '../../../../domains/Product/components/Form/Create'

export default {
  components: { CreateProductForm },
  data: () => ({

  })
}
</script>

<style>

</style>
