// pages/collections/collections.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionLists: []

  },
  cancelCollection: function (e) {
    // console.log(index)
    let index = e.currentTarget.dataset.index
    let collectionLists = this.data.collectionLists
     collectionLists.splice(index, 1);
    //  console.log(index)
     this.setData({
       collectionLists
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      method: 'POST',
      data: { openid: wx.getStorageSync('openid').openid },
      url: app.globalData.url.COLLECTION,
      success: res => {
        let { code, data } = res.data.data
        // let source = data.source
        console.log(res)
        if (code === 200) {
          this.setData({
            // collectionLists: data[0].source
          })
        }
        // console.log(data[0].source)
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