// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord:"",
    searchFlag:true,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => console.log(this.data.keyWord), 5000 )
  },
  search( e ){
    console.log("search pages ", e.detail.key )
    let flag = this.data.searchFlag,
    q = e.detail.key;
    if( !q ) return wx.showToast({
      title: '请输入搜索内容',
      icon:"none"
    })
    if ( flag ){
      this.setData({ searchFlag:false })
      wx.request({
        url: app.globalData.url.SEARCH,
        data:{ q },
        success: res =>{
          let { code, data } = res.data.data;
          if( code === 200 ){
            this.setData({ list: data.items, searchFlag: true })
            console.log( 'search result', this.data.list )
          }
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})