<!--  -->
<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div><!--购物车加入的不同的商品数-->
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'cart',
  components:{
    NavBar
  },
  computed:{
    cartLength(){
      return this.$store.getters.cartLength
    }
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
</style>
