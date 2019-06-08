<template>
  <div class="vue-camera">
    <div class="camera-select">
      <QSelect
        label="Selecione uma câmera"
        :options="devices"
        v-model="deviceId"
        map-options
        emit-value
        stack-label
      />
    </div>

    <div class="camera-wrapper">
      <WebCam
        v-if="!hasImg"
        ref="webcam"
        :device-id="deviceId"
        width="100%"
        :height="360"
        @started="onStarted"
        @stopped="onStopped"
        @error="onError"
        @cameras="onCameras"
        @camera-change="onCameraChange"
      />

      <div class="buttons row justify-center">
        <QBtn
          v-if="!hasImg"
          class="record-button"
          icon="fas fa-camera"
          color="negative"
          round
          size="lg"
          @click="onCapture"
        />
      </div>
    </div>

    <div class="camera-preview">
      <figure v-if="hasImg">
        <img :src="img">
      </figure>

      <div class="buttons row justify-center">
        <div v-if="hasImg" class="q-pa-xs q-gutter-sm">
          <QBtn
            class="reset-button capture-photo"
            icon="fas fa-redo-alt"
            color="negative"
            size="lg"
            round
            @click="onStart"
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
import WebCam from './WebCam'
import { QSelect } from 'quasar'
import { isEmpty } from 'lodash'

export default {
  name: 'AppCamera',
  components: {
    QSelect,
    WebCam
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    }
  },
  computed: {
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId)
    },
    hasImg () {
      return !isEmpty(this.img)
    }
  },
  watch: {
    camera (id) {
      this.deviceId = id
    },
    devices () {
      // Once we have a list select the first one
      const [first] = this.devices
      if (first) {
        this.camera = first.value
        this.deviceId = first.value
      }
    }
  },
  methods: {
    onCapture () {
      this.img = this.$refs.webcam.capture()
    },
    onStarted (stream) {
      console.log('On Started Event', stream)
    },
    onStopped (stream) {
      console.log('On Stopped Event', stream)
    },
    onStop () {
      this.$refs.webcam.stop()
    },
    onStart () {
      this.img = null
      this.$nextTick(() => {
        this.$refs.webcam.start()
      })
    },
    onError (error) {
      console.error('On Error Event', error.message)
    },
    onCameras (cameras) {
      const cameraProcessed = cameras.map(camera => {
        return {
          label: camera.label,
          value: camera.deviceId
        }
      })
      this.devices = [ ...cameraProcessed ]
      console.log('On Cameras Event', cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    },
    onReady () {
      this.$emit('ready', this.img)
    }
  }
}
</script>
