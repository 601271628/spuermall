<!--  -->
<template>
  <div id="home">
      <nav-bar class="home-nav"><span slot="center">购物街</span></nav-bar>
      <tab-control :titles="['流行','新款','精选']"
          class="tab-control1"
          @tabClick="tabClick"
          ref="tabControl1"
          v-show="isTabFixed">
        </tab-control>

      <scroll class="content" ref="scrollref"
        :probe-type="3"
        @scroll="scroll"
        :pull-up-load="true"
        @pullingUp="loadMore">   <!--父访问子-->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>

        <tab-control :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl2">
        </tab-control>

        <!-- <goods-list :goods="goods[currentType].list" /> 简化 计算属性-->
        <goods-list :goods="showGoods" />
      </scroll>

      <back-top @click.native="backClick" v-show="isShow"></back-top> <!--组件不能直接监听点击 添加.native-->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'  //导航组件
import TabControl from 'components/content/TabControl/TabControl' //首页分类
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll' //滚动
import BackTop from 'components/content/backTop/BackTop' //回到顶部

import HomeSwiper from './childComps/HomeSwiper'          //轮播图组件
import HomeRecommendView from './childComps/HomeRecommendView'//推荐组件
import FeatureView from './childComps/FeatureView'  //本周新品

import {gethomerequest,getHomeGoods} from 'network/homerequest'

import {debounce} from 'common/utils'
import {itemListenrMixin} from 'common/mixin' //混入的内容   mixins:[itemListenrMixin]

// import Swiper from 'components/common/swiper/Swiper'   <!--封装到views/home/home.vue-->
// import SwiperItem from 'components/common/swiper/SwiperItem'
// import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:'home',
  components:{
    NavBar,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenrMixin],  //把混入的内容方放进来
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        pop:{ page:0, list:[] },
        new:{ page:0, list:[] },
        sell:{ page:0, list:[] }
      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop:0,   //tabControl的offsetTop
      isTabFixed:false,
      saveY:0,
      // homeItemlisten:null
      itemImgListener:null
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /**事件监听相关的方法 */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop';
          break;
        case 1:
          this.currentType='new';
          break;
        case 2:
          this.currentType='sell';
          break;
      }
      this.$refs.tabControl2.currentIndex=index;
      this.$refs.tabControl1.currentIndex=index;
    },
    backClick(){
      // console.log('backClick');
      // this.$refs.scroll.scroll.scrollTo(0,0,500) //参数x,y,时间ms
      this.$refs.scrollref.scrollTo(0,0,500)
    },
    scroll(position){
      //1.判断backto是否显示
      // if(position.y > -285 ){this.isShow=false} else this.isShow=true   下面简写
      this.isShow = (position.y < -285)
      //2.判断是否tabControl吸顶
      this.isTabFixed=(-position.y) > this.tabOffsetTop
    },
    loadMore(){ //scroll传出pullingUp事件拉到底了后 会在这里增加goodslist的商品数
      this.getHomeGoods(this.currentType)    //发送请求 增加对应pop/new/sell 的goodslist
      this.$refs.scrollref.finishPullUp()  //告诉数据加载完成 可以进行下一次了
      // this.$refs.scrollref.scroll.refresh()  //写到了getHomeGoods异步请求服务器数据方法中了(方法1)
    },
    // debounce(func,delay){ },封装了 在common文件夹
    swiperImageLoad(){
      //获取tabControl的offsetTop
      // 所有的组件都有对应$el：用于获取组件中的元素   轮播图加载完再计算tabControl的offsetTop
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },

    /**网络请求相关的方法 */
    gethomerequest(){
        gethomerequest().then((res)=>{
          // console.log(res.data);
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
    },
    getHomeGoods(type){                           //请求商品
        const page=this.goods[type].page + 1;
        getHomeGoods(type,page).then((res)=>{
          // console.log(res.data.list);
          this.goods[type].list.push(...res.data.list); //使用push是吧数组拼接到数组后面...为es6写法，直接赋值会把数组的原来的覆盖掉，那么之前的商品信息就失去了
          this.goods[type].page+=1;
        //图片数据未加载完成 可滚高度设定完成 图片不能上拉问题 每次请求refresh结束刷新数据**************************
          // this.$refs.scrollref.scroll.refresh() (better-scroll 方法2)
        })
    }

  },
  //keep-alive配合生效 （切换时 保留原来的位置 scrollTo来实现位置不变）
  activated(){
    this.$refs.scrollref.refresh()//最好再刷新一下
    this.$refs.scrollref.scrollTo(0,this.saveY,0) /*x,y,时间*/
  },
  deactivated(){
    // this.saveY=this.$refs.scrollref.scroll.y;
    this.saveY=this.$refs.scrollref.getScrollY();

    //离开页面时取消 this.$bus全局事件的监听(防止详情页中的推荐图片刷新时 导致home页面也刷新)
    this.$bus.$off('itemiamgeload',this.itemImgListener)
  },
  //组件创建完 发送请求要数据
  created(){
    this.gethomerequest();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // let count=0;
    // //接受goodslistitem发送的bus共享事件 （goodslistitem要使用scroll对象的refresh）
    // this.$bus.$on('itemiamgeload',()=>{
    //   // better-scroll 方法3 （最丝滑，因为每张图片都refresh了）
    //   // this.$refs.scrollref.refresh()报错
    //   // if(++count % 30 == 0)
    //     this.$refs.scrollref.scroll.refresh()
    // })
        // const refresh=debounce(this.$refs.scrollref.refresh,500)
        // this.itemImgListener=()=>{  //对监听事件进行保存
        //   refresh()
        // }
        // this.$bus.$on('itemiamgeload',this.itemImgListener)
        /*********************************************************使用mixin混入 */
  }
}
</script>

<style  scoped>
  .home-nav{
    background-color: var(--color-tint);
    font-size: 20px;
    color: white;
    font-weight: bolder;
    /* position: fixed;  没必要了 因为better-scroll滚动区域不会包含到homeNav
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  #home{
    /*padding-top: 44px; /*浮动影响解决 换成content margintop*/
    /* padding-bottom: 50px; *让tabbar不遮住内容 */
    height: 100vh; /*看见的高度*/
    position: relative;
  }
  /*.tab-control{ //scroll中失效了
    position: sticky;
    top:44px;
    z-index: 9;
  } */
  .tab-control1{
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .content{
    /* height: 300px; */
    height: calc(100% - 93px);  /*100%对于父元素来说 44 + 49 -44padding*/
    overflow: hidden;
    /* margin-top: 44px; */
    /* margin-bottom: 50px; */

    /*或者使用定位解决position :absolute top44 buttom50 left0 right0*/
  }

</style>
