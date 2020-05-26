// pages/components/search/channel/noContent/noContent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hotList:['shuai','sad','asdasd','shuai','sad','asdasd','shuai','sad','asdasd'], //数据截取前10个
    showClear:false,
    historyList:['shuai','sad','asdasd','shuai','sad','asdasd','shuai','sad','asdasd']

  },
  attached(){
    var that = this;
    
    if(that.data.historyList){
      // historylist,后台请求数据进行渲染
      console.log(that.data.historyList)
      that.setData({
        showClear:true,
      })
    }
  },
  // 未能实现，没有历史数据时，初始化不显示
  // show(e){  
  //   if(this.data.historyList === []){
  //     this.setData({
  //       showClear:false
  //     })
  //   }
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    clearHistory(e){
      this.setData({
        historyList:[],
        showClear:false
      })
      wx.showToast({
        title: '清除成功',
        icon:"success"
      })
    }
  }
})
