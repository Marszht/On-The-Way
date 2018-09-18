// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    titleColor: {
      type: String,
      value: '#00000'
    },
    logImage: {
      type: String
    },
    content: {
      type: String
    },
    contentColor: {
      type: String,
      value: '#888888'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 需要triggerEvent 触发
    cancelCallback() {
      this.triggerEvent('cancel')
    },
    //  生命周期函数
    hide() {
      this.setData({
        show: false
      })
    },
    show() {
      this.setData({
        show: true
      })
    },
    onGoUserInfo(e) {
      this.triggerEvent('confirm', e)
    }
   }
})
