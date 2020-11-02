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
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{     //挂载.wrapper（'.wrapper'  || 通过ref）
      probeType:this.probeType,  //监听位置 01不监听 2不监听惯性 3监听惯性
      pullUpLoad:this.pullUpLoad,  //监听上拉到底
      click:true
    })
    //刚开始请求的数据不完全，eg数据只是请求了一半 BScroll计算高度不对，所以需要监听图片的加载*************
    this.scroll.refresh();
    this.scroll.hasVerticalScroll=true
                                                //监听位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',()=>{          //监听加载
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })

    // this.scroll.scrollTo(x,y,时间)*************scrollTo方法返回顶部
  },
  methods:{
    scrollTo(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp() //scroll对象自带的方法  告诉请求数据 完成了 可以进行下一次请求了
    },
    refresh(){
      // console.log('scorll----');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y:0
    }
  }
}
</script>

<style  scoped>

</style>
