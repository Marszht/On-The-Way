// pages/withdraw/wihdraw.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 'account',
    account: 0,   // 提现金额
    balance: 0,
    status: '',
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // showAction: function () {
  //   wx.showActionSheet
  // }


  // 输入要提现 的钱
  accountChange: function (e) {
    let account = +e.detail.value
    if (account >=0 ) {
      this.setData({
        account: account
      })
    }
 
  },
  withdraw: function () {
    let cash = this.data.account;
    if (this.data.flag) {
      this.setData({ flag: false })
      wx.request({
        url: app.globalData.url.WITHDRAW,
        method: "POST",
        data: {
          cash,
          openid: wx.getStorageSync("openid").openid,
        },
        success: res => {
          let { code, data } = res.data.data
          if ( code === 200 ) {
            let status = data.status
            console.log(res)
            this.setData({
              status,
            })
            wx.navigateTo({
              url: '../withdrawDetail/withdrawDetail?status=' + this.data.status
            })
          wx.setStorage({
              key: this.data.key,
              data: this.data.account,
            })
          }
        }

      })
    }
 
  },
  showToast: function () {
    wx.showToast({
      title: '敬请期待',
      // icon: 'loading',
      duration: 700,
      mask: true
    })
  },
  onLoad: function (options) {
    // 获取到的余额
    console.log(options.balance)
    let balance = options.balance
    this.setData({
      balance: balance
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
    // console.log(this.data.account)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // let resBalance = this.data.balance - this.data.account
    // this.setData({
    //   balance: resBalance
    // })

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