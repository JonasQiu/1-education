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
    scrollLeft: 0,
    PageCur: "channel",
    navTop: wx.getSystemInfoSync().statusBarHeight,
    isShowUsu: false,
    usuallyData: {
      typeIndex: 0,
      list: [],
      titleName: ""
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 导航栏选择
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        PageCur: e.currentTarget.dataset.cur
      })
    },
    changeType(obj) {
      if (obj.detail.usuallyData.list.length > 0) {
        this.setData(obj.detail)
      } else {
        wx.showToast({
          title: '暂无数据哦~',
        })
      }
    },
    showChange() {
      this.setData({
        isShowUsu: false
      })
    }
  }
})