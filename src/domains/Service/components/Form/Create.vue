<template>
  <QForm
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md">
    <QInput
      filled
      label="Nome do serviço"
      v-model="model.name"
      lazy-rules
      :rules="[
        val => val!== null && val !== '' || 'Não esqueça de colocar o nome do serviço'
      ]"
      />

    <QInput
    filled
    label="Valor do serviço"
    type="number"
    :min="0"
    v-model="model.value"
    lazy-rules
      :rules="[
        val => val !== null || 'Não esqueça de colocar um preço para o serviço',
        val => val > 0 && val < 100 || 'Defina um valor verídico para o serviço'
    ]" />

    <QBtnToggle
      v-model="model.is_online"
      label="O serviço é de uma loja física ou online?"
      toggle-color="primary"
      :options="[
      {label: 'On-line', value: 'on-line'},
      {label: 'Local', value: 'local'}
      ]"
      />

      <!-- Input de servico on line -->
    <QInput
      filled
      v-if="isOnlineService"
      label="URL do serviço"
      v-model="model.url" />

      <!-- Input de servico offline (Model.en seria o endereco)-->
    <QToggle
      v-if="isOfflineService"
      v-model="model.is_offline"
      label="Buscar por geolocalização ?" />

    <QInput
      filled
      v-if="isOfflineService"
      label="Estado"
      v-model="model.end" />

    <QInput
      filled
      v-if="isOfflineService"
      label="Cidade"
      v-model="model.end"/>

      <!-- Adicionar busca por cep ? -->

    <QSelect
      label="Categoria"
      :options="optionsToCategory"
      v-model="model.category"
      lazy-rules
      :rules="[
        val => val !== null || 'Não esqueça de definir uma categoria para o serviço']"
        />

    <QInput
      v-model="model.area"
      filled
      label="Descricao"
      type="textarea" :max-height="140"
      lazy-rules
      :rules="[
        val => val !== null || 'Não esqueça de colocar uma pequena descricao para o serviço']"
      />

      <QBtn label="Cadastrar" type="submit" color="primary"/>
      <QBtn label="Limpar" type="reset" color="negative" class="q-ml-sm"/>

  </QForm>
</template>

<script>
import { QForm, QInput, QSelect, QBtnToggle } from 'quasar'

export default {
  name: 'CreateServiceForm',
  components: { QForm, QInput, QSelect, QBtnToggle },
  data: () => ({
    optionsToCategory: [
      { label: 'Moda', value: 'modal' },
      { label: 'Comida', value: 'comida' }
    ],
    model: {
      area: null,
      name: null,
      url: null,
      end: null,
      category: null,
      is_online: false,
      is_offline: false,
      value: null
    }
  }),
  computed: {
    isOnlineService () {
      return this.model.is_online
    },
    isOfflineService () {
      return this.model.is_offline
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
    },
    clear () {
      this.onReset()
    }
  }
}
</script>
<style>

</style>
