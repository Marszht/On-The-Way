// pages/myOrders/myOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [
      {
       text: '未付款',
       children: [
       {
        text:"未付款",
         time: '2018-08-23',
         delIcon: '',
         image: '',
         des: '我的 打啊打牌的打拼多年的啊苏东坡哦i能否收到spa金萨沙觉得阿婆的【开发',
         useTime: '周三 08.25 20：00',
         duration: '30 分钟',
         paydes: '共一件服务 需付款：',
         pay: '￥250.00'
       },
       {
        text:"未付款",
        time: '2018-08-23',
        delIcon: '',
        image: '',
        des: '',
        useTime: '周三 08.25  20：00',
        duration: '30 分钟',
        paydes: '共一件服务 需付款：',
        pay: '￥250.00'
      },
      ]
      },
      {
        text: '未使用',
        children: [
          {
            text:"未付款",
            time: '2018-08-23',
            delIcon: '',
            image: '',
            des: '',
            useTime: '周三 08.25 20：00',
            duration: '30 分钟',
            paydes: '共一件服务 需付款：',
            pay: '￥250'
          },
          {
            text:"未付款",
           time: '2018-08-23',
           delIcon: '',
           image: '',
           des: '',
           useTime: '周三 08.25 20：00',
           duration: '30 分钟',
           paydes: '共一件服务 需付款：',
           pay: '￥250'
         },
         ]
       },
       {
        text: '使用中',
        children: [
          {
            time: '2018-08-23',
            delIcon: '',
            image: '',
            des: '',
            useTime: '周三 08.25 20：00',
            duration: '30 分钟',
            paydes: '共一件服务 需付款：',
            pay: '￥250'
          },
          {
           time: '2018-08-23',
           delIcon: '',
           image: '',
           des: '',
           useTime: '周三 08.25 20：00',
           duration: '30 分钟',
           paydes: '共一件服务 需付款：',
           pay: '￥250'
         },
         ]
       },
       {
        text: '已使用',
        children: [
          {
            text:"已使用",
            time: '2018-08-23',
            delIcon: '',
            image: '',
            des: '',
            useTime: '周三 08.25 20：00',
            duration: '30 分钟',
            paydes: '共一件服务 需付款：',
            pay: '￥250'
          },
          {
           time: '2018-08-23',
           delIcon: '',
           image: '',
           des: '',
           useTime: '周三 08.25 20：00',
           duration: '30 分钟',
           paydes: '共一件服务 需付款：',
           pay: '￥250.00'
         },
         ]
       },
    ],
    tabIndex: 0

  },
  delete (index) {
    let children = this.data.tab.children
    if ( children.length ) {
      children.splice(index,1)
    }
    this.setData ({
      children
    })
  },
 changeTab (e) {
   let tabIndex = e.currentTarget.dataset.index
  //  let tab = this.data.tab
   if ( tabIndex !== this.data.tabIndex) {
     this.setData({ tabIndex })
   }
   console.log(this.data.tabIndex)
  //  console.log(this.data.tab[tabIndex].children)
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      tabIndex: +options.id
    })
    console.log(this.data.tabIndex)
    // this.changeTab(options.id)
    // console.log(this.data.tab[0].children.time)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // 每次刷新让tab 指向第一个页面
    // let index= e.currentTarget.dataset.index
    if (this.data.tabIndex === 0) {
      this.setData({
        tabIndex: 0
      })
    }
    
    

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})