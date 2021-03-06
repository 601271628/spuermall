import {request} from './request'

export function getDetail(iid){        //商品信息/detail/对应的iid
  return request({
    url:'/detail',
    params:{
      iid
    }
  });
}

export function getRecommend(){ //详情页的 推荐数据
  return request({
    url:'/recommend'
  })
}

export class Goods{       //把商品的描述 价格 ...抽离为一个类整合起来 在导出类就方便使用了
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {           //商家的消息
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


export class GoodsParam {                 //商品参数 如：推荐的尺寸
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
