<!--  -->
<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div><!--购物车加入的不同的商品数-->
    </nav-bar>

    <scroll class="cart-content" ref="scrollref">
      <cart-list></cart-list>
    </scroll>

    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
  name:'cart',
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed:{
    //获取购物车数目
    //方法1 cartLength(){return this.$store.state.cartList.length}

    //方法2 cartLength(){return this.$store.getters.cartLength} 通过getter计算属性

    //方法3 通过mapGetters辅助函数（把store的getters计算属性中的内容解析到这里的computed中
    //用法1-数组形式 ...mapGetters(['cartLength','cartList'])
    //用法2-对象形式
    ...mapGetters({
      cartLength:'cartLength',  //数组长度
      cartList:'cartList'   //数组
    })
  },
  activated(){
    this.$refs.scrollref.refresh()
  }
}
</script>

<style  scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: bold;
    font-size: 20px;
  }
  .cart{
    height: 100vh;
  }
  .cart-content{
    height: calc(100% - 133px);   /**-44上-49下-40下的上 */
    overflow: hidden;
  }
</style>
