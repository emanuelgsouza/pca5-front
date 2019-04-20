<template>

  <QForm
  @submit="onSubmit"
  @reset="onReset"
  class="q-gutter-md">
    <br>

    <QInput
    label="Nome do usuário"
    v-model="model.name"
    filled
    type="user"
    :rules="[val => !!val || 'Item obrigatorio']"
    />

    <QInput
    label="Email"
    v-model="model.email"
    filled type="email"
    :rules="[val => !!val || 'Item obrigatorio']"
    />

    <QInput
        filled
        v-model="model.phone"
        label="Telefone"
        mask="(##) ##### - ####"
        :rules="[val => !!val || 'Item obrigatorio']"
    />

    <QSelect
    label="Interesses"
    :option="optionsToInteresses"
    v-model="model.interecesses"
    lazy-rules
    :rules="[
        val => val !== null || 'Não esqueça de definir um interece!'
      ]"
    />

    <QInput
    v-model="model.password"
    label="Password"
    filled
    type="password"
    :rules="[val => !!val || 'Item obrigatorio']"
    />

    <QBtn label="Cadastrar" type="submit" color="primary"/>
    <QBtn label="Limpar" type="reset" color="negative" class="q-ml-sm"/>

  </QForm>
</template>

<script>

import { QForm, QInput, QSelect } from 'quasar'

export default {
  name: 'CreateLoginForm',
  components: { QForm, QInput, QSelect },
  data: () => ({
    optionsToInteresses: [
      { label: 'Disney', value: 'disney' },
      { label: 'Orlando', value: 'orlando' },
      { label: 'Resort', value: 'resort' }
    ],
    model: {
      name: null,
      email: null,
      phone: null,
      password: null,
      interecesses: null
    }
    // return {
    //   model: ''
    // }
  }),
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
