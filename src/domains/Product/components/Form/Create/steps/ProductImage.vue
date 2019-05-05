<template>
  <div class="product-image">
    <h6 class="no-margin"> Suba aqui uma imagem para podermos identificar o produto </h6>

    <AppFirebaseUploader
      class="q-mt-xs"
      accept=".jpg, image/*"
      ref="firebaseUploader"
      @filename="onFilename"
      @downloadURL="onDownloadURL"
    />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import StepsMixin from '../mixins/steps'
import AppFirebaseUploader from 'src/components/AppFirebaseUploader'

export default {
  name: 'ProductImage',
  mixins: [ StepsMixin ],
  components: { AppFirebaseUploader },
  props: {
    imageFilename: String
  },
  computed: {
    hasDownloadUrl () {
      return !isEmpty(this.model.url)
    }
  },
  watch: {
    downloadURL: 'emitDownloadUrl'
  },
  methods: {
    upload () {
      if (this.hasDownloadUrl) {
        return Promise.resolve(this.model.url)
      }

      return this.$refs.firebaseUploader.upload()
        .then(downloadUrl => Promise.resolve(downloadUrl))
        .catch(err => Promise.reject(err))
    },
    onDownloadURL (downloadUrl) {
      // use the same protocol in other steps: update model prop
      this.updateModel('url', downloadUrl)
    },
    onFilename (filename) {
      // use the same protocol in other steps: update model prop
      this.updateModel('image_file_name', filename)
    }
  },
  mounted () {
    if (this.isOnlineProduct) {
      this.$emit('nextStep')
    }
  }
}
</script>

<style>

</style>
