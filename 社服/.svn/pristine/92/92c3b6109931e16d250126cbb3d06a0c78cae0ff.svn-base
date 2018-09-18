// pages/find/find.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftList:[],
    leftIndex:0,
    oCid:{},
    cid:"",
    ctype:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLeftList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  tabLeft( e ){
    let { index, id ,ctype  } = e.target.dataset;
    if( index !== this.data.leftIndex ){
      this.getCat( id , ctype )
      this.setData({ leftIndex: index, ctype })
    }
  },
  getLeftList(  ){
    wx.request({
      url: app.globalData.url.FINDCAT,
      success: res => {
        let { code, data } = res.data.data;
        if (code === 200) {
          this.setData({ leftList: data })
          data[0] && this.getCat(data[0].id, data[0].type)
        }
      }
    })
  },
  getCat( cid ,ctype ){
    let obj = this.data.oCid;
    if (!obj[ cid ] ){
      wx.request({
        url: app.globalData.url.FINDCAT,
        data: { cid, type: ctype },
        success: res => {
          let { code, data } = res.data.data;
          if (code === 200) {
            obj[ cid ] = data;
            this.setData({ oCid: obj, ctype })
          }
        }
      })
    }
    this.setData({ cid })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})