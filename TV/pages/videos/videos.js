// pages/videos/videos.js
const util = require('../../utils/utils.js')
const app = getApp();
const movieUrl = app.globalData.movieBase
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: null,
    article_id: 0

  },
getList() {
  util.$get(
    `${movieUrl}/api/v2/article`,
    {
      app_id: 6,
      cid: 4,
      article_id: this.data.article_id
    }).then( res => {
      let { status } = res.data
      if ( status === 0) {
        // this
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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