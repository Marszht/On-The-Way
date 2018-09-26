// pages/my/my.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    askList:[],
    service:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_ask();
    this.setData({
      service: app.globalData.serviceImg,
      userInfo: app.globalData.userInfo,
    })
  },
  get_ask( cb ){
    let openid = wx.getStorageSync("openid");
    if (!openid) return wx.showToast({ title: '请登录之后再试', icon: "none" });
    wx.request({
      method:"POST",
      url: app.globalData.my.url,
      data:{
        openid,
      },
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({
            askList:data,
          })
        }
      },
      complete() {
        cb && cb();
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
  onPullDownRefresh() {
    this.get_ask(wx.stopPullDownRefresh)
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