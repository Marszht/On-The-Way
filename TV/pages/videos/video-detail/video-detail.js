// pages/videos/video-detail/video-detail.js
const util = require('../../../utils/util.js');
const app = getApp();
const movieUrl = app.globalData.movieBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    movieList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 是url 里面传过来的值
    //  console.log( options );
    this.setData({
      video: {
        time: decodeURIComponent(options.time),
        url: decodeURIComponent(options.url),
        title: decodeURIComponent(options.title)
      }
    })
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title),
    })
    this._getMovieList();



  },


  //  获取推荐影片
  _getMovieList() {
    util.$get(`${movieUrl}/api/v2/article`, {
      app_id: 6,
      cid: 4,
      article_id: 0
    }).then(res => {
      let status = res.data.status;
      if (status === 0) {
        //  对获取数据进行处理
        res.data.data.articles.map(v => { // 转换一下时间
          v.create_time = util.formatTime(new Date(), 'yyyy-MM-dd')
          //  正则？
          v.thumbnails[0].url = v.thumbnails[0].url.replace(/(\.\w{3,4})$/i, "_crop" + 234 + "x" + 146 + "$1")
        })
        this.setData({
          movieList: res.data.data.articles
        })
        console.log("movie:", this.data.movieList)
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

  },
  //  打开推荐重新渲染detail一遍
  openDetail(e) {
    let item =  e.currentTarget.dataset.list;
    let url = `../video-detail/video-detail?title=${item.title}&time=${item.create_time}&url=${item.videos[0].video_src}`
    wx.redirectTo({
      url: url
    })
    console.log(e)
  }
})