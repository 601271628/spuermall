<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scrollref" :probe-type="3" @scroll="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shops"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info> <!--图刷新-->
        <detail-param-info :paramInfo="paramInfo" ref="paramref"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="commentref"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommendref"></goods-list>
      </scroll>
      <back-top v-show="isShow" @click.native="backtopclick"></back-top> <!--原生组件绑定事件加.native-->
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
      <toast></toast>   <!--测试-->
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
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'   //导入方法、类

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/content/toast/Toast'

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
    BackTop,
    DetailBottomBar,
    Toast
  },
  mixins:[itemListenrMixin], //把混入的内容方放进来
  data(){
    return {
      iid:null,
      topImages:[], //轮播图
      goods:{},    //衣服的标题 描述。。。。
      shops:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // detailItemlisten:null
      itemImgListener:null,
      isShow:false,
      themeTopYs:[0],   //数组存放要滚动到 对应的位置[0顶部,参数offsettop,评论offsettop,推荐offsettop]
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
      this.$refs.scrollref.refresh()//不用防抖了 应为goodsinfo emit只会传一次出来
      //图片加载完就可以计算offset高度了
      this.themeTopYs.push(this.$refs.paramref.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commentref.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommendref.$el.offsetTop)
      // console.log(this.themeTopYs);
    },
    backtopclick(){
      this.$refs.scrollref.scrollTo(0,0,500);
    },
    scroll(position){
      //1.backtop 的显示与否
      this.isShow = (position.y < -285)

      //2.滚动到指定位置 nav样式改变（如，推荐/参数 字体变红)
      //0-9262-10004-10199(-number max value)
      for(let index in this.themeTopYs){
        index=parseInt(index); //不转换的话 index是字符串
        if( -position.y >= this.themeTopYs[3] ){
          this.$refs.nav.currentIndex=3;
        }                           // 0-9262/ 9262-10004/ 10004-10199
        else if(-position.y >= this.themeTopYs[index] &&  -position.y < this.themeTopYs[index+1]){
          this.$refs.nav.currentIndex=index;
        }
      }
    },
    titleClick(index){
      // 点击滚动到对应位置 index从DetailNavBar发出来的 （themeTopYs是用来存放对应位置的数组）
      this.$refs.scrollref.scrollTo(0,-this.themeTopYs[index],300)
    },
    addToCart(){
      //1. 点击后获取对应商品的 图片+title+描述desc+价格newprice
      const product={};
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      //2. 商品添加到购物车
      //2.1 this.$store.state.cartList.push(product) 不可这样 这样的话 监听不到数据改变
      //2.2 通过mutation事件 来添加到购物车 就可以监听到数据变化
      //2.3  this.$store. commit('addCart',product); 可以 但是不可区分是添加数量/添加新商品
      this.$store.dispatch('addCart',product).then((res)=>{
        // this.message=res,
        // this.isShowtotas=true,
        // //2秒后 让toast不显示
        // setTimeout(()=>{
        //   this.isShowtotas=false
        // },2000)
        this.$toast.show(res,2000);
      });

      //3.再购物车页面展示商品
    }
  },
  mounted(){    //mixin混入
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
    height: calc(100% - 102px); /**-44-58=-102 */
  }
</style>
