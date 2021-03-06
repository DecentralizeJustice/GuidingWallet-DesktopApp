import 'regenerator-runtime/runtime'
import '@mdi/font/css/materialdesignicons.css'
// import 'typeface-roboto/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import vuetify from './plugins/vuetify'
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
Vue.component('mainWalletComp', mainWalletComp)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
