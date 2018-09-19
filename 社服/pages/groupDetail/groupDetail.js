// pages/groupDetail/groupDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnText:"参与助力",
    detail:{},
    htime:"00:00:00",
    group:{},
    isSelf:0,
    tuanhao:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("tuanhao", options.tuanhao )
    this.getGroup( options.tuanhao )
    this.setInter();
    this.setData({ tuanhao: options.tuanhao })
  },
  getGroup( tuanhao ){
    let openid = wx.getStorageSync('openid').openid;
    wx.request({
      method:"POST",
      url: app.globalData.url.GETGROUP,
      data:{
        openid,
        tuanhao,
      },
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ detail: data.activity_info, group: data.tuan_info, isSelf: data.had_join })
          this.getTme();
        }
      }
    })
  },
  getTme( num = 0 ){
    let htime = this.data.group.htime;
    htime = this.getTime( +htime + num ).t
    this.setData({ htime })
  },
  setInter(flag = false) {
    let timer = null,
      num = 0;
    clearInterval(timer);
    if (flag) return;
    timer = setInterval(() => {
      num--;
      this.getTme( num )
    }, 1000)
  },
  getTime(total) {
    if (total <= 0 || isNaN( total )) return { d: '00', t: "00:00:00" }
    let s = total % 60;
    let m = ~~((total / 60) % 60);
    let h = ~~((total / 3600) % 24);
    let d = ~~(total / 86400);
    s = s > 9 ? s : '0' + s;
    m = m > 9 ? m : '0' + m;
    h = h > 9 ? h : '0' + h;
    d = d > 9 ? d : '0' + d;
    return { d, t: [h, m, s].join(":") }
  },

  initGroup(){
    if( this.data.isSelf == 0 ){// 未参与
      wx.request({
        method:"POST",
        url: app.globalData.url.MKDIRGROUP,
        data:{
          tuanhao: this.data.tuanhao,
          openid: wx.getStorageSync('openid').openid
        },
        success: res => {
          let { code, data, message } = res.data.data;
          if( code === 200 ){
            wx.requestPayment({
              ...data,
              success: res =>{
                //支付成功进行跳转
                this.setData({ isSelf: 1 })
              },
              fail: res => {
                //支付失败
              }
            })
          } else {
            wx.showToast({
              title: message,
              icon: "none"
            })
          }
        }
      })
    }else{
      this.onShareAppMessage();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let title = this.data.detail.name
    return {
      title,
      path: '/pages/groupDetail/groupDetail?tuanhao=' + this.data.tuanhao
    }
  }
})