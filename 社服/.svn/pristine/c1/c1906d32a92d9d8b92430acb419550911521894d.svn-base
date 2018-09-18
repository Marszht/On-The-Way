// pages/shareHelp/shareHelp.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展示的是否是自己的信息， 默认展示自己信息
    isSelf: true,
    tuanhao:"",
    openid:"",
    // 没有助力记录，可开启新团  默认不能开启
    hadInfo: false,
    // 初始选择数据,
    initList:{
      service_data:[],
      tips:"",
    },
    selectBox: true,
    activity:true,
    selectIndex:0,
    aid:"",


    leng: 0,
    list: [],
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tuanhao = options.tuanhao;
    if( tuanhao ) this.setData({ tuanhao });
    let openid = wx.getStorageSync('openid').openid;
    this.setData({ openid })
    this.getStatus();
    this.getSelectList();
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          this.setData({
            avatar: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
        }
      })
    } else {
      this.setData({ avatar: app.globalData.userInfo.avatarUrl, nickName: app.globalData.userInfo.nickName })
    }

  },
  //  获取状态==========================================================================================================
  getStatus(){
    wx.request({
      url: app.globalData.url.ONLYHELPSTATUS,
      method:"POST",
      data:{
        openid: this.data.openid,
        tuanhao: this.data.tuanhao,
      },
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          if( data.had_info === 0 ){// 没有助力记录，可开启新团
            this.setData({ hadInfo: true, selectBox: false })
            this.show();
          }
          if (  data.which !== "myself" ){
            this.setData({ isSelf: false })
          }
        }
        console.log("only help", data )
      }
    })
  },
  //获取列表
  getSelectList(){
    wx.request({
      url: app.globalData.url.ONLYHELPLIST,
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ initList: data })
          console.log('init list', data )
        }
      }
    })
  },
  selectType( e ){
    if(e.target.dataset.toast ) this.setData({ selectBox: true });
  },
  show() {
    this.setData({ activity: !this.data.activity })
  },
  selectIdx( e ){
    let selectIndex = e.currentTarget.dataset.index;
    if (selectIndex !== this.data.selectIndex ){
      this.setData({ selectIndex })
    }
  },
  selectServer(){
    let aid = this.data.initList.service_data[this.data.selectIndex]
    aid = aid ? aid.id : "";
    wx.request({
      url: app.globalData.url.ONLYHELPTAKE,
      method:"POST",
      data:{
        openid: this.data.openid,
        aid,
      },
      success: res => {
        let { code, data, message } = res.data.data;
        if( code === 200 ){

        }else{
          wx.showToast({
            title: message,
            icon:"none"
          })
        }
        this.setData({ selectBox: true })
        console.log('select serve', res.data.data)
      }
    })
  },


  bindBtn() {
    if (this.data.isSelf) {
      console.log(' 分享领奖品')
    } else {
      console.log(' 帮他助力')
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})