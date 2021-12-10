// pages/goodDetail/index.js
import {request} from '../../server/request'
import regeneratorRuntime from '../../lib/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouchangTag: false,  // 是否收藏商品
    detailData: []  // 商品详情数据
  },
  params: {
    goods_id: ''
  },
  // 商品加入购物车暂存数据
  goodIn: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id)
    this.params.goods_id = options.goods_id
    this.getGoodDetail()
  },
  // 获取商品详情
  async getGoodDetail () {
    console.log(this.params)
    let goodInfo = ''
    await request({
      url: 'goods/detail?goods_id='+ this.params.goods_id
    }).then(res => {
      console.log(res.data)
      goodInfo = res.data.message
      this.goodIn = goodInfo
    })
    let collect = wx.getStorageSync("collect") || [];
    console.log(collect)
    let index = -1
    if (collect[0]) {
      index = collect.findIndex(v => v.goods_id === this.data.detailData.goods_id)
    }
    this.setData({
      detailData: {
        goods_name: goodInfo.goods_name,
        goods_price: goodInfo.goods_price,
        goods_introduce: goodInfo.goods_introduce,
        pics: goodInfo.pics
      },
      shouchangTag: index !== -1
    })
  },
  // 收藏商品
  shoucangTap () {
    // 首先获取已存储收藏信息
    let collect = wx.getStorageSync("collect") || []
    console.log(collect)
    // 筛选当前商品是否存在收藏数据中
    let index = -1
    if (collect[0]) {
      index = collect.findIndex(v => v.goods_id === this.data.detailData.goods_id)
    }
    // 暂取是否收藏(若存在不收藏false,否则收藏true)
    let isCollect = !this.data.shouchangTag
    // 存在于收藏信息中就删除否则添加
    index == -1 ? collect.push(this.data.detailData) : collect.splice(index, 1)
    this.setData({
      shouchangTag: isCollect
    })
    console.log('shoucang'+ isCollect)
    // 将收藏信息存入storage
    wx.setStorageSync("collect", collect)
  },
  // 加入购物车
  handleCartAdd () {
    let that = this
    // 获取缓存中购物车中商品
    let cart = wx.getStorageSync('cart') || []
    console.log(cart, this.detailData)
    // 判断购物车中是否有该商品 (有该商品则商品数加1，无则加入购物车中)
    let index = -1
    index = cart.findIndex(v => v.goods_id === this.data.detailData.goods_id)
    // index = cart.findIndex(v =>{
    //   console.log(v.goods_id)
    //   return v.goods_id === that.detailData.goods_id
    // })
    if (index === -1) {
      this.goodIn.num = 1
      this.goodIn.checked = true
      cart.push(this.goodIn)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    console.log(cart)
    wx.showToast({
      title: '已经加入购物车',
      icon: 'success',
      mask: true
    })
  }
})