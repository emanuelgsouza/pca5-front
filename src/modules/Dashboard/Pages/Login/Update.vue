<template>
  <QPage padding>
    <div class="sign-up q-gutter-md">
      <h6> Termine de efetuar seu cadastro </h6>
        <QForm @submit="finishRegister" class="q-gutter-xs">
          <QInput
            filled
            type="text"
            label="Nome"
            v-model="model.name"
            required
          />

          <QInput
            filled
            type="text"
            label="Email"
            v-model="model.email"
            disable
          />

          <QSelect
            filled
            v-model="model.gender"
            :options="options"
            label="Sexo"
            required
          />

          <QInput
            filled
            v-model="model.date"
            mask="date"
            :rules="['date']"
            required
          >
            <template v-slot:append>
              <QIcon name="event" class="cursor-pointer">
                <QPopupProxy>
                  <QDate v-model="model.date" />
                </QPopupProxy>
              </QIcon>
            </template>
          </QInput>

          <QBtn
            color="primary"
            label="Finalizar cadastro"
            type="submit"
          />
        </QForm>

    </div>
  </QPage>
</template>

<script>
import { QInput, QSelect, QDate, QPopupProxy, QForm } from 'quasar'
import InjectUser from 'src/domains/User/mixins/inject-user'
import updateUser from 'src/domains/User/actions/update'
// import firebase from 'firebase'

export default {
  name: 'FinishRegister',
  components: { QInput, QSelect, QDate, QPopupProxy, QForm },
  watch: {
    user: 'fillUser'
  },
  data () {
    return {
      model: {
        name: '',
        email: '',
        gender: 'Masculino',
        date: '2019/05/01', // Modificar para dateNow()
        is_first_login: false
      },
      options: [
        'Masculino', 'Feminino', 'Outro'
      ]
    }
  },
  methods: {
    fillUser (user) {
      this.model.name = user.name
      this.model.email = user.email
    },
    finishRegister () {
      updateUser(this.model)
        .then((user) => {
          this.$q.notify({ color: 'positive', message: 'Deu certo !' })
          this.setUser(user)
          this.$router.push('/dashboard/index')
        })
        .catch(() => {
          this.$q.notify({ color: 'negative', message: 'Deu ruim !' })
        })
    }
  },
  mixins: [
    InjectUser
  ],
  mounted () {
    this.fillUser(this.user)
  }
}
</script>
