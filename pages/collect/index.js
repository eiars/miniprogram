// pages/collect/index.js
Page({
  data: {
    Tabs: [{
      id: 0,
      name: '商品收藏',
      isActive: true
    }, {
      id: 1,
      name: '品牌收藏',
      isActive: false
    }, {
      id: 3,
      name: '浏览足迹',
      isActive: false
    }],
    // 收藏数据
    collect: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow (options) {
    const collect = wx.getStorageSync('collect')
    this.setData({collect})
  },
  tabItemChange (e) {
    console.log(e)
    const id = e.detail.id
    const Tabs = this.data.Tabs
    Tabs.forEach((v, i) => i === id ? v.isActive = true : v.isActive = false)
    this.setData({Tabs})
  }
})