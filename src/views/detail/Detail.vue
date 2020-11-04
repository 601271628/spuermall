<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import {getDetail} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper
  },
  data(){
    return {
      iid:null,
      topImages:[]
    }
  },
  created(){
    /*问题：发现点击后我们的信息没有变 如点击图1 iid=m1323 点击图2还是m1323
        （因为App.vue keep-alive了，creat执行一次 组件不会不听呗创建销毁 所以不要让他keep-alive 使用exclude）*/

    //1.保存点击对应goodlistitems后路劲修稿的(/detail/:iid)的iid
    this.iid=this.$route.params.iid

    //根据iid请求数据
    getDetail(this.iid).then((res)=>{
      console.log(res);
      this.topImages=res.result.itemInfo.topImages;
    })
  }
}
</script>

<style  scoped>

</style>
