
//取文件别名
module.exports = {
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',   //@/assets
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}
