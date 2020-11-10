<!--  -->
<template>

  <div class="shop-info">

    <div class="item-selector">
       <!--商品的checked属性购物车 默认选中 //checkClick点击事件来改变选中状态-->
      <check-button :is-checked="product.checked" @click.native="checkClick" />
    </div>

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

  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartListItem',
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    CheckButton
  },
  methods:{
    checkClick(){
      // this.product.checked=!this.product.checked
      this.$store.commit('checkClick',this.product)//上面的监听不到改变

      // //改变全选按钮的选中状态 3333333333333333
      // let count=0;
      // for(let item of this.$store.getters.cartList){
      //   if(item.checked == false)
      //     count++;
      // }
      // if(count==0) this.$bus.$emit('checkClick',true)
      // else this.$bus.$emit('checkClick',false)
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
    margin-left: 20px;
  }
  .item-img{
    height: 100%;
    float: left;
  }
  .item-img img{
    margin-top: 2px;
    margin-right: 5px;
    height: 96%;

    border-radius: 5px;
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
  .item-selector{
    float: left;
    position: relative;
    top:50px
    /* background-color: yellow; */
  }
</style>
