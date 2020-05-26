// components/search/search.js
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
    TabCur: 0,
    scrollLeft:0,
    PageCur:"channel",
    isShow:false,
    navTop:wx.getSystemInfoSync().statusBarHeight,
  },
  attached(){
    
    
    //判断返回键的显示
   if(getCurrentPages().length > 1){
    this.setData({
      isShow:true
    })
   }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 导航栏选择
    tabSelect(e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60,
        PageCur: e.currentTarget.dataset.cur
      })
    }
  }
})
