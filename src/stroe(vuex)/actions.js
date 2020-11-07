export default {
  addCart(context,payload){   //context上下文(这里 等价于store对象 )
    //payload新添加的商品 如果添加的商品一样( 根据iid判断) 那么只添加商品的数量
    //1.查找之前数组是否存在该商品
      /*数组实例的find()方法，用于找出第一个符合条件的数组成员。
        它的参数是一个回调函数，所有数组成员依次执行该回调函数，
        直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。 */
    let oldProduct=context.state.cartList.find((item) => item.iid == payload.iid)
    if(oldProduct){ //如果之前存在该商品
      context.commit('addCounter',oldProduct)
    }else{
      payload.count=1; //如果之前不存在该商品
      context.commit('addToCart',payload)
    }
  }
}
