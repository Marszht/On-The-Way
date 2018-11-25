const util = require('../../../utils/util.js');
const app = getApp();
const doubanUrl = app.globalData.doubanBase;
Page({
  data: {
    filmDetail: {},                 // 电影详情
    isLoading: true,             // 判读是否在加载
    id: ''                           //   电影id
  },

  onLoad: function(options) {
    this.data.id = options.id;
    wx.setNavigationBarTitle({
      // 设置当前标题
      title: decodeURIComponent(options.title),  
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.showNavigationBarLoading()               // 顶部loading
    // 获取电影详情数据
    this.getList();    
  },

  // 获取数据
getList() {
  util.$get(doubanUrl + `/v2/movie/subject/${this.data.id}`).then( res => {
    res.data.starts = util.convertToStarsArray(res.data.rating.average)
console.log('stars',res.data)
    
    this.setData ({
      filmDetail: res.data,
      isLoading: false
    })
// console.log('stars',filmDetail.stars)
    wx.hideNavigationBarLoading()
    wx.hideLoading()
  }).catch( err => {
    wx.hideNavigationBarLoading()
    wx.showToast({ title: `网络错误!`, duration: 1500, icon: "none" })
    this.setData({
      isLoading: false
    })
    wx.hideLoading()
  })
},
// 预览图片
viewMoviePostImg(e) {
  let { src } = e.currentTarget.dataset;
  // 点击预览图片
  wx.previewImage({
    urls: [src]
  })
},
// 标签导航
viewFilmByTag(e) {
  let item = e.currentTarget.dataset;
  wx.redirectTo({
    url: `../more-movie/more-movie?category=tag&title=${item.tag}`
  })
},
// 人物详情
viewPersonDetail(e) {
  let data = e.currentTarget.dataset;
  if (!data.id) {
    wx.showToast({
      title: '没有找到相关信息',
      duration: 1500,
      icon: 'none'
    })
    return;
  }
  wx.redirectTo({
    url: `../person-detail/person-detail?id=${data.id}&title=${data.title}`
  })
},
  onReady: function() {

  },

  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})