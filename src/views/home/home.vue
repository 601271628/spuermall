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
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"></tab-control>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'  //导航组件
import TabControl from 'components/content/TabControl/TabControl' //首页分类

import HomeSwiper from './childComps/HomeSwiper'          //轮播图组件
import HomeRecommendView from './childComps/HomeRecommendView'//推荐组件
import FeatureView from './childComps/FeatureView'  //本周新品

import {gethomerequest} from 'network/homerequest'

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
    TabControl
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  //组件创建完 发送请求要数据
  created(){
    gethomerequest().then((res)=>{
      console.log(res);
      this.banners=res.data.banner.list;         //新端口 res.data.data.
      this.recommends=res.data.recommend.list;
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
    padding-top: 44px; /**浮动影响解决 */
    padding-bottom: 44px; /**让tabbar不遮住内容 */
  }

</style>
