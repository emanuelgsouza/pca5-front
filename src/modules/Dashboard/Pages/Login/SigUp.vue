<template>
  <div class="sign-up q-gutter-md">
    <h1>Crie uma nova conta</h1>
      <QInput
      type="text"
      label="Email"
      v-model="email"
      />

      <br>

      <QInput
      filled
      type="text"
      label="Senha"
      v-model="senha"
      />

      <br>

      <QBtn
      color="primary"
      label="Registrar"
      click="signUp"
      />
      <!-- <button @click="signUp">Registrar</button> -->

      <span>
        ou retorne ao
        <router-link :to="{ name: 'dashboard.register.login' }">
          login.</router-link>
      </span>
  </div>

</template>

<script>

import { QInput } from 'quasar'
import firebase from 'firebase'

export default {

  name: 'signUp',
  components: { QInput },
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  method: {
    signUp () {
      console.log('Filho da puta')
      firebase.auth().createUserWithEmailAndPassword(this.email, this.senha).then(
        (user) => {
          this.$router.replace('/')
        },
        (err) => {
          console.log('Deu ruim tio. ' + err.message)
        }
      )
    }
  }

}
</script>
