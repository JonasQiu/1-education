// pages/components/orgDetail/info/info/info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cur:""
  },
  lifetimes: {
    attached(e) {
      this.setData({
        // [0]是调试数据，到时看是数组的第几个
        latitude: this.data.infoList[0].location.lat,
        longitude: this.data.infoList[0].location.lng,
        address: this.data.infoList[0].location.address,
        phone: this.data.infoList[0].info.phone,
        description: this.data.infoList[0].description,
        images: [...this.data.infoList[0].img.images1, ...this.data.infoList[0].img.images2]
      })
      // console.log(this.data.location, this.data.infoList)
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
          cur: "attention"
        })
      }
    },
    
  }
})