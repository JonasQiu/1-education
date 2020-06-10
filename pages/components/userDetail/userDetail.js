const funBox = require("../../../utils/Func/FunBox")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: String
    }
  },
  attached(e) {
    funBox.getUserInfo(this.data.userId).then(res => {
      this.setData({
        userInfoObj: res
      })
      console.log(res)
    })
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})