// pages/welcome/welcome.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    userInfo: {
      avatarUrl: 'https://tvax3.sinaimg.cn/crop.8.7.322.322.180/8970ff1ely8frdenkcgutj209k09kdgw.jpg'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '狗蛋TV'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 加载完一秒后 就清除
    setTimeout(() => {
      this.setData({
        remind: ''
      })
    }, 1000);
    wx.onAccelerometerChange((res) => {
      let angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (this.data.angle !== angle) {
        this.setData({
          angle: angle
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo')

    // 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
    let dialogComponent = this.selectComponent('.wxc-dialog')
    if ( !userInfo ) {
      dialogComponent && dialogComponent.show()
    } else {
      this.setData({
        userInfo: userInfo
      })
      dialogComponent && dialogComponent.hide()
    }

  },
  onConfirm(e) {  //点击允许
    let dialogComponent = this.selectComponent('./wxc-dialog')
    dialogComponent && dialogComponent.hide();
    let userInfo = JSON.parse(e.detail.detail.rowData)
    if (!userInfo) {
      return;
    }
    this.setData({
      userInfo: userInfo
    })
    wx.setStorageSync('userInfo', userInfo)
  },
  onCancel() {
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide()
  }
  ,
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