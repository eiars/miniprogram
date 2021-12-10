let ajaxTimes = 0

export const request = (params) => {
  // 加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  let header = {...params.header}
  if (params.url.includes('my/')) {
    // 当创建订单支付等接口时,在header中携带（拼接）token
    header['Authorization'] = wx.getStorageSync('token')
  }
  ajaxTimes++
  // 公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1/"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: (result) => {
        console.log(params,result)
        wx.hideLoading()
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}