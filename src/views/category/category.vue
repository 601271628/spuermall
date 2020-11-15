<!--  -->
<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>

    <div class="left">
      <div><button class="btn1" @click="btn('btn1')">btn1</button></div>
      <div><button class="btn2" @click="btn('btn2')">btn2</button></div>

    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'cartgory',  //mounted 处于发起后端请求，获取数据，配合路由钩子执行操作（DOM渲染完成，组件挂载完成 ）
  data(){
    return {
    }
  },
  components:{
    NavBar
  },
  methods:{
    btn(a){
      this.$router.replace('/category/'+a)

    }
  }
}
</script>

<style  scoped>
    .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: bold;
    font-size: 20px;
  }
</style>
