
const app = getApp();

//  function formateTime  (time) {
//   // let time = this.data.checkList.trade_time
//   console.log(time)
//   let arrTime = time.split('-')
  
//   let hour = arrTime.split(' ') [1]
//   let day = arrTime [1] + '-' + arrTime.split(' ') [1]
//   this.setData ({
//     day: day,
//     hour: hour
//   })
// }
Page({


  data: {
    checkList: [],

    // title: '',
    // money: null,
    // time: '',
    day: '',
    hour: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    wx.request({
      method:"POST",
      data:{ openid: wx.getStorageSync("openid").openid },
      url:app.globalData.url.GETMONEY,
      success: res => {
        console.log('get money', res )
        let { code, data } = res.data.data;
        if ( code === 200 ) {
          // console.log('get money', data.log )
          // let checkList.title = 
          this.setData ({
            checkList: data.log,
          })
        }
      } 
    })
    // var that = this
    // that.formateTime(this.data.checkList.trade_time);
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
  onPullDownRefresh: function (opt) {
    wx.startPullDownRefresh({
      success: res => {
        console.log(this.data.checkList)
        wx.showToast({
          title: '',
          icon: 'loading',
          duration: 1500
        })
      }
    }) 
    wx.stopPullDownRefresh()
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