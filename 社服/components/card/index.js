// components/card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{},
    },
    ctype:{
      type:String,
      value:"",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(e) {
      let { id } = e.currentTarget.dataset;
      wx.navigateTo({
        url: '/pages/details/details?id=' + id + "&ctype=" + this.data.ctype,
      })
    },
  }
})
