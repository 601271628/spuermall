<!--  -->
<template>
  <div class="check-button" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{           //商品的选中/不选中  加入购物车默认选中，则可以再商品加一个checked属性（默认=true）
      type:Boolean,
      default:true
    }
  }
}
</script>

<style  scoped>
  .check-button{
    /* background-color: red; */
    height: 15px;
    width: 15px;
    border-radius: 15px;
    border: 1px solid rgb(230, 227, 227);
  }
  .check-button img{
    width: 15px;
  }
  .active{
    background-color: red;
  }
</style>
