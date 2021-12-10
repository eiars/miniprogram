// pages/auth/index.js
import {request} from '../../server/request.js'
import regeneratorRuntime from '../../lib/runtime'
import {login} from '../../utils/cartAsync.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {
    try {
      const code = await login()
      let {encryptedData, rawData, iv, signature} = e.detail
      let params = {encryptedData, rawData, iv, signature, code}
      // const token = await request({url:'users/wxlogin',data: params, method:'post'})
      wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
      // wx.setStorageSync('token', token)
      // 返回上一页
      wx.navigateBack({
        delta: 1,
      })
    } catch (error) {
      console.log(error)
    }
  }
})