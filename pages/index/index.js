//index.js
import {request} from '../../server/request.js'
const app = getApp()

Page({
  data: {
    swiperData: [],  // swiper展示数据
    classifyData:[], // 产品分类数据
    floorData:[]  // 产品楼层列表数据
  },

  onLoad: function() {
    this.getSwiperData()
    this.getClassData()
    this.getFloorData()
  },
  // 获取轮播图数据
  getSwiperData () {
    request({
      url: 'home/swiperdata'
    }).then(res => {
      console.log(res)
      this.setData({swiperData: res.data.message})
    })
  },
  // 获取产品分类数据
  getClassData () {
    request({
      url: 'home/catitems'
    }).then(res => {
      console.log(res)
      this.setData({classifyData: res.data.message})
    })
  },
  // 获取产品楼层列表数据
  getFloorData () {
    request({
      url: 'home/floordata'
    }).then(res => {
      this.setData({floorData: res.data.message})
    })
  }
})
