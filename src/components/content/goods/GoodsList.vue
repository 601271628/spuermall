<!--  -->
<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style  scoped>
  .goods{
    display: flex;
    /*包裹  根据你子元素的大小来决定一行含有多少个子元素（div中含2个p，p宽度48%）那么一行刚好包裹两个p*/
    flex-wrap: wrap;
    justify-content: space-around; /*一行的子元素等分 */
    /* background-color: var(--color-background);*/
     padding: 2px;
  }
</style>
