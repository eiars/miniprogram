// pages/order/index.js
import {request} from '../../server/request.js'
import regeneratorRuntime from '../../lib/runtime'
Page({
  data: {
    orders: [{
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "create_time": 1564731518
    }, {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518
    }, {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518
    }, {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518
    }],
    //Tabs数据
    Tabs: [{
      id: 0,
      name: '全部',
      isActive: true
    }, {
        id: 1,
        name: '待付款',
        isActive: false
    }, {
        id: 2,
        name: '待发货',
        isActive: false
    }, {
        id: 3,
        name: '退款/退货',
        isActive: false
    }]
  },
  onShow (options) {
    // 判断是否登录
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return false
    }
    let pages = getCurrentPages()
    // 获取上一个页面的option
    let type = pages[pages.length - 1].options.type || 0
    console.log( pages[pages.length - 1], type)
    this.getOrderList(type)
  },
  // 获取订单列表
  async getOrderList (type) {
    // 获取订单历史记录
    const res = await request({url: '/my/orders/all', data: {type: type}})
    // let order = res.orders
    let orders = this.data.orders
    // 转换订单创建时间(时间戳转换成日期)
    let newOrders = orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString())}))
    this.setData({
      orders: newOrders
    })
  },
  // 切换Tab栏
  tabsItemChange (e) {
    const id = e.detail.id
    const Tabs = this.data.Tabs
    Tabs.forEach((v, i) => {i === id ? v.isActive = true : v.isActive = false})
    this.setData({Tabs})
    this.getOrderList(id)
  }
})