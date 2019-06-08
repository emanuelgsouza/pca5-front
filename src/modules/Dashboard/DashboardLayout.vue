<template>
  <q-layout>

    <q-header class="bg-white text-primary">
      <q-toolbar>
        <!-- <q-avatar>
          <img src="statics/alot-logo.png" alt="">
        </q-avatar>
        <q-toolbar-title>
          Alot
        </q-toolbar-title> -->

        <UserActions class="user-actions absolute-center" />

      </q-toolbar>
    </q-header>

    <QFooter
      v-if="showFooter"
      reveal
      class="full-width bg-white"
    >
      <FloatingButton />
    </QFooter>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import {
  // QAvatar,
  QFooter
} from 'quasar'
import { includes } from 'lodash'
import FloatingButton from './components/FloatingButton'
import UserActions from './components/UserActions'

export default {
  name: 'DashboardLayout',
  data () {
    return {
      left: false
    }
  },
  components: {
    // QAvatar,
    QFooter,
    FloatingButton,
    UserActions
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    showFooter () {
      const blackList = [
        'dashboard.register.update'
      ]
      return !includes(blackList, this.routeName)
    }
  }
}
</script>

<style>
.index_link {
  text-decoration: none;
}

.user-actions {
  width: 100%;
}
</style>
