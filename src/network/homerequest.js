import {request} from './request.js'

//封装的意义，首页有多个请求，都放在这
export function gethomerequest(){
  return request({
    url:'/home/multidata'
  })
}
