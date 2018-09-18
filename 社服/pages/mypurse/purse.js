// pages/mypurse/purse.js
const app = getApp();
Page({

  data: {
    balance: "0.00",
    checkDetail: []
  },


  showDetail: function (e) {
   
    // console.log(e)
     if ( this.data.checkDetail.length ) {
      wx.navigateTo ({
        url: '../checkDetail/checkDetail',
      })
     } else  {
       wx.showToast ({
         title: '您还没有账单',
         icon : 'none',
         mask: false,
         success: res => {
          //  console.log(res)
          setTimeout(() => {
            wx.navigateTo ({
              url: '../checkDetail/checkDetail',
            })
          }, 2000);

         }
       })
     }
 
  },
  onLoad: function (options) {
    // wx.request ()
    console.log(options)
    wx.request({
      method:"POST",
      data:{ openid: wx.getStorageSync("openid").openid },
      url:app.globalData.url.GETMONEY,
      success: res => {
        console.log('get money', res )
        let { code, data } = res.data.data;
        if ( code === 200 ) {
          // console.log('get money', data )
          let balance = data.user_account || "0.00"
          this.setData ({
            balance ,
            checkDetail: data.log
          })
        }
      }
    })
    // setTimeout(() => {
    //   let resBalance = this.data.balance - options.balance 
    //   this.setData({
    //     balance: resBalance
    //   }, 1000)
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // wx.getCurrentPages()
    console.log(getCurrentPages())
    
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