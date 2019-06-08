<template>
  <QPage padding>
    <div class="sign-up q-gutter-md">
      <h6 class="text-center no-margin"> Termine de efetuar seu cadastro </h6>
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
            label="Data de nascimento"
            required
          >
            <template v-slot:append>
              <QIcon name="event" class="cursor-pointer">
                <QPopupProxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <QDate
                    minimal
                    :value="model.birthday"
                    :locale="myLocale"
                    @input="onDateInput"
                  />
                </QPopupProxy>
              </QIcon>
            </template>
          </QInput>

          <!--
          <QBtn
          color="primary"
          label="EULA"

          />

          <br /> -->

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
        birthday: moment().format('DD/MM/YYYY'),
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
      ],
      myLocale: {
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_')
      }
    }
  },
  methods: {
    fillUser (user) {
      this.model.name = get(user, 'name')
      this.model.email = get(user, 'email')
    },
    finishRegister () {
      this.$q.loading.show({
        message: 'Atualizando seus dados'
      })
      const model = {
        ...this.model,
        birthday: moment(this.model).toDate()
      }
      updateUser(model)
        .then((user) => {
          this.$q.notify({
            color: 'positive',
            icon: 'fas fa-check-circle',
            message: 'Dados atualizados com sucesso'
          })
          this.$q.loading.hide()

          this.$router.push('/dashboard')
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            icon: 'fas fa-exclamation-triangle',
            message: 'Houve um erro na atualização dos dados'
          })

          this.$q.loading.hide()
        })
    },
    onDateInput (val) {
      this.model.birthday = moment(val).format('DD/MM/YYYY')

      this.$refs.qDateProxy.hide()
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
