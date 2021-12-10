//index.js
import {request} from '../../server/request'
const app = getApp()

Page({
  data: {
    //商品列表
    goods: [],
     //输入值
    inputValue: ''
  },
  timeTag: -1,  // 搜索请求定时器
  onLoad: function() {
  },
  inputChange (e) {
    console.log(e)
    let keyword = e.detail.value
    if (!keyword.trim()) {
      this.setData({
        goods: []
      })
      return false
    }
    clearInterval(this.timeTag)
    this.timeTag = setTimeout(()=>{
      this.getSearch(keyword)
    }, 1000);
  },
  // 获取搜索商品列表
  getSearch (keyword) {
    request({
      url: 'goods/qsearch',
      data: {
        query: keyword
      }
    }).then(res => {
      console.log(res)
      this.setData({
        goods: res.data.message
      })
    })
  }
})
