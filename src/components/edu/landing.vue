<template>
  <v-card>
    <v-card-title class="headline justify-center">{{actualLessons.updatedLessons.title}}</v-card-title>
    <v-divider/>
    <v-row no-gutters>
       <v-col :key="item.title" v-for="(item, index) in actualLessons.updatedLessons.lessons" cols='4'>
         <v-card
           class="ma-3" :color="cardColor(item.unlocked)"
         >
         <v-card-title class="headline justify-center text-center" style="word-break: normal;">
           {{item.title}}
         </v-card-title>

         <v-row no-gutters justify-content='center' >
          <v-col cols='2' offset='5' class="justify-center text-center">
            <v-icon x-large :color="iconColor(item.unlocked)" class="" style="">
              mdi-{{item.icon}}
            </v-icon>
          </v-col>
        </v-row>
         <v-card-actions class="justify-center">
           <v-btn
             :color="iconColor(true)"
             :disabled='!item.unlocked'
             @click="startLesson(index)"
           >
             {{buttonText(item.first)}}
           </v-btn>
         </v-card-actions>
         </v-card>
       </v-col>
    </v-row>
    <v-divider/>
    <v-card-actions>
      <!-- <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn> -->
      <v-btn
        color="red darken-1"
        @click="exit()"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
const os = require('os')
const platform = os.platform()
const R = require('ramda')
export default {
  props: ['landingInfo'],
  data: () => ({
  }),
  components: {
  },
  computed: {
    actualLessons: function () {
      const correctLessonIndexArray = []
      const updatedLessons = R.clone(this.landingInfo)
      updatedLessons.lessons = []
      for (var i = 0; i < this.landingInfo.lessons.length; i++) {
        if (this.landingInfo.lessons[i].comp.os) {
          if (this.landingInfo.lessons[i].comp.os === 'mac' && platform === 'darwin') {
            updatedLessons.lessons.push(this.landingInfo.lessons[i])
            correctLessonIndexArray.push(i)
          }
          if (this.landingInfo.lessons[i].comp.os === 'windows' && platform === 'win32') {
            updatedLessons.lessons.push(this.landingInfo.lessons[i])
            correctLessonIndexArray.push(i)
          }
        } else {
          updatedLessons.lessons.push(this.landingInfo.lessons[i])
          correctLessonIndexArray.push(i)
        }
      }
      return { updatedLessons, correctLessonIndexArray }
    }
  },
  mounted () {
    if (typeof this.setLesson !== 'undefined') {
      // this.changeLesson(this.setLesson)
    }
  },
  methods: {
    cardColor (state) {
      if (state) {
        return 'blue'
      }
      return 'grey darken-3'
    },
    iconColor (state) {
      if (state) {
        return 'indigo darken-4'
      }
      return 'white'
    },
    buttonText (first) {
      if (first) {
        return 'Start Here'
      }
      return 'Take Lesson'
    },
    exit () {
      this.$emit('exit')
    },
    startLesson (index) {
      this.$emit('changeLesson', this.actualLessons.correctLessonIndexArray[index])
    }
  }
}
</script>
