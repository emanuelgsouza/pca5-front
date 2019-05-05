// MyUploader.js
import { QUploaderBase } from 'quasar'
import { first, last, isFunction } from 'lodash'
import uuid from 'uuid'
import storage from 'src/services/firebase/storage'

const getFileExtension = imageType => last(imageType.split('/'))

export default {
  name: 'FirebaseUploader',
  mixins: [ QUploaderBase ],
  data: () => ({
    internalFileRef: null,
    isUploadingFilesToFirebase: false
  }),
  computed: {
    // [REQUIRED]
    // we're working on uploading files
    isUploading () {
      return this.isUploadingFilesToFirebase
    },

    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    isBusy () {
      // return <Boolean>
    },
    // Use this.files like reference
    internalFiles () {
      return this.files.map(file => {
        const fileExtension = getFileExtension(file.type)
        const filename = `${uuid.v4()}.${fileExtension}`
        return {
          file,
          filename: filename,
          ref: storage.ref().child(filename),
          metadata: {
            contentType: file.type
          }
        }
      })
    },
    internalFile () {
      return first(this.internalFiles)
    }
  },
  methods: {
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    abort () {
      if (this.internalFileRef && isFunction(this.internalFileRef.cancel)) {
        this.internalFileRef.cancel()
      }
    },
    // [REQUIRED]
    async upload () {
      this.internalFileRef = this.internalFile.ref.put(this.internalFile.file)

      this.isUploadingFilesToFirebase = true

      this.internalFileRef.on('state_changed', snapshot => {
        this.uploadedSize = snapshot.bytesTransferred
      }, err => {
        this.$q.notify({
          message: 'Não foi possível subir a imagem para o nosso serviço',
          color: 'negative'
        })
        this.isUploadingFilesToFirebase = false
        console.error(err)
      }, () => {
        this.internalFileRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          this.$emit('downloadURL', downloadURL)
        })

        this.isUploadingFilesToFirebase = false
      })
    }
  }
}
