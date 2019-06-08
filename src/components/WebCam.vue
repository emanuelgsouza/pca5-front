<script>
import { WebCam } from 'vue-web-cam'

export default {
  extends: WebCam,
  methods: {
    setupMedia () {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.legacyGetUserMediaSupport()
      }

      this.loadCameras()
    },
    loadCamera (device) {
      console.log(device)
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: device } }
        })
        .then(stream => this.loadSrcStream(stream))
        .catch(error => this.$emit('error', error))
    },
    // to solve problem with back camera
    testMediaAccess () {
      console.log('aaaaaaaaaaa')
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(stream => {
          console.log(stream)
          let tracks = stream.getTracks()
          tracks.forEach(track => {
            // stops the video track
            track.stop()
          })
          this.loadCameras()
        })
        .catch(error => this.$emit('error', error))
    }
  }
}
</script>
