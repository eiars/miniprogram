// pages/index.js
import {request} from '../../server/request'
import {getSetting, chooseAddress, showModal, requestPayment} from '../../utils/cartAsync'
import regeneratorRuntime from '../../lib/runtime';

const app = getApp()

Page({
  data: {
    address: {},  //收货地址
    cart: [], //购物车
    totalPrice: 0,  // 总价
    totalNum: 0,  // 总数量
  },

  onShow: function() {
    // 收货地址接收
    const address = wx.getStorageSync('address')
    // 购物车接受
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(item => {
      totalPrice += item.goods_price * item.num
      totalNum += item.num
    })
    this.setData({address, cart, totalPrice, totalNum})
  },
  // 支付
  async play () {
    console.log('play pay')
    try {
      // 是否登录
      let token = wx.getStorageSync('token')
      if (!token) {
        // 跳转到认证登录
        wx.navigateTo({
          url: '/pages/auth/index'
        })
        return false
      }
      // 创建订单
      let goodsData = []
      this.data.cart.forEach(item => {
        goodsData.push({
          goods_id: item.goods_id,
          goods_number: item.num,
          goods_price: item.goods_price
        })
      })
      let createData = {order_price: this.data.totalPrice,
                        consignee_addr: this.data.address.all,
                        goods: goodsData
                        }
      console.log(createData)
      // 创建订单获取订单信息
      let order_number = ''
      await request ({url:'my/orders/create', data: createData, method: 'POST'}).then(res => {
        order_number = res.message
      })
      console.log(order_number, '创建的订单编号')
      // 发生支付接口
      const {pay} = await request({url: '/my/orders/req_unifiedorder', params:{order_number}, method: 'POST'})
      console.log(pay, '发生支付请求接口返回参数')
      // 发起微信支付
      await requestPayment(pay)
      // 查询订单状态
      const res = await request({url: 'my/orders/chkOrder', params: {order_number}, method: 'post'})
      await showToast({ title: "支付成功" });
      // 删除购物车种支付过的商品
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter( v => !v.checked)
      console.log(newCart, '支付后购物车数据')
      wx.setStorageSync('cart', newCart)
      // 支付成功后跳入订单页
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (err) {
      console.log(err)
    }
  }
})
