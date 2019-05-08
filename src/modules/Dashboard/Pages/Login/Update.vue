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
            map-options
            emit-value
          />

          <QInput
            filled
            v-model="model.birthday"
            mask="date"
            :rules="['date']"
            required
          >
            <template v-slot:append>
              <QIcon name="event" class="cursor-pointer">
                <QPopupProxy>
                  <QDate
                    :value="model.birthday"
                    @input="onDateInput"
                  />
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
import { get } from 'lodash'
import moment from 'moment'
import updateUser from 'src/domains/User/actions/update'
import InjectUser from 'src/domains/User/mixins/inject-user'

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
        gender: 'M',
        birthday: moment().format('YYYY-MM-DD'),
        is_first_login: false
      },
      options: [
        {
          label: 'Masculino',
          value: 'M'
        },
        {
          label: 'Feminino',
          value: 'F'
        },
        {
          label: 'Outro',
          value: 'O'
        }
      ]
    }
  },
  methods: {
    fillUser (user) {
      this.model.name = get(user, 'name')
      this.model.email = get(user, 'email')
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
    },
    onDateInput (val) {
      this.model.birthday = moment(val).format('YYYY-MM-DD')
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
