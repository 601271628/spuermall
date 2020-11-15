import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './stroe(vuex)'

import toast from 'components/content/toast/index' //toast弹窗

import Fastclick from 'fastclick' //移动延迟300ms

import Vuelazy from 'vue-lazyload' //图片懒加载 使用（在img标签中 把src换成v-lazy）

Vue.config.productionTip = false

//使用bus要添加事件总线
Vue.prototype.$bus=new Vue()

//安装totas插件
Vue.use(toast)

//安装懒加载插件
Vue.use(Vuelazy)
//安装懒加载插件 并提供懒加载背景
// Vue.use(Vuelazy,{
//   loading:require('图片地址')
// })

//解决移动端延迟300ms
// Fastclick.attach(document.body)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')  //和el:"#app"一样的
