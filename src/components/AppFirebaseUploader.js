// MyUploader.js
import { QUploaderBase } from 'quasar'
import { first, last, isFunction, isEmpty } from 'lodash'
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
    },
    hasInternalFIle () {
      return !isEmpty(this.internalFile)
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
    upload () {
      // If necessary upload image, will be here to update
      if (this.canUpload) {
        // ...
      }

      if (!this.hasInternalFIle) {
        return Promise.resolve(null)
      }

      return new Promise((resolve, reject) => {
        this.internalFileRef = this.internalFile.ref.put(this.internalFile.file)

        this.isUploadingFilesToFirebase = true

        this.$emit('filename', this.internalFile.filename)

        this.internalFileRef.on('state_changed', snapshot => {
          this.uploadedSize = snapshot.bytesTransferred
        }, err => {
          this.$q.notify({
            message: 'Não foi possível subir a imagem para o nosso serviço',
            color: 'negative'
          })
          this.isUploadingFilesToFirebase = false

          reject(err)
        }, () => {
          this.internalFileRef.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$emit('downloadURL', downloadURL)
            resolve(downloadURL)
          })

          this.isUploadingFilesToFirebase = false
        })
      })
    }
  }
}
