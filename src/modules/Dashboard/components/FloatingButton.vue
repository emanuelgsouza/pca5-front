<template>
  <QPageSticky position="bottom-right" :offset="[18, 18]">
    <QBtn fab icon="add" color="negative" />
  </QPageSticky>
</template>

<script>
import { QPageSticky, QBtn } from 'quasar'

export default {
  name: 'FloatingButton',
  components: { QPageSticky, QBtn }
}
</script>

<style>

</style>
