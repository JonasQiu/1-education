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
  lifetimes: {
    ready(e) {
      console.log("ready", this.data.infoList)
      this.setData({
        // [0]是调试数据，到时看是数组的第几个
        latitude: this.data.infoList.location.lat,
        longitude: this.data.infoList.location.lng,
        address: this.data.infoList.location.address,
        phone: this.data.infoList.info.phone,
        description: this.data.infoList.description,
        images: [...this.data.infoList.img.images1, ...this.data.infoList.img.images2]
      })
      console.log(this.data.location, this.data.infoList)
    },
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
        url: `/pages/components/map/map?latitude:${this.data.latitude}&longitude:${this.data.longitude}&showNav:${e.currentTarget.dataset.nav}`
      })
    },
    callPhone(e) {
      wx.makePhoneCall({
        phoneNumber: this.data.phone,
      })
    }
  }
})