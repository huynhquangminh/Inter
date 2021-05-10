import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
const vuetifyOptions = { }
Vue.use(Vuetify)
new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  // vuetify,
  render: h => h(App)
}).$mount('#app')
