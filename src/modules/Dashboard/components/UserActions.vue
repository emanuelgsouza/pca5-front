<template>
  <div>
    <QBtn
      v-if="isUserLoading"
      flat
      class="full-width"
      label="Carregando usuário..."
    />

    <QBtn
      v-if="!hasUser && !isUserLoading"
      label="Entre com sua conta Google"
      color="negative"
      class="full-width"
      flat
      icon="fab fa-google"
      @click="login"
    />

    <QBtnDropdown
      v-if="hasUser && !isUserLoading"
      flat
      class="full-width"
      :label="userName">

      <QList>
        <!-- <QItem clickable v-close-popup :to="{name: 'dashboard.user.settings'}">
          <QItemSection>
            <QItemLabel> Configurações </QItemLabel>
          </QItemSection>
          <QItemSection avatar>
            <QIcon name="settings"
          />
          </QItemSection>
        </QItem> -->
        <QItem clickable v-close-popup @click="logout">
          <QItemSection>
            <QItemLabel> Sair </QItemLabel>
          </QItemSection>
          <QItemSection avatar>
            <QIcon name="fas fa-sign-out-alt"
          />
          </QItemSection>
        </QItem>
      </QList>

    </QBtnDropdown>
  </div>
</template>

<script>
import {
  QBtnDropdown,
  QList,
  QItem,
  QItemSection,
  QIcon,
  QItemLabel
} from 'quasar'
// import { first } from 'lodash'
import { loginWithGoogle } from 'src/services/firebase/auth'
import injectUser from 'src/domains/User/mixins/inject-user'

export default {
  name: 'HeaderUserActions',
  mixins: [ injectUser ],
  components: {
    QBtnDropdown,
    QList,
    QItem,
    QItemSection,
    QIcon,
    QItemLabel
  },
  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    },
    userName () {
      if (!this.hasUser) {
        return null
      }

      if (this.isMobile) {
        return `Ola, ${this.username}`
      }

      return this.username
    }
  },
  methods: {
    login () {
      loginWithGoogle()
    },
    logout () {
      this.$q.loading.show({
        message: 'Fazendo logout na aplicação'
      })

      const timeout = setTimeout(() => {
        this.logoutUser()
          .then(() => {
            this.$q.loading.hide()

            this.$root.$emit('load:problems')

            clearTimeout(timeout)
          })
      }, 2000)
    }
  }
}
</script>

<style>

</style>
