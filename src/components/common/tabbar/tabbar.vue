<!--  -->
<template>
  <div id="tabbar">
    <slot></slot>  <!--让我们更灵活改-->
  </div>
</template>

<script>
export default {
  name:'tabbar'
}
</script>
<style  scoped>
   #tabbar{
    display: flex; /*横向显示*/
    background-color:rgb(235, 230, 230);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    box-shadow: 0 -2px 1px rgba(100,100,100,0.25); /*x,y，模糊度，颜色 */
  }
</style>
