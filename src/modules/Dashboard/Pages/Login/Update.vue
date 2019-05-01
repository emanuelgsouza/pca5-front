<template>
  <div class="sign-up q-gutter-md">
    <h1> Termine de efetuar seu cadastro </h1>
      <QInput
      filled
      type="text"
      label="Nome"
      v-model="name"
      />

      <QInput
      type="text"
      label="Email"
      v-model="email"
      disable
      />

      <QSelect
      filled
      v-model="model"
      :options="options"
      label="Sexo" />

      <QDate
      v-model="date"
      minimal
      />

      <QBtn
      color="primary"
      label="Finalizar cadastro"
      click="finishRegister"
      />

  </div>

</template>

<script>

import { QInput, QSelect, QDate } from 'quasar'
import firebase from 'firebase'

export default {
  name: 'FinishRegister',
  components: { QInput, QSelect, QDate },
  data () {
    return {
      name: '',
      email: '',
      date: '2019/05/01', // Modificar para dateNow()
      options: [
        'Masculino', 'Feminino', 'Outro'
      ],
      is_first_login: false
    }
  },
  method: {
    finishRegister () {
      updateUser(user)
        .then(() => {
          // leva para a dash
        })
        .catch(() => {
          // Notifique ao usuario que deu merda
        })
    }
  }

}
</script>
