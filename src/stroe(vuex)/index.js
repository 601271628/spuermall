import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2。创建对象
const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      console.log(payload.iid);
      //payload新添加的商品 如果添加的商品一样( 根据iid判断) 那么只添加商品的数量
      //1.查找之前数组是否存在该商品
        /*数组实例的find()方法，用于找出第一个符合条件的数组成员。
          它的参数是一个回调函数，所有数组成员依次执行该回调函数，
          直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。 */
      let oldProduct=state.cartList.find((item) => item.iid == payload.iid)
      console.log('oldprdo',oldProduct);
      if(oldProduct){ //如果之前存在该商品
        oldProduct.count++;  //该商品对象中count++
      }else{
        payload.count=1; //如果不存在 count=1且把商品对象放进数组
        state.cartList.push(payload);
      }
    }
  },
  actions:{

  },
  getters:{

  }
})

//3.挂载到mainjs
export default store
