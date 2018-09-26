var WxParse = require('../../plugins/wxParse/wxParse.js');
Component({
  properties: {
    item: {
        type: Object,
        value: {}
    },
    userInfo:{
      type:Object,
      value:{},
    },
    customService:{
      type: String,
      value: ''
    }
  },
  ready(){
    this.html2wx( this.data.item.answer || '' );
  },
  methods:{
    html2wx( article ){
      var that = this;
      WxParse.wxParse('article', 'html', article, that, 0);
    },
    // btn( e ){
    //   console.log('组件', this, e )
    // }
  },
});