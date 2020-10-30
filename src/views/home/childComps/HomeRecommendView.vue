<!--  -->
<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommenditem">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style  scoped>
  .recommend{
    display: flex;
    text-align: center;
    margin-top: 3px;
    border-bottom: 8px solid rgb(228, 223, 223);
  }
  .recommenditem{
    flex: 1;
    font-size: 12px;
    /* position: relative;
    left: -4px;       */
    padding: 7px 0 10px;
  }
  .recommenditem a img{
    height: 80%;
    width: 90%;
  }
</style>
