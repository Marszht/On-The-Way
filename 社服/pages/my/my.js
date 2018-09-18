// pages/my/my.js
const app = getApp();
Page({

  data: {
    setting:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatar: '',
    nickName: "",
    unpayTickets: 4,
    unuseTickets: 1,
    uningTickets: 0,
    usedTickets: 12,
    id: 0
  },
  myOrders: function () {
    wx.navigateTo({
      url: "../myOrders/myOrders?id=0"
    })
  },
  unpay: function () {
    wx.navigateTo({
      url: "../myOrders/myOrders?id=0"
    })
  },
  unuse: function () {
    wx.navigateTo({
      url: "../myOrders/myOrders?id=1"
    })
  },
  using: function () {
    wx.navigateTo({
      url: "../myOrders/myOrders?id=2"
    })
  },


  used: function () {
    wx.navigateTo({
      url: "../myOrders/myOrders?id=3"
    })
  },
  onLoad: function() {
    if( !app.globalData.userInfo ){
      wx.getUserInfo({
        success: res =>{
          this.setData({
            avatar: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
        }
      })
    }else{
      this.setData({ avatar: app.globalData.userInfo.avatarUrl, nickName: app.globalData.userInfo.nickName })
    }

    // 已授权 可以调用 getUserInfo
        
    this.isClear();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  isClear(){
    wx.request({
      url:app.globalData.url.HOST + 'clear',
      success: res => {
        let { code, data } = res.data.data;
        code === 200 && data.clear === 666 && this.setData({ setting: true })
      }
    })
  },
  clearStorage(){
    wx.clearStorageSync();
    wx.showToast({
      title: '已清空缓存',
    })
    // wx.navigateTo({
    //   url: "/pages/login/login",
    // })
  }
})