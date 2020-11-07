import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './stroe(vuex)'

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')  //和el:"#app"一样的
