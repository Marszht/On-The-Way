const util = require('../../utils/util.js');
const app = getApp();
// 基础url 也就是前缀
const doubanUrl = app.globalData.doubanBase;
const bannerUrl = app.globalData.musicBase;


Page({
  data: {
    swiperList: [],
    isLoading: true
  },


  onLoad: function(options) {
    // this._initSwiperList()
    wx.showLoading({
      title: '加载中...',
    })
    //  获取电影列表数据
    this.getMovieListData('/v2/movie/in_theaters', {
      start: 0,
      count: 6
    }, "inTheaters", '正在热映');
    this.getMovieListData('/v2/movie/coming_soon', {
      start: 0,
      count: 6
    }, "comingSoon", '即将上映')
    this.getMovieListData('/v2/movie/top250', {
      start: 0,
      count: 6
    }, "top250", '豆瓣top250')
  },
  //  获取swiper数据
  _initSwiperList() {
    util.$get(bannerUrl + '/api/tv/banner').then(res => {
      let code = res.data.status
      let swiperList = res.data.data;
      if (code === 0) {
        this.setData({
          swiperList
        })
      }
      //  console.log(swiperList)
    })
  },
  //  获取电影数据
  getMovieListData(url, senData, settedKey, categoryTitle) {
    util.$get(doubanUrl + url, senData).then(res => {
      console.log("res:", res)
      this._processDoubanData(res.data, settedKey, categoryTitle)
    }).catch(e => {
      // 如果请求错误 则取消加载
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        duration: 1000,
        icon: 'none'
      })
    })
  },

  _processDoubanData(data, settedKey, categoryTitle) {
    let list = data.subjects.map(item => {
      return {
        stars: util.convertToStarsArray(item.rating.average),
        title: item.title,
        average: item.rating.average,
        movieId: item.id,
        coverageUrl: item.images.large,
      }
    })
    this.setData({
      //  不用预先定义 如果是变量则[ ]括起来
      [settedKey]: {
        categoryTitle: categoryTitle,
        movies: list
      }
     
    })
     console.log("list", list)
    // console.log("movies:", list)
    //  如果请求到了数据，就不需要再loading
    if (this.data.inTheaters && this.data.comingSoon && this.data.comingSoon) {
      wx.hideLoading()
    }
  },
  onMoreTap(e) {
    let { category, title } = e.currentTarget.dataset;
     console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: `more-movie/more-movie?category=${category}&title=${title}` ,
    })
  }

})