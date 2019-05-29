<template>
  <div class="login">
    <h1>Login</h1>
    <QInput filled type="text" label="Email" v-model="email"/>

    <br>

    <QInput filled type="text" label="Senha" v-model="senha"/>

    <br>

    <div class="q-mt-md">
      <QBtn color="primary" click="login" label="Login"/>
    </div>

    <br>

    <!-- Adicionar icon para login do google e funcionalidade -->
    <QBtn icon='thumb_up'/>

    <p>
      Voce nao tem conta meu amigo(a)
      <span>
        <router-link :to="{ name: 'dashboard.register.sigup' }">Crie uma conta</router-link>
      </span>
    </p>
  </div>
</template>

<script>
import { QInput } from 'quasar'
import { loginWithGoogle } from 'src/services/firebase/auth'

export default {
  name: 'login',
  components: { QInput },
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  method: {
    login () {
      loginWithGoogle()
    }
  }
}
</script>
