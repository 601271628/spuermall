<!--多个组件要使用且以后也用，不写这个文件，每个组件都去导入BScroll一次，对BScroll依赖太强 -->
<template>
  <div class="wrapper" ref="wrapper">  <!--day02/父访问子.html-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{     //挂载.wrapper（'.wrapper'  || 通过ref）
      // probeType:3,  //监听位置 01不监听 2不监听惯性 3监听惯性
      // pullUpLoad:true  //监听上拉到底
      click:true
    })
    //刚开始请求的数据不完全，eg数据只是请求了一半 BScroll计算高度不对，所以需要监听图片的加载*************
    this.scroll.refresh();
    this.scroll.hasVerticalScroll=true
    // this.scroll.on('scroll',(position)=>{
    //   // console.log(position);
    // })
    // this.scroll.on('pullingUp',()=>{
    //   console.log('上拉加载更多');
    //   setTimeout(() => {
    //     this.scroll.finishPullUp()
    //   }, 2000);
    // })
  }
}
</script>

<style  scoped>

</style>
