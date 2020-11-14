//封装插件toast 使用时安装它Vue.use（toast） 直接this.$toast......

//1.这个文件导出obj
//2. 在mainjs中安装Vue.use（toast） 让他一开始就预备好
//3. vue.use执行时  就会执行install方法（导出的obj：执行obj.install）
//4. 按照下面的流程
import Toast from './Toast'

const obj={}

obj.install=function(Vue){  //install默认参数Vue
  // console.log('main执行vue.use时 来这里执行obj.install');

  //目的1.把Toast的template模板显示出来
  //1.创建组件构造器
  const toastContrustor=Vue.extend(Toast)

  //2.new方式，根据组件构造器，创建出一个组件对象
  const toast = new toastContrustor()

  //3.将组件地对象，手动挂载到某一个元素上 （eg：Vue挂载到app上）
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast;
}

export default obj
