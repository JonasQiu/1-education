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
    PageCur:"channel"
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
