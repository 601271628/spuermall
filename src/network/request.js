import axios from 'axios'

export function request(config){                          //直接return axios的
  //1.创建axios实例
  const axios1=axios.create({
    // baseURL:'http://123.207.32.32:8000',
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:10000  //headers:{}
  })

  //2.axios拦截器
  // 1.request发送请求时的拦截（把你的访问拦截了，你访问使用的baseurl....可以打印出来看到）
  axios1.interceptors.request.use((config1)=>{
    console.log("request拦截访问 success");
    return config1        //拦截后要return 不然就下面的操作就执行不了
  })

  /*3.response服务器做出响应时的拦截（服务器请求成功，做出响应返回来的数据被拦截了
                                      拦截服务器给的数据后要return出来）*/
  axios1.interceptors.response.use((res)=>{
    return res.data              //return res
  },(err)=>{
    console.log(err);
  })

  //发送真正的网络请求
  return axios1(config)
}
