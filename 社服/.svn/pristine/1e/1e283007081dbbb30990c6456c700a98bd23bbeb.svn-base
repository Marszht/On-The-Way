// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Array,
      default:[],
    },
    content:{
      type:Array,
      default:[],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 滚动切换标签样式
    switchTab: function (e) {
      this.setData({
        currentTab: e.detail.current
      });
      this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
      var cur = e.target.dataset.current;
      if (this.data.currentTaB == cur) { return false; }
      else {
        this.setData({
          currentTab: cur
        })
      }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
      if (this.data.currentTab > 4) {
        this.setData({
          scrollLeft: 300
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
    },
  }
})
// var app = getApp();
// let mock = [
//   {
//     tab:'健康',
//   },
//   {
//     tab: '情感',
//   },
//   {
//     tab: '职场',
//   },
//   {
//     tab: '育儿',
//   },
//   {
//     tab: '纠纷',
//   },
//   {
//     tab: '青葱',
//   },
//   {
//     tab: '全部',
//   },
//   {
//     tab: '其他',
//   },
// ]
// Page({
//   data: {
//     mock,
//     currentTab: 0, //预设当前项的值
//     scrollLeft: 0, //tab标题的滚动条位置
//     expertList: [{ //假数据
//       img: "avatar.png",
//       name: "欢顔",
//       tag: "知名情感博主",
//       answer: 134,
//       listen: 2234
//     }]
//   },
//   // 滚动切换标签样式
//   switchTab: function (e) {
//     this.setData({
//       currentTab: e.detail.current
//     });
//     this.checkCor();
//   },
//   // 点击标题切换当前页时改变样式
//   swichNav: function (e) {
//     var cur = e.target.dataset.current;
//     if (this.data.currentTaB == cur) { return false; }
//     else {
//       this.setData({
//         currentTab: cur
//       })
//     }
//   },
//   //判断当前滚动超过一屏时，设置tab标题滚动条。
//   checkCor: function () {
//     if (this.data.currentTab > 4) {
//       this.setData({
//         scrollLeft: 300
//       })
//     } else {
//       this.setData({
//         scrollLeft: 0
//       })
//     }
//   },
// })
