<template>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            v-show='false'
            v-on:click="toggleAdvanced"
          >
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
          <v-btn
            color="red"
            v-on:click="goBack"
            v-show='backAvailable'
          >
            Back
          </v-btn>
          <v-spacer/>
          <v-btn
            color="green"
            v-on:click="continueForward"
            v-bind:disabled="continueDisabled"
            v-show='fowardAvailable'
          >
            Continue
          </v-btn>
        </v-card-actions>
</template>

<script>
export default {
  props: ['currentSection', 'continueDisabled', 'transaction'],
  data: () => ({

  }),
  methods: {
    continueForward () {
      this.$emit('change', 'continue')
    },
    goBack () {
      this.$emit('change', 'back')
    },
    toggleAdvanced () {
      this.$emit('changeAdvancedOptions')
    }
  },
  computed: {
    backAvailable () {
      if (this.currentSection === 0) {
        return false
      }
      return true
    },
    fowardAvailable () {
      if (this.currentSection === 3) {
        return false
      }
      return true
    }
  }
}
</script>
