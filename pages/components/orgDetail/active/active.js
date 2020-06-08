// pages/components/orgDetail/active/active.js
const comUserToEco = require('../../../../utils/User/UserToEco')


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    Loading: {
      like: false,
      likeComment: false,
      collect: false,
      follow: false,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendLike(e) {
      let index = e.currentTarget.dataset.myindex
      var that = this;
      if (that.data.Loading.like) {
        wx.showToast({
          title: '操作频繁',
        })
        return
      }
      if (!wx.getStorageSync('userInfo')) {
        wx.showToast({
          title: '请先登录好吧',
        })
        return
      }
      that.data.Loading.like = true;
      that.data.activeList[index].isLike = !that.data.activeList[index].isLike
      that.setData({
        activeList: that.data.activeList
      })
      let p = !that.data.activeList[index].isLike ? comUserToEco.Unlike(that.data.activeList[index]._id) : comUserToEco.like(that.data.activeList[index]._id)
      p.then(res => {
        if (res.status != 0) {
          wx.showToast({
            title: '操作失败！',
          })
        } else {
          wx.showToast({
            title: '操作成功！',
          })
        }
        that.data.Loading.like = false
        that.triggerEvent('callLoadData', that.data.infoObj._id)
      }).catch(res => {
        wx.hideLoading()
      })
    },
    // 详情页跳转，传递参数用户id
    naviToDetail(e) {
      wx.navigateTo({
        url: `/pages/components/ecoDetail/ecoDetail?ecoId=${e.currentTarget.dataset.ecoid}`,
      })
    },
  }
})