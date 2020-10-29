<!--  -->
<template>
  <tabbar>
        <tabbaritem path="/home" activecolor='blue'>
            <img slot="item-icon" src="assets/img/tabbar/home.png">
            <img slot="item-icon-o" src="assets/img/tabbar/home-o.png">
            <div slot="item-text">首页</div>
        </tabbaritem>
        <tabbaritem path="/category"  activecolor='blue'>
           <img slot="item-icon" src="assets/img/tabbar/category.png">
           <img slot="item-icon-o" src="assets/img/tabbar/category-o.png">
           <div slot="item-text">分类</div>
        </tabbaritem>
        <tabbaritem  path="/cart"  activecolor='blue'>
            <img slot="item-icon" src="assets/img/tabbar/cart.png">
            <img slot="item-icon-o" src="assets/img/tabbar/cart-o.png">
            <div slot="item-text">购物车</div>
        </tabbaritem>
        <tabbaritem  path="/profile">
           <img slot="item-icon" src="assets/img/tabbar/my.png">
           <img slot="item-icon-o" src="assets/img/tabbar/my-o.png">
           <div slot="item-text">我的</div>
        </tabbaritem>
      </tabbar>
</template>

<script>
import tabbar from 'components/common/tabbar/tabbar.vue'
import tabbaritem from 'components/common/tabbar/tabbaritem.vue'

export default {
  name:'maintabbar',
  components:{
    tabbar,
    tabbaritem
  }
}
</script>

<style  scoped>

</style>
