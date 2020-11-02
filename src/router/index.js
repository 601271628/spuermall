import Vue from 'vue'
import Router from 'vue-router'
const home =()=> import('views/home/home.vue')
const category=()=>import ('views/category/category.vue')
const cart=()=>import ('views/cart/cart.vue')
const profile=()=>import ('views/profile/profile.vue')
const Detail=()=>import('views/detail/Detail.vue')
Vue.use(Router)

const router= new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:home,
      meta:{
        title:'首页'
      }
    },
    {
      path:'/category',
      component:category,
      meta:{
        title:'分类'
      }
    },
    {
      path:'/cart',
      component:cart,
      meta:{
        title:'购物车'
      }
    },
    {
      path:'/profile',
      component:profile,
      meta:{
        title:'我的'
      }
    },
    {
      path:'/detail/:iid',
      component:Detail,
      meta:{
        title:'详情'
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  next() //不写这个next函数的话，路径都不出来（路径映射的组件没出来）
})

export default router
