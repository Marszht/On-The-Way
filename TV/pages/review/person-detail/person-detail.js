const util = require('../../../utils/util.js')
const app = getApp();
const doubanUrl = app.globalData.doubanBase;
Page({
  data: {
    personDetail: {},
    id: '',
    movieList: [],
    isLoading: true
  },
  onLoad: function (options) {
    console.log(options)
    wx.showNavigationBarLoading() // 开启顶部loading
    wx.showLoading({
      title: '加载中'
    })
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title)
    })
    this.data.id = options.id
    this.getList();
  },
  // 获取演员信息
  getList() {
    util.$get(doubanUrl + '/v2/movie/celebrity/' + this.data.id).then(res => {
      let list = res.data.works.map((v) => {
        return {
          stars: util.convertToStarsArray(v.subject.rating.average),  // 处理星星评分
          title: v.subject.title,
          average: v.subject.rating.average,
          coverageUrl: v.subject.images.large,
          movieId: v.subject.id
        }
      })
      this.setData({
        isLoading: false,
        personDetail: res.data,
        movieList: list
      })
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    }).catch(e => {
      wx.hideNavigationBarLoading()
      wx.showToast({ title: `网络错误!`, duration: 1500, icon: "none" })
      this.setData({
        isLoading: false
      })
      wx.hideLoading()
    })
  },
  //  电影详情
  openDetail (e) {
    let item = e.currentTarget.dataset;
    wx.redirectTo({
      url: `../review-detail/review-detail?id=${ item.movieid }$title=${ item.titele }`
    })
  }

})