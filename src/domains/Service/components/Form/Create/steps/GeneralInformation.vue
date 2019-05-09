<template>
  <div class="general-informations">
    <!-- Informacoes gerais sobre os servicos mais loucos do pedaco -->

<!-- Nome VF
     Entidade Localização VF
     Preço  VF
     Categoria VF
     Mecânica de Qualificação: será um botão de plus e outro de mine
     Descrição limitada VF
     Horário de Criação (datetime) FA
-->

    <QForm ref="form">

      <QInput
      dense
      label="Nome"
      :value="model.name"
      lazy-rules
      hint="Obrigatório"
      :rules="[
        val => val !== null && val !== '' || 'Não esqueça de colocar o nome do serviço'
      ]"
      @input="value => updateModel('name', value)"
      />

      <QInput
        dense
        label="Valor do serviço"
        type="number"
        :min="0"
        :value="model.value"
        lazy-rules
        hint="Obrigatório"
        :rules="[
          val => val !== null || 'Não esqueça de colocar um preço para o serviço'
        ]"
        @input="value => updateModel('value', value)"
      />

      <QSelect
        label="Categoria"
        :options="optionsToCategory"
        :value="model.category"
        hint="Obrigatório"
        lazy-rules
        :rules="[
          val => val !== null || 'Não esqueça de definir uma categoria para o serviço'
        ]"
        @input="value => updateModel('category', value)"
      />
    </QForm>
  </div>
</template>

<script>

import StepMixin from '../mixins/steps'
import { mapState } from 'vuex'

export default {
  name: 'GeneralInformations',
  mixins: [ StepMixin ],
  computed: {
    ...mapState('application', ['categories']),
    opyionsToCategory () {
      return this.categories.amp(category => {
        return {
          value: category.id,
          label: category.name
        }
      })
    }
  }
}
</script>
