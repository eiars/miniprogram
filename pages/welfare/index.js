//index.js
const app = getApp()
import {request} from '../../server/request.js'

Page({
  data: {
    cateData: [], // 总数据
    defaultTab: 0, // 左侧大分类菜单选中值
    cateClassifyList: [],  // 商品大分类数据
    brandList: [], // 产品分类品牌数据
    brandScrollTop: 0// 左侧分类菜单滑动高度
  },

  onLoad: function() {
    this.getCateData()
  },
  // 获取商品分类
  getCateData () {
    request({
      url: 'categories'
    }).then(res => {
      console.log(res)
      let cateData = res.data.message
      let classifyList = res.data.message.map(v => v.cat_name)
      let brandList = res.data.message[0].children
      this.setData({
        cateData: cateData,
        cateClassifyList: classifyList,
        brandList: brandList
      })
      console.log(cateData)
    })
  },
  // 切换左侧产品大分类
  classifyChange(e) {
    let index = e.target.dataset.index
    let list = this.data.cateData[index].children
    console.log(e)
    this.setData({
      brandList: list,
      defaultTab: index,
      brandScrollTop: 0
    })
  }
})