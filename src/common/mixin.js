import {debounce} from './utils'

//混入的可以有 生命周期created()/mounted（）/.../data() /components:{} /methods:{}
export const itemListenrMixin={
  mounted(){
    const refresh=debounce(this.$refs.scrollref.refresh,500)
    this.itemImgListener=()=>{   //推荐的图片需要刷新一下 重新计算高度
      refresh()
    }
    this.$bus.$on('itemiamgeload',this.itemImgListener) //this.itemImgListener是refresh（）函数
    console.log('我是mixin的内容');
  }

  // data(){  return{ itemImgListener:null }   },  //把相同的变量混入到这
  // components:{},  //把相同的组件混入到这
  // methods:{}
}
