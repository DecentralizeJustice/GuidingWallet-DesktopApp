<template>
  <v-card style='overflow-x: hidden;'>

    <v-container fluid style='height:100vh;' fill-height>

        <v-row
          no-gutters
          justify='center'
          align='center'
        >
          <v-col cols='12'>
           <videoPlayer
           v-bind:courseInfo="courseInfo"
           @paused="vidPaused"
           v-bind:time='time'
           v-bind:fullscreen='true'
           />
           </v-col>
           <v-col cols='12' class="text-center mt-2">
             <v-btn color='red' @click="toggle">
               Exit
             </v-btn>
           </v-col>
        </v-row>

      </v-container>
  </v-card>
</template>

<script>
import videoPlayer from '@/components/general/localAudio.vue'
export default {
  components: {
    videoPlayer
  },
  props: {
    courseInfo: {},
    time: {}

  },
  data () {
    return {
    }
  },
  methods: {
    vidPaused (info) {
      this.$emit('paused', info)
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  watch: {
  },
  computed: {
  },
  async mounted () {
  },
  async beforeDestroy () {
  }
}
</script>
