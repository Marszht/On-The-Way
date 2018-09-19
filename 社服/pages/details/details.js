// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    ctype:"",
    id:"",
    sb:"",

    list:{},
    isLike:0,
    likeFlag: true,
    buyFlag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { ctype, id, sb } = options;
    let openid = wx.getStorageSync("openid");
    this.getDetails(id, ctype, sb, openid.openid )
    this.setData({ ctype, id, sb, openid })
  },
  getDetails(id, ctype, sb, openid ){
    if (!id || !ctype) return wx.switchTab({
                                url: '/pages/find/find'
                              });
    wx.request({
      url: app.globalData.url.DETAILSINFO,
      method:"POST",
      data:{
        id,
        type:ctype,
        openid,
        shareCode: sb,
      },
      success: res => {
        let { code, data, message } = res.data.data;
        if( code === 200 ){
          console.log( data )
          this.setData({ list: data.detail, isLike: data.is_like })
        }else{
          wx.showToast({
            title: message,
            icon:"none"
          })
        }
      }
    })
  },
  goLike(){
    if (this.data.likeFlag ){
      this.setData({ likeFlag: false })
      let url = this.data.isLike === 0 ? app.globalData.url.DETAILSLIKE : app.globalData.url.DETAILSUNLIKE;
      let lid = this.data.isLike || this.data.id;
      wx.request({
        url,
        method: "POST",
        data:{
          openid: this.data.openid.openid,
          lid ,
          type: this.data.ctype,
        },
        success: res => {
          let { code, data, message } = res.data.data;
          if( code === 200 ){
            if( this.data.isLike === 0 ){
              this.setData({ isLike: data.id })
            }else{
              this.setData({ isLike: 0 })
            }
          }
          wx.showToast({
            title: message,
            icon:"none",
          })
          this.setData({ likeFlag: true })
        }
      })
    }
  },
  initGroup(){
    if( this.data.buyFlag ){
      this.setData({ buyFlag: false });
      wx.request({
        url: app.globalData.url.DETAILSBUY,
        method:"POST",
        data:{
          id: this.data.id,
          type: this.data.ctype,
          openid: this.data.openid.openid,
          shareCode: this.data.sb,
        },
        success: res => {
          console.log( res.data.data )
          let { code, data, message } = res.data.data;
          if( code === 200 ){
            wx.requestPayment({
              ...data,
              success: res => {
                // {errMsg:"requestPayment:ok"}
                console.log("支付", res )
              }
            })
          }
          this.setData({ buyFlag: true });
        }
      })
    }
    console.log("立即购买")
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let title = this.data.list.name
    let { id, ctype } = this.data;
    let sb = this.data.openid.sharecode;
    let path = `/pages/details/details?id=${ id }&ctype=${ ctype }&sb=${ sb }`;
    console.log( path )
    return {
      title,
      path,
    }
  }
})