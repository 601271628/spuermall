<!--  -->
<template>
  <div>
      <nav-bar class="home-nav">
        <span slot="center">购物街</span>
      </nav-bar>
      <h2>首页</h2>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name:'home',
  components:{
    NavBar
  }
}
</script>

<style  scoped>
  .home-nav{
    background-color: rgb(252, 166, 180);
    font-size: 20px;
    color: white;
    font-weight: bolder;
  }
</style>
