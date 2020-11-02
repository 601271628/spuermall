<!--  -->
<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style  scoped>
  .navbar{
    display: flex;
    line-height: 44px;   /*垂直居中 且会自动设置高度为44px*/
    height: 44px;
    text-align: center;  /*水平居中 */
    /* background-color: rgb(252, 166, 180);
            因为不同的navbar背景不同 那就把背景颜色写在各自使用时的位置吧*/
    /**加阴影 */
    box-shadow:0 2px 0.5px rgba(202, 201, 201, 0.1); /*x,y，模糊度，颜色 */
  }
  .left,.right{
    width: 60px;
    /* background-color: red; */
  }
  .center{
    flex: 1;
    /* font-size: 20px;   因为不同的navbar字体颜色不同 颜色写在各自使用时的位置吧*/
    /* background-color: green; */
  }
</style>
