// pages/videos/videos.js
const util = require('../../utils/util.js')
const app = getApp();
const movieUrl = app.globalData.movieBase
Page({

   /**
    * 页面的初始数据
    */
   //    如果变量为bolean 类型 则 设置变量名时用上 is have can 等前缀
   data: {
      isLoading: false,
      movieList: null,
      article_id: 0,
      swiperList: null,

   },
   getList( type ) {
      this.setData({
         isLoading: true
      })
      util.$get(
         `${movieUrl}/api/v2/article`,
         {
            app_id: 6,
            cid: 4,
            article_id: this.data.article_id
         }).then(res => {
            
            let { status } = res.data
            // console.log(status)
            let  movieList  = res.data.data.articles; 
            console.log(movieList)
            if (status === 0) {
               this.processData(type, movieList)
            }
         }).catch( e => {
            this.setData({
               isLoading: true
            })
            // 如果报错看打印出的报错信息是的什么？
            console.log( e )
            wx.stopPullDownRefresh();
            wx.showToast({
               title: '网络错误',
               duration: 1000,
               icon: 'none'
            })
         })
   },
   processData(type, list)  {
      if (list.length)  {
         list.map( v => {        // 处理时间
            v.create_time = util.formatTime(new Date(), 'yyyy-MM-dd');
         })
         if ( type === 'up' )  {       // 上拉处理
            this.setData({ 
               movieList: this.data.movieList.concat( list )
            })
         } else {           //  下拉处理
            this.setData({
               movieList: list
            })
            wx.stopPullDownRefresh();
            this.setData ({
               article_id: ++this.data.article_id,
               isLoading: false
            })
         }
      } else {
         if ( type === 'down' ) {
            wx.showToast({
               title: '没有数据',
               duration: 1000,
               icon: 'none'
            })
         }
      }
   },


   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // 加载轮播图
      this.initSwiper();
      this.getList("down");
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
   //    得在app.json 里面设置 enablePullDownRefresh
   onPullDownRefresh: function () {
      this.initSwiper();
      this.getList('down')
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
      // 多一个处理 逻辑能力 用户体验好  待会能不能实现懒加载 视频和影评模块
      if (this.data.isLoading) {     // 防止数据还没回来再次触发加载
         return;
      }
      this.getList( 'up' );
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   },
   initSwiper() {
      util.$get(`${movieUrl}/api/v2/article`,
         {
            app_id: 6,
            cid: 4,
            article_id: 0
         }).then(res => {

            let status = res.data.status
            if (status === 0) {
               let swiperList = res.data.data.articles.map(item => {
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
               // console.log(swiperList)
            }
         }).catch(e => {
            wx.showToast({
               title: '网络错误',
               icon: 'none'
            })
         })
   },

   //  推荐详情
   openDetail (e) {
      let item  = e.currentTarget.dataset.list;
      let url = `video-detail/video-detail?title=${item.title}&time=${encodeURIComponent(item.create_time)}&url=${item.videos[0].video_src}`
      wx.navigateTo({
         url: url
      })
   },

   //  滑块详情
   onSwiperTap( event ) {
      let item = event.currentTarget.dataset.item;
      //  url 拼接
      let url = `video-detail/video-detail?title=${item.title}&time=${encodeURIComponent(item.create_time)}&url=${item.video_src} `;
   wx.navigateTo({
      url: url,
   })
   }
}) 