import Vue from 'vue'
import Router from 'vue-router'
// import Intro from './views/membershipConfig.vue'
// import Home from './views/home.vue'
import Education from './views/edu.vue'
import btcMusig from './views/btcMusig.vue'
import dev from './views/dev.vue'
// import Support from './views/support.vue'
// import Settings from './views/settings.vue'
// import Setup from './views/setup.vue'
// import store from './store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/edu' },
    {
      path: '/edu',
      name: 'edu',
      component: Education
    },
    {
      path: '/btcMusig',
      name: 'btcMusig',
      component: btcMusig
    },
    {
      path: '/dev',
      name: 'dev',
      component: dev
    }
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    //   beforeEnter: function (to, from, next) {
    //     const mainReady = store.state.stageInfo.main
    //     if (!mainReady) {
    //       router.push({ path: '/setup' })
    //     } else {
    //       next()
    //     }
    //   }
    // },
    // {
    //   path: '/setup',
    //   name: 'setup',
    //   component: Setup
    // },
    // {
    //   path: '/balance',
    //   name: 'balance',
    //   component: Balance
    // },
    // {
    //   path: '/intro',
    //   name: 'intro',
    //   component: Intro
    // },
    // {
    //   path: '/support',
    //   name: 'support',
    //   component: Support
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: Settings
    // }
  ]
})
export default router
