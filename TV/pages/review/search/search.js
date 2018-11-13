const util = require('../../../utils/util.js');
const doubanUrl = getApp().globalData.doubanBase;
const hotTag = ['动作', '喜剧', '爱情', '悬疑'];
Page({
   data: {
     searchType:'keyword',
     hotKeyword: null,
    //  这也能解析？
     hotTag
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
    //  console.log('hotTag', this.data.hotTag)
    // 获取热门关键字
    this.getKeyword();
   },
   getKeyword() {
     util.$get(doubanUrl + '/v2/movie/coming_soon', {start: 0, count: 10})
     .then( res=> {
       console.log( 'keyword', res)
       this.setData({ hotKeyword: res.data.subjects })
       console.log(this.data.hotKeyword)
     })
   },
  //  搜索
   searchA(e) {
     this.search(e.datail.value.keyword)
   },
   searchB(e) {
     this.search(e.datail.value)
   },

  search(keyword){
    if (keyword == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: '1500'
      })
      return false;
    }else {
      wx.navigatrTo({
        url: `../more-movie/more-movie?category=${this.data.search}&title${encodeURIComponent(keyword)}`
      })
    }
  },
  searchByTag () {
    let keyword = e.currentTarget.dataset.keyword;
    wx.navigatrTo({
      url: `../more-movie/more-movie?category=tag&title=${keyword}`
    })
  },
  //   改变搜索类型
  changeSearchType() {
    let types = [ '默认', '类型'];
    let searchType = ['keyword', 'tag']
    wx.showActionSheet({
      itemList: types,
      success: res => {
        if (!res.cancel) {
          this.setData({
            searchType: searchType[res.tabIndex]
          })
        }
      }
    })
  },

   onPullDownRefresh: function () {

   },

   onReachBottom: function () {

   },

   onShareAppMessage: function () {

   }
})