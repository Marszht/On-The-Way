// pages/videos/video-detail/video-detail.js
const util = require ('../../../utils/util.js');
const app = getApp();
const movieUrl = app.globalData.movieBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     video: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //   console.log( options );
     this.setData({
        video:  {
           time: decodeURIComponent(options.time),
           url: decodeURIComponent(options.url),
           title: decodeURIComponent(options.title)
        }
     })
     wx.setNavigationBarTitle({
        title: decodeURIComponent(options.title),
     })
   //  console.log( this.data.video )


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