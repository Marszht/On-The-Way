// pages/login/login.js
const app = getApp();
//  没怎么看懂
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnFlag: false,
  },
  getUserInfo( e ){
    
    if (e.detail.userInfo ){
      // 登录成功，保存登录信息并跳转
      this.login()
    }else{
      // 未获取授权，不能使用
      wx.showToast({
        title: '点击允许进行下一步',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] ){
          // 已经授权进行登录
          if( wx.getStorageSync('openid') ){
            this.login();
          }else{
            this.initLogin();
          }
        }else{
          this.setData({ btnFlag: true })
        }
      },
      fail: res =>{
        console.log("fail", res )
      }
    })
  },
  login(){
    wx.checkSession({ // 
      success: res => {
        // session 未过期
        // wx.switchTab({
        //   url: '/pages/index/index'
        // })
        
        wx.navigateBack({
          delta: 1
        })
      },
      fail: res => {
        // session 过期 ===> 重新登录
        this.initLogin();
      }
    })
  },
  initLogin() {
    let code = null, userInfo = null,
      callback = () => {
        if (code && userInfo) {
          wx.request({
            url: app.globalData.url.LOGIN,
            method: "POST",
            data: { code, userInfo },
            success: res => {
              let { code, data, message } = res.data.data;
              let icon = 'none'
              if( code === 200 ){
                wx.setStorageSync( 'openid', data )
                icon = "";
                wx.navigateBack({
                  delta: 1
                })
              }
              wx.showToast({
                title: message,
                icon,
              })
            }
          })
        }
      }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        code = res.code;
        callback();
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.globalData.userInfo = res.userInfo
        userInfo = res;
        callback();
      }
    })

  },

})
