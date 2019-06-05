<template>
  <q-layout>

    <q-header class="bg-white text-primary">
      <q-toolbar>
        <q-avatar>
          <!-- Coloque a logo aqui -->
          <img src="statics/quasar-logo.png" alt="">
        </q-avatar>
        <q-toolbar-title>
          Alot
        </q-toolbar-title>

        <UserActions />

      </q-toolbar>
    </q-header>

    <QFooter reveal class="full-width bg-white">
      <FloatingButton />
    </QFooter>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import { QAvatar, QFooter } from 'quasar'
import FloatingButton from './components/FloatingButton'
import UserActions from './components/UserActions'

export default {
  name: 'DashboardLayout',
  data () {
    return {
      left: false
    }
  },
  components: { QAvatar, QFooter, FloatingButton, UserActions }
}
</script>

<style>

.index_link {
  text-decoration: none;
}
</style>
