<!--  -->
<template>
    <div class="tabbar-item" @click="itemclick()">
      <div v-if="!isShow"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-o"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name:'tabbaritem',
  //父组件传进来点击的是哪个路径
  props:{
    path:String,
    activecolor:{
      type:String,
      default:'red'     //没传进颜色 默认red
    }
  },
  computed:{
    isShow(){
      return (this.$route.path == this.path)/************************************ */
    },
    activeStyle(){
      return this.isShow?{color:this.activecolor} : {}
    }
  },
  methods:{
    itemclick(){
      this.$router.replace(this.path).catch(err=>{err})
      // document.title=this.$route.meta.title  在indexjs中改 路径变就改
    }
  }
}
</script>

<style  scoped>
  .tabbar-item{
    flex: 1;   /*均等分*/
    text-align: center;
    height: 49px;  /*tabbar一般49 */
  }
  .tabbar-item img{
    height: 25px;
  }
  /* .active{
    color:rgb(243, 146, 162)
    /* color: ; */
  /* } */
</style>
