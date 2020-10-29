
//取文件别名
module.exports = {
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'./src/assets',   //@/assets
        'common':'./src/common',
        'components':'./src/components',
        'network':'./src/network',
        'views':'./src/views',
      }
    }
  }
}
