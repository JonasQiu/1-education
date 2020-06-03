// pages/components/return/return.js
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
    // 返回键是否显示
    isShow: false
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
    backTo(e) {
      wx.navigateBack({
        delta: 1
      });
    },
  }
})