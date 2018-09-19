// pages/help/help.js
const app = getApp();

let test = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536230426666&di=29b66242ede74eb2b9411b41232e8699&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Fcrop.0.0.980.300%2F7fd664e1gw1eicc0ua9dvj20r808cq6f.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelf: false, // 判断是谁进来的
    leng:0, // 判断有几人完成的百分比进度
    avatarUrl:"",
    tab: [  
      {
        text: "助力加油",
        children:[]
      },
      {
        text: "全民购",
        children:[]
      },
      {
        text: "助力领",
        children:[],
        history:[]
      }
    ],
    adImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536229316935&di=bd72b75438ead8743c30c2c2340482e5&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D931143253%2C3258226254%26fm%3D214%26gp%3D0.jpg",
    tabIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tabIndex = +options.tabIndex || 0;
    this.setData({ tabIndex })
    wx.getUserInfo({
      success: res => {
        let avatarUrl = res.userInfo.avatarUrl;
        this.setData({ avatarUrl })
      }
    })
    this.getTab( tabIndex )
    // setTimeout( ()=> console.log( this.data.avatarUrl ), 2000)
  },
  getTab( hid ){

    wx.request({
      url: app.globalData.url.CHEERTAP,
      data:{ hid },
      success: res => {
        // console.log ( res )
        // 解构
        let { code, data } = res.data.data;
        if( code === 200 ){
          let tab = this.data.tab;
          tab[ hid ].children = data;
          this.setData({ tab })
          // console.log( 'help cheer', hid,tab )
        }
      }
    })
  },
  changeTab( e ){
    let tabIndex = e.currentTarget.dataset.index;
    let tab = this.data.tab;
    if (tabIndex === 2) return wx.navigateTo({
      url: '/pages/shareHelp/shareHelp',
    })
    if( tabIndex !== this.data.tabIndex ){
      this.setData({ tabIndex })
    }
    if ( !tab[tabIndex].children.length ){
      this.getTab(tabIndex)
    }
  },
  goDetails( e ){
    let { id, status} = e.currentTarget.dataset;
    if( status === 1 ){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id,
      })
    }else{
      wx.showToast({
        title: status ? '活动已结束' : '活动尚未开始',
        icon:'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
})