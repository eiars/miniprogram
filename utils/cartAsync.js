
// 地址读取授权
export const getSetting = () => {
  return new Promise((reslove, reject) => {
    wx.getSetting({
      success: (res) => {
        console.log(res)
        reslove(res.authSetting['scope.address'])
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 添加地址
export const chooseAddress = () => {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success: (result) => {
        console.log(result)
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 弹框确认
export const showModal = (msg) => {
  return new Promise((reslove, reject) => {
    wx.showModal({
      title: '提示',
      content: msg,
      success (res) {
        if (res.confirm) {
          reslove(res)
          console.log('用户点击确定')
        } else if (res.cancel) {
          return
        }
      }
    })
  })
}

// 登录获取code
export const login = () => {
  return new Promise((reslove, reject) => {
    wx.login({
      success: res => {
        reslove(res.code)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 微信支付
export const requestPayment = (pay) => {
  return new Promise((reslove, reject) => {
    wx.requestPayment({
      ...pay,
      success (res) {
        reslove(res)
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

// 支付成功提示
export const showToast = (title) => {
  return new Promise((reslove, reject) => {
    wx.showToast({
      title: title,
      icon: "none",
      duration: 2000
    })
  })
}