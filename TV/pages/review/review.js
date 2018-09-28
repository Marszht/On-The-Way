const util = require ('../../utils/util.js');
const app = getApp();
const doubanUrl = app.globalData.doubanBase;
const bannerUrl = app.globalData.musicBase;


Page({
   data: {
      swiperList: [],
      // isLoading: true
   },


   onLoad: function(options) {
      this._initSwiperList()
//  获取电影列表数据
this
   },
   //  获取swiper数据
_initSwiperList() {
  util.$get( bannerUrl + '/api/tv/banner').then( res => {
     let code = res.data.status
     let swiperList = res.data.data;
     if ( code === 0 ) {
        this.setData({
           swiperList
        })
     }
     console.log(swiperList)
  })
}

})