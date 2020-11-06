<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content" ref="scrollref" :probe-type="3" @scroll="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends"></goods-list>
      </scroll>
      <back-top v-show="isShow" @click.native="backtopclick"></back-top> <!--原生组件绑定事件加.native-->
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'   //导入方法、类

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {debounce} from 'common/utils' //防抖

import {itemListenrMixin} from 'common/mixin'  //混入的内容   mixins:[itemListenrMixin]

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop
  },
  mixins:[itemListenrMixin], //把混入的内容方放进来
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // detailItemlisten:null
      itemImgListener:null,
      isShow:false
    }
  },
  created(){
    /*问题：发现点击后我们的信息没有变 如点击图1 iid=m1323 点击图2还是m1323
        （因为App.vue keep-alive了，creat执行一次 组件不会不听呗创建销毁 所以不要让他keep-alive 使用exclude）*/

    //1.保存点击对应goodlistitems后路劲修稿的(/detail/:iid)的iid
    this.iid=this.$route.params.iid

    //2.根据iid请求上商品的数据
    getDetail(this.iid).then((res)=>{
      const data=res.result;
      console.log(res);
      this.topImages=data.itemInfo.topImages;          //轮播图

      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services) //商品描述(baseinfo)
      this.shops=new Shop(data.shopInfo)   //商家信息(shopinfo)
      this.detailInfo=data.detailInfo  //店家下面...(goodsinfo)
      // this.$refs.scrollref.refresh();
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)  //参数信息
      if(data.rate.cRate != 0)  this.commentInfo=data.rate.list[0] /****************** */
    })

    //3.获取推荐数据
    getRecommend().then((res)=>{
      // console.log(res);
      this.recommends=res.data.list
    })
  },
  methods:{
    imageLoad(){   //店家消息下面的 图片需要刷新一下 重新计算高度
      this.$refs.scrollref.refresh()
    },
    backtopclick(){
      this.$refs.scrollref.scrollTo(0,0,500);
    },
    scroll(position){
      this.isShow = (position.y < -285)
    }
  },
  mounted(){
    // const refresh=debounce(this.$refs.scrollref.refresh,500)
    // this.detailItemlisten=()=>{   //推荐的图片需要刷新一下 重新计算高度
    //   refresh()
    // }
    // this.$bus.$on('itemiamgeload',this.detailItemlisten)
    /*********************************************************使用mixin混入 */
  },
  destroyed(){   //离开时，取消全局监听，防止刷新图片时home也刷新
    this.$bus.$off('itemiamgeload',this.itemImgListener)
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
