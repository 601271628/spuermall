<!--  -->
<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default(){ //默认值为函数
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
}
</script>

<style  scoped>

</style>
