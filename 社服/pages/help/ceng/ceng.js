// pages/help/ceng/ceng.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSelf:{
      type:Boolean,
      value:false,
    },
    leng:{
      type:Number,
      value:0,
    },
    list:{
      type:Array,
      value:[],
    },
    avatarUrl:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activity:true,
    active:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindBtn(){
      if( this.data.isSelf ){
        console.log( ' 分享领奖品')
      }else{
        console.log(' 帮他助力')
      }
    },
    show(){
      this.setData({ activity: !this.data.activity })
      if( !this.data.activity ){
        let active = `1、将活动分享给好友，邀请好友支付一元为您助力（同个用户只能支付一次），只要10位好友完成助力，您即可在助力领里面任意选择一个项目进行体验。
2、每个用户限参与 1 次`
        this.setData({ active })
      }
    }
  }
})
