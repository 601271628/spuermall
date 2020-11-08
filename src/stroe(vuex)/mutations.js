export default {
  // addCart(state,payload){
  //   let oldProduct=state.cartList.find((item) => item.iid == payload.iid)
  //   if(oldProduct){ //如果之前存在该商品
  //     oldProduct.count++;  //该商品对象中count++
  //   }else{
  //     payload.count=1; //如果不存在 count=1且把商品对象放进数组
  //     state.cartList.push(payload);
  //   }
  // }       不用actions前
  addCounter(state,payload){
    payload.count++;
  },
  addToCart(state,payload){
    payload.checked=true;   //购物车默认选中
    state.cartList.push(payload)
  },

  checkClick(state,payload){
    console.log('123');
    payload.checked=!payload.checked
  }
}
