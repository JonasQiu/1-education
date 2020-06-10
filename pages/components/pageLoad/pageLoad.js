// pages/components/pageLoad/pageLoad.js
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

  },
  created() {
    wx.showLoading({
      title: '正在加载数据...',
    })
  },
  detached() {
    wx.hideLoading()
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})