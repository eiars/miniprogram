// pages/goodList/index.js
import {request} from '../../server/request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    noneTag: false, // 没有更多数据是否显示
    tabData: [
      {id:0, name: '综合', isActive: true},
      {id:1, name: '销量', isActive: false},
      {id:2, name: '价格', isActive: false}
    ],
    maxPagenum: 1,  // 总页数
    goodList: [],  // 商品列表数据
    boxHeight: 0  // 页面商品列表高度
  },
  goodParams: {
    cid: '',
    query: '',
    pagenum: 1,
    pagesize: 20
  }, // 商品列表请求参数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabData: this.data.tabData
    })
    console.log(options)
    this.goodParams.cid = options.cid || ''
    this.goodParams.query = options.query || ''
    this.getGoodListData()
  },
  // 监听tab切换
  tabsItemChange (e) {
    console.log(e.detail.dataset.id)
    let i = e.detail.dataset.id
    this.data.tabData[i].isActive = true
  },
  // 监听上拉加载事件
  onReachBottom () {
    console.log(111)
    this.goodParams.pagenum += 1
    if (this.goodParams.pagenum >= this.maxPagenum) {
      wx.showToast({ title: '没有更多了' });
      this.data.noneTag = true
    } else {
      this.getGoodListData()
      this.data.noneTag = false
    }
  },
  // 监听下拉刷新页面
  onPullDownRefresh () {
    this.params.pagenum = 1
    this.data.goodList = []
    this.getGoodListData()
  },
  // 监听上拉刷新页面,若数据不足一页
  // onPageScroll(e){
  //   wx.createSelectorQuery().select('#box').boundingClientRect(res => {
  //   console.log(res)
  //   if (e.scrollTop >= res.height - 500) {
  //     console.log(1111111)
  //     this.getGoodListData()
  //   }
  //   }).exec();
  // },
  // 获取商品列表
  getGoodListData () {
    request({
      url: 'goods/search',
      params: this.goodParams
    }).then(res => {
      console.log(res)
      this.setData({
        goodList: [...this.data.goodList, ...res.data.message.goods],
        maxPagenum: parseInt(res.data.message.total / this.goodParams.pagesize)
      })
      wx.stopPullDownRefresh()
    })
  }
})