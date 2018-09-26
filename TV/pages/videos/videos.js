// pages/videos/videos.js
const util = require('../../utils/util.js')
const app = getApp();
const movieUrl = app.globalData.movieBase
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: null,
    article_id: 0,
    swiperList: [],

  },
// getList() {
//   util.$get(
//     `${movieUrl}/api/v2/article`,
//     {
//       app_id: 6,
//       cid: 4,
//       article_id: this.data.article_id
//     }).then( res => {
//       let { status } = res.data
//       if ( status === 0) {
//         // this
//       }
//     })
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载轮播图
    this.initSwiper();
    setTimeout(() => {
      console.log(this.data.swiperList[0].thumbnails)
      
    },2000)
    
   


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   //   console.log(this.data.swiperList)
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
  initSwiper () {
    util.$get(`${movieUrl}/api/v2/article`,
    {app_id: 6,
    cid: 4,
    article_id: 0
    }).then ( res => {

      let status = res.data.status
      if ( status === 0 ) {
        let swiperList = res.data.data.articles.map( item => {
           return {
              create_time: item.create_time = util.formatTime(new Date(item.create_time), 'yyyy-MM-dd'),
              article_id: item.article_id,
              title: item.title,
              video_src: item.videos[0].video_src,
              thumbnails: item.thumbnails[0].url
           }
        })

        this.setData({
          swiperList
        })
      }
    }) .catch( e => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
    })
  }
})