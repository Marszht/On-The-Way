//app.js
import { HOST, ASK, GETASK, AUTH, INFO, SEARCH } from './api/url.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.globalData.userInfo = res.userInfo
      }
    })
  },

  globalData: {
    HOST,
    ask:{
      url: ASK,
    },
    my:{
      url: GETASK,
    },
    index:{
      url: INFO,
    },
    search:{
      url: SEARCH,
    },
    login:{
      url: AUTH,
    },
    userInfo: null,
    serviceImg:''
  }
})