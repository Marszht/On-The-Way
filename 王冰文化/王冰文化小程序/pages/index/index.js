//index.js
//获取应用实例
const app = getApp()
const WxParse = require('../../plugins/wxParse/wxParse.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    askList:[],
    info:{},
    item:[],
    service: '',
    isShow: false,
    user:{
      nickName: "匿名",
      avatarUrl: "../../asset/img/default.jpg",
    }
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    this.getInfo();
    this.get_ask();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  html2wx( article ) {
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 0);
  },
  show(){
    this.setData({ isShow: true })
  },
  getInfo(){
    wx.request({
      url: app.globalData.index.url,
      success: res =>{
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ info: data, service: data.head })
          app.globalData.serviceImg = data.head;
          this.html2wx( data.intro || "" );
        }
      }
    })
  },
  get_ask( cb ) {
    let openid = wx.getStorageSync("openid");
    if (!openid) return wx.showToast({ title: '请登录之后再试', icon: "none" });
    wx.request({
      url: app.globalData.search.url ,
      success: res => {
        let { code, data } = res.data.data;
        if (code === 200) {
          this.setData({
            askList: data.items,
          })
        }
      },
      complete(){
        cb && cb();
      }
    })
  },
  getUserInfo: function(e) {
    console.log( "user info", e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh(){
    this.get_ask( wx.stopPullDownRefresh )
  },
})
