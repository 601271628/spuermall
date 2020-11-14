import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './stroe(vuex)'

import toast from 'components/content/toast/index'

import Fastclick from 'fastclick'

Vue.config.productionTip = false

//使用bus要添加事件总线
Vue.prototype.$bus=new Vue()

//安装totas插件
Vue.use(toast)

//解决移动端延迟300ms
Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')  //和el:"#app"一样的
