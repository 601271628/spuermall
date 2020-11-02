<!--  -->
<template>
  <div id="detail">
      <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import {getDetail} from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar
  },
  data(){
    return {
      iid:null
    }
  },
  created(){
    //1.保存传入的iid
    this.iid=this.$route.params.iid

    //根据iid请求数据
    getDetail(this.iid).then((res)=>{
      console.log(res);                     //网卡-明天试试
    })
  }
}
</script>

<style  scoped>

</style>
