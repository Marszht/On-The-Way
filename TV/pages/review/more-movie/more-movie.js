const util = require('../../utils/util.js');
const app = getApp();
const doubanUrl = app.globalData.doubanBase;
Page({
  data: {
    requestUrl: '',
    movieList: [],
    sendData: {
      start: 0,          
      count: 18,        // 每页加载条数
      q: undefined,
      tag: undefined
    },
    noData: false,
    isLoading: true,
    hasMore: false

  },

  onLoad: function (options) {

  },

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