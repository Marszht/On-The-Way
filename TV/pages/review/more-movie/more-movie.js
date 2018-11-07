const util = require('../../../utils/util.js');
const app = getApp();
const doubanUrl = app.globalData.doubanBase;
Page({
   data: {
      requestUrl: '',
      movieList: [],
      sendData: {
         start: 0,
         count: 18, // 每页加载条数
         q: undefined,
         tag: undefined
      },
      noData: false,
      isLoading: true,
      hasMore: false

   },

   onLoad: function(options) {
      let { category , title }= options;
      let url = ''
      switch (category) {
         case "正在热映":
            url = "/v2/movie/in_theaters";
            break;
         case "即将上映":
            url = "/v2/movie/coming_soon";
            break;
         case "豆瓣Top250":
            url = "/v2/movie/top250";
            break;
         case "tag":
            url = "/v2/movie/search";
            this.data.sendData.tag = options.title;
            break;
         case "keyword":
            url = "/v2/movie/search";
            this.data.sendData.q = options.title;
            break;
      }
      this.data.requestUrl = doubanUrl + url
      wx.setNavigationBarTitle({
         title: decodeURIComponent(options.title)
      })
      this.getList('down');
   },
   getList(type) {
      this.setData({
         // 刚开始调用先加载
         isLoading: true,
         hasMore: false
      })
      // 顶部 loading
      wx.showNavigationBarLoading()
      type === 'down' ? this.data.sendData.start = 0 : this.data.sendData.start;
      let data = Object.assign({}, this.data.sendData);
      data.start = data.start * data.count;
      util.$get(this.data.requestUrl, data).then(res => {
         // console.log('res', res)
         this.processDoubanData(type, res.data.subjects);
         wx.hideNavigationBarLoading()
      }).catch(e => {
         this.setData({
            isLoading: false,
            hasMore: false
         })
         wx.stopPullDownRefresh();
         wx.hideNavigationBarLoading();
         wx.showToast({
            title: '网络错误',
            duration: 1500,
            icon: "none"
         })

      })
   },
   processDoubanData(type, data) {
      //  判断一下是否真的获取到了数据，
      //  没有这个意识
      console.log(data.length)
      if (data.length) {
         let list = data.map((v) => {
            return {
               // 处理星评
               stars: util.convertToStarsArray(v.rating.average),
               title: v.title,
               average: v.rating.average,
               coverageUrl: v.images.large,
               movieId: v.id
            }
         })
        
         if (type === 'up') {
            this.setData({
               movieList: this.data.movieList.concat(list)
            })
       
         } else {
            this.setData({
               movieList: list
            })
            console.log('movieList', this.data.movieList)
            wx.stopPullDownRefresh()
         }
         this.setData({
            'sendData.start': ++this.data.sendData.start,
         })
      } else {
         if (type === 'down') {
            wx.showToast({
               title: `没有数据`,
               duration: 1500,
               icon: "none"
            })
            this.setData({
               isLoading: false,
               noData: true,
               hasMore: false
            })
            wx.stopPullDownRefresh()
         } else {
            this.setData({
               isLoading: false,
               hasMore: true
            })
         }
      }
   },
   onReady: function() {

   },
onPullDownRefresh() {
   this.getList('down');
},
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
      console.log(this.data.movieList)
   },
onReachBottom() {
   //  防止数据没有回来再次触发加载
   if (this.data.isLoading) {
      return ;
   }
   this.getList('up')
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