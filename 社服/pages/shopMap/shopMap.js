// pages/shopMap/shopMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    markers: [],
    scale: 18,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let marker = {
      iconPath:'./location.png',
      id: 0,
      latitude: options.latitude,
      longitude: options.longitude,
      width:50,
      height:50,
    }
    this.setData({ address: options, markers:[ marker ] })
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

  },
  markertap( e ){
    console.log( e )
  }
})