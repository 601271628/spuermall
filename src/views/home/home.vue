<!--  -->
<template>
  <div>
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
      <h2>首页</h2>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'  //导航组件
import HomeSwiper from './childComps/HomeSwiper'          //轮播图组件
import HomeRecommendView from './childComps/HomeRecommendView'
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
    HomeRecommendView
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
      this.banners=res.data.banner.list;         //新端口 2data
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
  }
</style>
