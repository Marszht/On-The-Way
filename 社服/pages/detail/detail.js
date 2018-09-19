// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:"",
    detail:{},
    dTimer:"00天 00:00:00",
    list:[],
    lt:[],
    joinBtn:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail( options.id )
    this.getList(options.id)
    this.setInter()
    this.setData({ goodsId: options.id })
  },
  getList( aid ){
    wx.request({
      data: { aid },
      url: app.globalData.url.JOIN,
      success: res => {
        let { code, data } = res.data.data;
        if (code === 200) {
          this.setData({ list: data, lt: data.map( i => ({ ...i, htime: '00:00:00'})) })
        }
      }
    })
  },
  getDetail( aid ){
    wx.request({
      data:{ aid },
      url: app.globalData.url.CHEER,
      success: res => {
        let { code, data } = res.data.data;
        if( code === 200 ){
          this.setData({ detail: data })
        } 
      }
    })
  },
  setTime( num ){
    let total = +this.data.detail.end_time + num ,
    t = this.getTime(total),
    str = t.d + '天 ' + t.t;
    if (isNaN( total )) return;
    this.setData({ dTimer: str })
  },
  resetlt( num ){
    let arr = this.data.list.map(i => ({ ...i, htime: this.getTime( +i.htime + num ).t}) )
    this.setData({ lt: arr })
  },
  setInter( flag = false ){
    let timer = null,
    num = 0;
    clearInterval( timer );
    if( flag ) return;
    timer = setInterval(() => {
      num--;
      this.setTime( num );
      this.data.lt.length && this.resetlt( num );
    }, 1000)
  },
  getTime( total ){
    if (total <= 0 || isNaN(total)) return { d: '00', t: "00:00:00"}
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
  /**
   * 用户点击加入团购
   */
  joinGroup( e ){
    if ( this.data.joinBtn ){
      this.setData({ joinBtn: false })
      wx.redirectTo({
        url: "/pages/groupDetail/groupDetail?tuanhao=" + e.currentTarget.dataset.id
      })
    }
  },
  // 发起助力
  initGroup(){
    if (this.data.joinBtn) {
      this.setData({ joinBtn: false })
      wx.request({
        method:"POST",
        url: app.globalData.url.JOINGROUP,
        data:{
          aid: this.data.goodsId,
          openid: wx.getStorageSync('openid').openid,
        },
        success: res => {
          let { code, data, message } = res.data.data;
          console.log("支付", data )
          if( code === 200 ){
            // 支付
            let toUrl = '/pages/groupDetail/groupDetail?tunhao=' + data.tuanhao;
            wx.requestPayment({
              ...data,
              success: res => {
                // 支付成功，跳转
                console.log( '支付成功', res )
                wx.navigateTo({
                  url: toUrl,
                })
              }
            })
          }else{
            wx.showToast({
              title: message ,
              icon:"none"
            })
          }

          this.setData({ joinBtn: true })
        },
        fail: res => {
          wx.showToast({
            title: '网络错误，请稍后再试',
            icon:"none",
          })
          this.setData({ joinBtn: true })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let title = this.data.detail.name
    return {
      title,
      path: '/pages/detail/detail?id=' + this.data.goodsId
    }
  },
})