<template>
  <q-layout>

    <q-header class="bg-white text-primary">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->
        <q-toolbar-title>
          <router-link
            to="/"
            class="text-primary index_link"> PCA - Unigranrio </router-link>
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
import { QFooter } from 'quasar'
import FloatingButton from './components/FloatingButton'
import UserActions from './components/UserActions'

export default {
  name: 'DashboardLayout',
  data () {
    return {
      left: false
    }
  },
  components: { QFooter, FloatingButton, UserActions }
}
</script>

<style>

.index_link {
  text-decoration: none;
}
</style>
