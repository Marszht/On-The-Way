// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTo:{
      type:Boolean,
      value:false,
    },
    key:{
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
    toSearch(){
      //跳转到搜索页
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    input( e ){
      // console.log(e.detail.value )
      this.setData({ key: e.detail.value })
    },
    btn( e ){
      this.triggerEvent('search', { key: this.data.key })
    },
    clear(){
      this.setData({ key: "",value: "" })
    },
  }
})
