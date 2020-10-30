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
      <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'  //导航组件
import TabControl from 'components/content/TabControl/TabControl' //首页分类

import HomeSwiper from './childComps/HomeSwiper'          //轮播图组件
import HomeRecommendView from './childComps/HomeRecommendView'//推荐组件
import FeatureView from './childComps/FeatureView'  //本周新品

import {gethomerequest,getHomeGoods} from 'network/homerequest'

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
      recommends:[],
      goods:{
        pop:{ page:0, list:[] },
        news:{ page:0, list:[] },
        sell:{ page:0, list:[] }
      }
    }
  },
  methods:{
    gethomerequest(){
        gethomerequest().then((res)=>{
          console.log(res);
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
    },
    getHomeGoods(type){                           //请求商品
        const page=this.goods[type].page + 1;
        getHomeGoods(type,page).then((res)=>{
          // this.goods[type].list.push(...res.data.list); //使用push是吧数组拼接到数组后面...为es6写法，直接赋值会把数组的原来的覆盖掉，那么之前的商品信息就失去了
          // this.goods[type].list.concat(...res.data.list)
          this.goods[type].page+=1;
        })
    }

  },
  //组件创建完 发送请求要数据
  created(){
    this.gethomerequest();
    this.getHomeGoods('pop');
    this.getHomeGoods('news');
    this.getHomeGoods('sell');
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
    padding-bottom: 50px; /**让tabbar不遮住内容 */
  }
  .tab-control{
    /*skitcy当该元素的位置将要移出偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果
      （不设配ie浏览器）*/
    position: sticky;
    top:44px;
  }
</style>
