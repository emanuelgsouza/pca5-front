<template>
  <div class="general-informations">
    <!-- <p> Informações gerais do produto </p> -->
    <QForm ref="form">
      <QInput
        dense
        label="Nome"
        :value="model.name"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Não esqueça de colocar o nome do produto'
        ]"
        @input="value => updateModel('name', value)"
      />

      <QInput
        dense
        label="Valor do produto"
        type="number"
        :min="0"
        :value="model.value"
        lazy-rules
        :rules="[
          val => val !== null || 'Não esqueça de colocar um preço para o produto',
          val => val > 0 && val < 100 || 'Defina um valor verídico para o produto'
        ]"
        @input="value => updateModel('value', value)"
      />

      <QSelect
        label="Categoria"
        :options="optionsToCategory"
        :value="model.category"
        lazy-rules
        :rules="[
          val => val !== null || 'Não esqueça de definir uma categoria para o produto'
        ]"
        @input="value => updateModel('category', value)"
      />
    </QForm>
  </div>
</template>

<script>
import StepsMixin from '../mixins/steps'

export default {
  name: 'GeneralInformations',
  mixins: [ StepsMixin ],
  data: () => ({
    optionsToCategory: [
      { label: 'Moda', value: 'modal' },
      { label: 'Comida', value: 'comida' }
    ]
  })
}
</script>

<style>

</style>
