//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    info:{},
  },
  onLoad: function () {
    this.getInfo();
  },
  getInfo(){
    wx.request({
      url: app.globalData.url.INDEX,
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ info: data,  })
        }
        console.log('get info ad', data.shops )
      }
    })
  },
  // 拨打电话权限 并拨打电话
  tel( e ){
    let phoneNumber = '' + e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber,
    })
  },
  toMap(){
    let { latitude, longitude, address } = this.data.info.shops;
    wx.openLocation({
      latitude: + latitude,
      longitude: + longitude,
      scale: 18,
      name: address
    })
    // wx.navigateTo({
    //   url: "/pages/shopMap/shopMap?latitude=" + latitude + "&longitude=" + longitude
    // })
  },
})
