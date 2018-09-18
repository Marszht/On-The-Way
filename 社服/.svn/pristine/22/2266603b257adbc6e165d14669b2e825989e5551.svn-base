// pages/login/login.js
const app = getApp();

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
      }
    })
  },
  login(){
    wx.checkSession({ // 
      success: res => {
        // session 未过期
        wx.switchTab({
          url: '/pages/index/index'
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
            url: app.globalData.login.url,
            method: "POST",
            data: { code, userInfo },
            success: res => {
              let { code, data, message } = res.data.data;
              let icon = 'none'
              if( code === 200 ){
                wx.setStorageSync( 'openid', data.openid )
                icon = "";
                wx.switchTab({
                  url: '/pages/index/index',
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
