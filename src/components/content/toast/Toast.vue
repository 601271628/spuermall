<!--  -->
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data(){
    return {
      isShow:false,
      message:''
    }
  },
  methods:{
    show(message,time){
      this.message=message,
      this.isShow=true,

      setTimeout(()=>{
        this.isShow=false
      },time)

      console.log('show');
    }
  }
}
</script>

<style  scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;

    background-color: rgba(32, 31, 31, 0.8);
    color:#fff;
    padding: 8px 10px;
  }
</style>
