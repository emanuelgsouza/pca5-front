<template>
  <q-layout>

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->
        <q-toolbar-title>
          <router-link
            to="/"
            class="text-white index_link"> PCA - Unigranrio </router-link>
        </q-toolbar-title>

        <QBtn
          flat
          round
          icon="fab fa-google"
          @click="onLogin"
        />

      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="left" side="left" bordered>
      drawer content
    </q-drawer> -->

    <q-page-container>
      <router-view />

      <FloatingButton />
    </q-page-container>

  </q-layout>
</template>
<script>
import FloatingButton from './components/FloatingButton'
import { QBtn } from 'quasar'
import { loginWithGoogle } from 'src/services/firebase/auth'

export default {
  name: 'DashboardLayout',
  data () {
    return {
      left: false
    }
  },
  components: { FloatingButton, QBtn },
  methods: {
    onLogin () {
      loginWithGoogle()
    }
  }
}
</script>

<style>

.index_link {
  text-decoration: none;
}
</style>
