<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'   //导入方法、类

import Scroll from 'components/common/scroll/Scroll'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      detailInfo:{}
    }
  },
  created(){
    /*问题：发现点击后我们的信息没有变 如点击图1 iid=m1323 点击图2还是m1323
        （因为App.vue keep-alive了，creat执行一次 组件不会不听呗创建销毁 所以不要让他keep-alive 使用exclude）*/

    //1.保存点击对应goodlistitems后路劲修稿的(/detail/:iid)的iid
    this.iid=this.$route.params.iid

    //根据iid请求数据
    getDetail(this.iid).then((res)=>{
      const data=res.result;
      console.log(res);
      this.topImages=data.itemInfo.topImages;          //轮播图

      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services) //商品描述
      this.shops=new Shop(data.shopInfo)   //商家信息
      this.detailInfo=data.detailInfo  //尺寸...
    })
  }
}
</script>

<style  scoped>
  #detail{
    position: relative;
    z-index: 10;   /*把下面的tabbar 盖掉还得加背景颜色*/
    background-color: #fff;
    height: 100vh;  /*配合calc的100% */
  }
  .detail-nav{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
