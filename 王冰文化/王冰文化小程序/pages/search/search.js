// pages/search/search.js
const app = getApp();

Page({
  data: {
    val:"",
    items:[],
    userInfo: {
      nickName: "匿名",
      avatarUrl: "../../asset/img/default.jpg",
    },
    service:{},
  },
  onLoad: function () {
    this.setData({
      service: app.globalData.serviceImg,
      userInfo,
    })
  },
  search() {
    let q = this.data.val;
    if( !q ) return wx.showToast({
      title: '请输入关键字进行搜索',
      icon:"none",
    });
    wx.request({
      url: app.globalData.search.url,
      data: { q },
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ items: data.items })
          console.log('list', this.data.items )
          console.log("img", this.data.service )
          console.log("user info get", this.data.userInfo )
        }
      }
    })
  },
  autoInput(e) {
    this.setData({
      val: e.detail.value,
    })
  }
})


