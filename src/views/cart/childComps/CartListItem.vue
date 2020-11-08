<!--  -->
<template>
  <!-- <div>{{product}}</div> -->
  <div class="cart-list-item">

    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">{{product.title}}</div>
    <div class="item-desc">{{product.desc}}</div>
    <div class="item-bottom">
      <div class="left">￥{{product.price}}</div>
      <div class="right">×{{product.count}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name:'CartListItem',
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style  scoped>
  .cart-list-item{
    height: 120px;
    overflow: hidden;
    margin-bottom: 2px;
    border-bottom: 2px solid rgb(226, 223, 223);
  }
  .item-img{
    height: 100%;
    float: left;
  }
  .item-img img{
    margin-top: 2px;
    margin-right: 5px;
    height: 96%;
  }
  .item-info{
    height: 23px;
    font-size: 21px;
    overflow: hidden;
    margin:10px 0;
    line-height: 23px;
  }
  .item-desc{
    height: 25px;
    font-size: 15px;
    overflow: hidden;
    line-height: 25px;
  }
  .item-bottom{
    height: 20px;
    margin-top: 18px;
  }
  .left{
    color: rgba(250, 154, 9, 0.952)
  }
  .right{
    margin-right: 8px;
  }
</style>
