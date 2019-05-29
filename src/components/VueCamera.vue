<template>
  <div class='camera' ref="wrapper">

    <div id="camera-select">
      <QSelect
        v-if="devices.length && !isAlreadyRecorded"
        v-model="selected"
        :options="devices"
        @change="cameraChanged"
      />
    </div>

    <div class="camera-wrapper">
      <video
        ref="camera"
        v-show="!blob || (capture === 'video' && isAlreadyRecorded) || (capture !== 'photo' && !isAlreadyRecorded)"
        id='preview'
        width="100%"
        height="auto"
        autoPlay
      />
      <img id="photo" ref="photo" v-if="capture === 'photo'" v-show="blob" alt="photo" width="100%" height="auto">
    </div>

    <div class="buttons-wrapper">
      <div :class="onReadyButtonsClass">
        <QBtn
          v-if="!isAlreadyRecorded"
          class="record-button"
          icon="fas fa-camera"
          color="negative"
          round
          size="lg"
          @click="action"
        />
        <div
          class="q-pa-xs q-gutter-sm"
          v-if="isAlreadyRecorded"
        >
          <QBtn
            class="reset-button capture-photo"
            icon="fas fa-redo-alt"
            color="negative"
            size="lg"
            round
            @click="resetStream"
          />

          <QBtn
            class="upload-button capture-photo"
            icon="fas fa-check"
            color="positive"
            size="lg"
            round
            @click="onReady"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSelect } from 'quasar'

export default {
  name: 'camera-component',
  components: { QSelect },
  props: {
    capture: {
      type: String,
      default: 'video'
    }
  },
  computed: {
    onReadyButtonsClass () {
      let classes = 'on-ready-buttons'
      if (this.capture === 'video') {
        if (this.smallPreview) {
          classes += ' smallPreview'
        }
      } else {
        classes += ' capture-photo'
      }
      return classes
    }
  },

  methods: {
    action () {
      const actions = {
        photo: this.takePhoto,
        video: this.startRecording
      }
      const action = actions[this.capture]
      action()
    },

    takePhoto () {
      this.$emit('onPhoto')
      const photo = this.$refs.photo
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        const mediaStreamTrack = stream.getVideoTracks()[0]
        const imageCapture = new ImageCapture(mediaStreamTrack)
        imageCapture.takePhoto()
          .then(blob => {
            this.blob = blob
            this.isAlreadyRecorded = true
            photo.src = URL.createObjectURL(blob)
            photo.onload = () => { URL.revokeObjectURL(this.src) }
          })
      })
    },

    resetStream () {
      this.$emit('onReset')
      this.blob = null
      let preview = document.getElementById('preview')
      if (this.capture === 'photo') {
        this.isAlreadyRecorded = false
        return
      }
      navigator.mediaDevices
        .getUserMedia(this.constraints).then(stream => {
          preview.setAttribute('autoplay', true)
          preview.removeAttribute('controls')
          preview.srcObject = stream
          preview.captureStream = preview.captureStream || preview.mozCaptureStream
          this.isAlreadyRecorded = false
        })
    },

    onReady () {
      this.$emit('onReady', this.blob)
    },

    cameraChanged () {
      this.$emit('onCameraChanged')
      const preview = document.getElementById('preview')
      const videoConstraints = {}
      videoConstraints.deviceId = { exact: this.selected.deviceId }
      this.constraints = {
        video: videoConstraints,
        audio: false
      }
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(stream => { preview.srcObject = stream })
        .catch(err => console.error(err))
    },

    handleWindowResize () {
      this.smallPreview = this.$refs.wrapper.offsetWidth < 740
    }
  },

  mounted () {
    const camera = this.$refs.camera
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.constraints = { video: true }
    const gotDevices = (mediaDevices) => {
      this.devices = JSON.parse(JSON.stringify(mediaDevices)).filter(d => d.kind === 'videoinput')
      this.selected = this.devices[0]
      let videoConstraints = {}
      videoConstraints.deviceId = { exact: this.selected.deviceId }
      this.constraints = {
        video: videoConstraints,
        audio: false
      }
    }
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then(stream => {
        camera.srcObject = stream
        return navigator.mediaDevices.enumerateDevices()
      })
      .then(gotDevices)
      .catch(error => {
        console.error(error)
      })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  data () {
    return {
      smallPreview: false,
      select: false,
      blob: null,
      devices: [],
      constraints: {},
      selected: null,
      isAlreadyRecorded: false
    }
  }
}
</script>

<style lang='stylus'>
.camera {
  &:hover {
    .on-ready-buttons {
      opacity: 1;
    }
  }
}

.camera-wrapper {
  position: relative;
  width: 100%;

  #preview {
    position: relative;
    border-radius: 5px;
  }

  #photo {
    position: relative;
    border-radius: 5px;
  }

}
.buttons-wrapper {
  width: 100%;

  .on-ready-buttons {
    position: relative;
    width: 60%;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0;
    transition: all 1s;
    top: calc(50% - 2rem - 20px);

    &.smallPreview {
      top: calc(50% - 2rem - 8px);
    }

    &.capture-photo {
      text-align center;
      opacity: 1;
    }
  }
}
</style>
