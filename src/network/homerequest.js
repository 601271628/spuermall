import {request} from './request.js'

//封装的意义，首页有多个请求，都放在这
export function gethomerequest(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){     //type=new,pop,sell
    return request({
        url:'/home/data',
        params:{
          type,
          page
        }
    })
}
