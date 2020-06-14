// pages/components/orgDetail/info/info/info.js
const comEco = require('../../../../utils/Ecosystem/getPage')
const comLocation = require('../../../../utils/Func/location')
const comUTO = require('../../../../utils/User/UserToOrg')
const comUTU = require('../../../../utils/User/UserToUser')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoObj: {
      type: Object
    },
    myUserInfo: {
      type: Object
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
    sendUserComment(e) {
      let that = this;
      if (e.detail.value == "") {
        wx.showToast({
          title: '提交评论内容不能为空哦',
        })
      } else {
        if (!wx.getStorageSync('userInfo')._id) {
          wx.showToast({
            title: '请先登录好吧',
          })
          return
        }
        wx.showLoading({
          title: '正在提交中…',
        })
        comUTO.setComment(that.data.infoObj._id, e.detail.value).then(res => {
          if (res.status == 0) {
            wx.showToast({
              title: '发表成功',
            })
            that.triggerEvent('callLoadData', that.data.infoObj._id)
          } else {
            wx.showToast({
              title: '发表失败',
            })
          }
        }).catch(res => {
          wx.showToast({
            title: '发表失败',
          })
          wx.hideToast()
        })
      }
    },
    sendLikeComment(e) {
      let index = e.currentTarget.dataset.myindex
      var that = this;
      if (that.data.Loading.likeComment) {
        wx.showToast({
          title: '操作频繁',
        })
        return
      }
      if (!wx.getStorageSync('userInfo')._id) {
        wx.showToast({
          title: '请先登录好吧',
        })
        return
      }
      that.data.Loading.likeComment = true;
      that.data.infoObj.comment[index].likeNum += that.data.infoObj.comment[index].isMyLike ? -1 : 1
      that.data.infoObj.comment[index].isMyLike = !that.data.infoObj.comment[index].isMyLike
      that.setData({
        infoObj: that.data.infoObj
      })
      let p = !that.data.infoObj.comment[index].isMyLike ? comUTO.disLikeComment(that.data.infoObj._id, that.data.infoObj.comment[index].Id) : comUTO.likeComment(that.data.infoObj._id, that.data.infoObj.comment[index].Id)
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
        that.data.Loading.likeComment = false
        that.triggerEvent('callLoadData', that.data.infoObj._id)
      }).catch(res => {
        wx.hideLoading()
      })
    },
    showImg(e) {
      wx.previewImage({
        urls: this.data.infoObj.cimg.orgImg,
        current: this.data.infoObj.cimg.orgImg[e.currentTarget.dataset.imgindex]
      })
    },
    lookMap(e) {
      //传终点的纬度经度的参数过去，通过onload获得,showNav判断到达的页面是否，yes进行导航的功能还是no只是展示地图
      wx.navigateTo({
        url: `/pages/components/map/map?latitude=${e.currentTarget.dataset.latitude}&longitude=${e.currentTarget.dataset.longitude}`
      })
    },
    callPhone(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phonenum,
      })
    }
  }
})