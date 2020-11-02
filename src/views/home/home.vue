<!--  -->
<template>
  <div id="home">
      <nav-bar class="home-nav"><span slot="center">购物街</span></nav-bar>
      <!-- <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image">
          </a>
        </swiper-item>
      <! </swiper> -->   <!--封装到views/home/home.vue-->
      <scroll class="content" ref="scrollref"
      :probe-type="3"
      @scroll="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore">   <!--父访问子-->
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>

        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick">
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
      isShow:false
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
      console.log(index);
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
    },
    backClick(){
      // console.log('backClick');
      // this.$refs.scroll.scroll.scrollTo(0,0,500) //参数x,y,时间ms
      this.$refs.scrollref.scrollTo(0,0,500)
    },
    scroll(position){
      // if(position.y > -285 ){this.isShow=false} else this.isShow=true   下面简写
      this.isShow = (position.y < -285)
    },
    loadMore(){ //scroll传出pullingUp事件拉到底了后 会在这里增加goodslist的商品数
      this.getHomeGoods(this.currentType)    //发送请求 增加对应pop/new/sell 的goodslist
      this.$refs.scrollref.finishPullUp()  //告诉数据加载完成 可以进行下一次了
      // this.$refs.scrollref.scroll.refresh()  //写到了getHomeGoods异步请求服务器数据方法中了(方法1)
    },
    // debounce(func,delay){
    //   let timer=null
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer=setTimeout(() => {
    //       func.apply(this,args)
    //     }, delay);
    //   }
    // },

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
    const refresh=debounce(this.$refs.scrollref.refresh,500)
    this.$bus.$on('itemiamgeload',()=>{
      refresh()
    })
  }
}
</script>

<style  scoped>
  .home-nav{
    background-color: var(--color-tint);
    font-size: 20px;
    color: white;
    font-weight: bolder;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  #home{
    padding-top: 44px; /*浮动影响解决 换成content margintop*/
    /* padding-bottom: 50px; *让tabbar不遮住内容 */
    height: 100vh; /*看见的高度*/
  }
  .tab-control{
    /*skitcy当该元素的位置将要移出偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果
      （不设配ie浏览器）*/
    position: sticky;
    top:44px;
    z-index: 9;
  }
  .content{
    /* height: 300px; */
    height: calc(100% - 49px);  /*100%对于父元素来说 44 + 49 -44padding*/
    overflow: hidden;
    /* margin-top: 44px; */
    /* margin-bottom: 50px; */

    /*或者使用定位解决position :absolute top44 buttom50 left0 right0*/
  }
</style>
