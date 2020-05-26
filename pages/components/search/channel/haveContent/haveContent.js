// pages/components/search/channel/haveContent/haveContent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接受查找结果的数据
    list:{
      type:Array
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft:0,
    searchedList:[{
      src:'/images/logo.png',
      userName:'hhan'
    }]
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
    }
  }
})
