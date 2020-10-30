<!--  -->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
    :key="index"
    class="tabcontrol-item"
    :class="{active:index == currentIndex}"
    @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemclick(index){
      this.currentIndex=index;
      //传出点击的是哪一个
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style  scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tabcontrol-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>
