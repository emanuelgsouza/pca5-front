// MyUploader.js
import { QUploaderBase } from 'quasar'
import uuid from 'uuid'
import storage from 'src/services/firebase/storage'

export default {
  name: 'MyUploader',
  mixins: [ QUploaderBase ],
  computed: {
    // [REQUIRED]
    // we're working on uploading files
    isUploading () {
      // return <Boolean>
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
        return {
          ref: storage.ref().child(uuid.v4()),
          metadata: {
            contentType: file.type
          }
        }
      })
    }
  },
  methods: {
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    abort () {
      // ...
    },

    // [REQUIRED]
    upload () {
      if (this.canUpload === false) {

      }

      console.log(this)

      console.log(this.internalFiles)
      // ...
    }
  }
}
