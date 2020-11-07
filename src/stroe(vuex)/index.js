import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
//1.安装插件
Vue.use(Vuex)

//2。创建对象
const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  //mutation同步操作 修改state中变量的状态(但完成的事情单一 如方法addCart中含添加数量/添加新的商品)
  //跟踪时都是显示执行方法addCart，但是没有说明是：添加数量/添加新的商品（可以使用action来优化，如下）
  // mutations:{
  //   // addCart(state,payload){
  //   //   let oldProduct=state.cartList.find((item) => item.iid == payload.iid)
  //   //   if(oldProduct){ //如果之前存在该商品
  //   //     oldProduct.count++;  //该商品对象中count++
  //   //   }else{
  //   //     payload.count=1; //如果不存在 count=1且把商品对象放进数组
  //   //     state.cartList.push(payload);
  //   //   }
  //   // }       不用actions前
  //   addCounter(state,payload){
  //     payload.count++;
  //   },
  //   addToCart(state,payload){
  //     state.cartList.push(payload)
  //   }
  // },
  // actions:{
  //   addCart(context,payload){   //context上下文(这里 等价于store对象 )
  //     //payload新添加的商品 如果添加的商品一样( 根据iid判断) 那么只添加商品的数量
  //     //1.查找之前数组是否存在该商品
  //       /*数组实例的find()方法，用于找出第一个符合条件的数组成员。
  //         它的参数是一个回调函数，所有数组成员依次执行该回调函数，
  //         直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。 */
  //     let oldProduct=context.state.cartList.find((item) => item.iid == payload.iid)
  //     if(oldProduct){ //如果之前存在该商品
  //       context.commit('addCounter',oldProduct)
  //     }else{
  //       payload.count=1; //如果之前不存在该商品
  //       context.commit('addToCart',payload)
  //     }
  //   }
  // },
  mutations,
  actions,
  getters:{}
})

//3.挂载到mainjs
export default store
