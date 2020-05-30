// pages/components/orgDetail/info/info/info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoList: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cur: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    attentionTap(e) {
      if (this.data.cur === '') {
        this.setData({
          cur: "attention"
        })
      } else {
        this.setData({
          cur: ""
        })
      }
    },
    lookMap(e) {
      //传终点的纬度经度的参数过去，通过onload获得,showNav判断到达的页面是否，yes进行导航的功能还是no只是展示地图
      wx.navigateTo({
        url: `/pages/components/map/map?latitude:${e.currentTarget.dataset.latitude}&longitude:${e.currentTarget.dataset.longitude}&showNav:${e.currentTarget.dataset.nav}`
      })
    },
    callPhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phoneNum,
      })
    }
  }
})