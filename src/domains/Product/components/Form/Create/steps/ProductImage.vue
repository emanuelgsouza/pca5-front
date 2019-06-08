<template>
  <div class="product-image">
    <h6 class="no-margin"> Suba aqui uma imagem para podermos identificar o produto </h6>

    <!-- <AppFirebaseUploader
      class="q-mt-xs"
      accept=".jpg, image/*"
      ref="firebaseUploader"
      @filename="onFilename"
      @downloadURL="onDownloadURL"
    /> -->

    <VueCamera
      @ready="onReady"
    />
  </div>
</template>

<script>
import { isEmpty, isNil } from 'lodash'
import StepsMixin from '../mixins/steps'
// import AppFirebaseUploader from 'src/components/AppFirebaseUploader'
import VueCamera from 'components/VueCamera'
import uuid from 'uuid'
import storage from 'src/services/firebase/storage'
import uploadImage from 'src/services/firebase/storage/upload-image'
import { getFileExtension } from 'src/support/helpers'

export default {
  name: 'ProductImage',
  mixins: [ StepsMixin ],
  components: {
    // AppFirebaseUploader,
    VueCamera
  },
  props: {
    imageFilename: String
  },
  data: () => ({
    cameraImage: null,
    isUploadImage: false
  }),
  computed: {
    hasDownloadUrl () {
      return !isEmpty(this.model.url)
    },
    internalCameraImages () {
      if (this.cameraImage) {
        const fileExtension = getFileExtension(this.cameraImage.type)
        const filename = `${uuid.v4()}.${fileExtension}`
        return {
          file: this.cameraImage,
          filename: filename,
          ref: storage.ref().child(filename),
          metadata: {
            contentType: this.cameraImage.type
          }
        }
      }

      return {}
    },
    hasCameraImage () {
      return !isNil(this.cameraImage)
    }
  },
  watch: {
    downloadURL: 'emitDownloadUrl'
  },
  methods: {
    uploadCameraImage () {
      if (this.hasCameraImage) {
        return uploadImage(this.internalCameraImages)
          .then(downloadURL => {
            return Promise.resolve(downloadURL)
          })
          .catch(err => Promise.reject(err))
      }

      this.$q.dialog({
        message: 'Não há imagem disponível para upload',
        color: 'negative'
      })

      return Promise.reject(new Error('Não há imagem disponível para upload'))
    },
    upload () {
      if (this.hasDownloadUrl) {
        return Promise.resolve(this.model.url)
      }

      const filename = this.internalCameraImages.filename
      this.onFilename(filename)

      return this.uploadCameraImage()
        .then(downloadURL => {
          this.onDownloadURL(downloadURL)
          return Promise.resolve(downloadURL)
        })
    },
    onDownloadURL (downloadUrl) {
      // use the same protocol in other steps: update model prop
      this.$nextTick(() => {
        this.updateModel('url', downloadUrl)
      })
    },
    onFilename (filename) {
      // use the same protocol in other steps: update model prop
      this.$nextTick(() => {
        this.updateModel('image_file_name', filename)
      })
    },
    onReady (dataURlString) {
      this.cameraImage = dataURlString
      const model = {
        ...this.model,
        imagePath: dataURlString
      }

      this.$emit('update:model', model)

      this.$emit('next')
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
