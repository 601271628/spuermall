<!--  -->
<template>
  <div class="cart-bottom-bar">
    <check-button class="bottom-check totop" :is-checked="isSelectAll" @click.native="selectAll"/>
    <span class="totop">全选</span>

    <span class="bottom-center totop">合计:￥{{totalPrice}}</span>

    <div class="bottom-right" @click="calcClick">去计算({{isCheckedLength}})</div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
// import {mapGetters} from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    //算勾选的长度
    // ...mapGetters(['cartLength']),
    isCheckedLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },

    //算价钱
    totalPrice(){
      const cartList =this.$store.state.cartList
      let totalprice=0;
      for(let item of cartList){
        if(item.checked == true){ //如果是被选中的就 计算总价格
          totalprice += item.price * item.count;
        }
      }
      return totalprice.toFixed(2); //.toFixed(2)
    }

    ,isSelectAll(){
      if(this.$store.state.cartList.length == 0) return false //没物品时 全选按钮不选中
      return !this.$store.state.cartList.find(item => !item.checked)  //找到不选中的话，让全选不选中// 否则选中
    }
  },
  methods:{
    selectAll(){
      //1.点击全选（改变 商品 选中状态）
      this.$store.commit('selectAll')

      //2.点击全选（改变 全选按钮 选中状态） 111111111
      // let count=0;
      // if(this.$store.state.cartList.length != 0){
      //   for(let item of this.$store.state.cartList){
      //     if(item.checked == false)
      //       count++;
      //   }
      // }
      // this.Allchecked=!Boolean(count)
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  // mounted(){         22222222222222（联合cartitemlist中emit事件）
  //   //3.商品点击发送的事件（改变 全选按钮 选中状态）
  //   this.$bus.$on('checkClick',(pdchecked)=>{
  //     // console.log('1111'+pdchecked);
  //     this.Allchecked=pdchecked
  //   })
  // }
}
</script>

<style  scoped>
  .cart-bottom-bar{
    height: 40px;
    background-color: rgb(250, 245, 245);
    padding-left: 8px;
  }
  .totop{
    margin-top: 10px;
  }
  .bottom-check{
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: 3px;
  }
  .bottom-center{
    margin-left: 20px;
  }
  .bottom-right{
    float: right;
    height: 38px;  /**40-2阴影 */
    width: 90px;
    background-color: red;
    line-height: 40px;
    text-align: center;

    color:#fff;
  }
</style>
