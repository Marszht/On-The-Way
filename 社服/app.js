//app.js
import * as URL from './api/url.js'
App({
  onLaunch: function () {
    console.log("获取openid", wx.getStorageSync("openid"))
    if( !wx.getStorageSync("openid") ){
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.globalData.userInfo = res.userInfo;
      },
      //  如果失败则重新登录
      fail: res => {
        wx.navigateTo({
          url: "/pages/login/login",
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    url: URL,
<<<<<<< .mine
    my:{
      account:0,
    }
  },
//  ？
  test(){
    let me = {},
    body = {};

    me.changePage = ( originArr = [], page = 1, num = 10 ) => {
      let showArr = [],
      total = originArr.length,
      pages = ~~( total / num ) ;
      page -= 1;
      if( page < 0 ) page = 0 ;
      if( page > pages ) page = pages;
      showArr = originArr.slice( page * num, ( page + 1 ) * num );
      return {
        total, //  总条数, 从1开始计算
        pages: pages + 1, //  总页码，从0开始计算
        showArr, // 页面显示所用的数组
      }
    }
    me.findEvaluationMasterByCondition( body ).done( function( data ){
      me.a( data.items );
      me.show = me.changePage( me.a, 1 ).showArr;
    })
    setTimeout( ()=> console.log( me.show ), 2000 )
||||||| .r149
  },
//  ？
  test(){
    let me = {},
    body = {};

    me.changePage = ( originArr = [], page = 1, num = 10 ) => {
      let showArr = [],
      total = originArr.length,
      pages = ~~( total / num ) ;
      page -= 1;
      if( page < 0 ) page = 0 ;
      if( page > pages ) page = pages;
      showArr = originArr.slice( page * num, ( page + 1 ) * num );
      return {
        total, //  总条数, 从1开始计算
        pages: pages + 1, //  总页码，从0开始计算
        showArr, // 页面显示所用的数组
      }
    }
    me.findEvaluationMasterByCondition( body ).done( function( data ){
      me.a( data.items );
      me.show = me.changePage( me.a, 1 ).showArr;
    })
    setTimeout( ()=> console.log( me.show ), 2000 )
=======
>>>>>>> .r151
  }
})