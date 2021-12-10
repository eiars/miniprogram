//index.js
import {request} from '../../server/request'
import {getSetting, chooseAddress, showModal} from '../../utils/cartAsync'
import regeneratorRuntime from '../../lib/runtime';

const app = getApp()

Page({
  data: {
    address: {},  //收货地址
    cart: [], //购物车
    totalPrice: 0,  // 总价
    totalNum: 0,  // 总数量
    allChecked: true  // 是否全选
  },

  onShow: function() {
    // 收货地址接收
    const address = wx.getStorageSync('address')
    // 购物车接受
    const cart = wx.getStorageSync('cart')
    console.log(cart)
    this.setData({address, cart})
    this.setCart(cart)
    // 初始化购物车全选按钮
   let tag = cart.some(item => {item.checked == false}) 
    // 若购物车中有一个没选中，全选按钮不选中
    console.log('tag', !tag)
    this.setData({
      allChecked: !tag
    })
  },
  // 添加收货地址
  async addressChoose (e) {
    try {
      let scope = await getSetting()
      if (!scope) {
        // 若未开启地址读取权限，让用户开启权限
      }
      // 获取用户地址信息
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
    console.log(e)
  },
  // 勾选商品
  handleCheck (e) {
    console.log(e)
    // 获取产品id
    let id = e.target.dataset.id
    let cart = this.data.cart
    let index = cart.findIndex(v => v.goods_id === id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 购物车加减数量
  async numChange (e) {
    // 获取商品信息
    let {id, option} = e.target.dataset
    let cart = this.data.cart
    let index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && option === -1) {
      // 若商品只存在1件，且还是减少1件商品，则再购物车中移除该商品
      const res = await showModal('是否删除商品！')
      // 弹框确认删除商品，cart中删除该商品
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
        return
      }
    }else {
      // 若商品还有多件，cart购物车中加减数量
      cart[index].num += option
      this.setCart(cart)
    }
   
  },
  // 购物车全选
  handleAllCheck () {
    this.data.allChecked = !this.data.allChecked
    let {allChecked, cart} = this.data
    cart.forEach(item => item.checked = allChecked)
    console.log('all', cart)
    this.setCart(cart)
  },
  // 结算购物车商品
  async allPlay () {
    const {address, totalNum} = this.data
    //校验收货地址
    if (!address.userName){
      this.showModal('未填写联系方式')
    } else if (totalNum === 0) {
      this.showModal('未选择商品')
    } else {
      // 跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/index'
      })
    }
  },
  // 更新购物车
  setCart (cart) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    // 判断是否全选，计算总计
    cart.forEach(element => {
      if (element.checked) {
        // 若勾选计算总计
        totalPrice += element.num * element.goods_price
        totalNum += element.num
      }else {
        allChecked = false
      }
    })
    allChecked = cart.length>0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart)
  }
})
