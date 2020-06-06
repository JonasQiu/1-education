// components/ask/ask.js
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
    isShow: false
  },

  created() {
    wx.showLoading({
      title: '正在加载数据...',
    })
  },
  ready() {
    wx.hideLoading()
  },
  attached() {
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /*  回复我的、@我、系统通知、收到的赞 页面切换 */
    changePage(e) {
      wx.navigateTo({
        url: `/pages/components/ask/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
      })
    },

    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection == 'left') {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
  }
})