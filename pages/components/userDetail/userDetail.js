const comFunUser = require("../../../utils/User/Fun_User")
const comType = require("../../../utils/Type/Type")
const comUTU = require("../../../utils/User/UserToUser")
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
    this.loadData()
  },
  /**
   * 组件的初始数据
   */
  data: {
    bye: false,
    Loading: {
      like: false,
      likeComment: false,
      collect: false,
      follow: false,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData() {
      comFunUser.getUserInfo(this.data.userId).then(res => {
        console.log(res);

        let showType = '普通用户'
        if (res.userType > 1) {
          showType = comType.getTypeName(res.type)
        }
        this.setData({
          userInfoObj: res,
          showType
        })
      })
    },
    follow() {
      let that = this;
      if (that.data.Loading.follow) {
        wx.showToast({
          title: '操作频繁',
        })
        return
      }
      let myUserInfo = wx.getStorageSync('userInfo')
      if (!myUserInfo) {
        wx.showToast({
          title: '请先登录好吧',
        })
        return
      }
      if (myUserInfo._id == that.data.userInfoObj._id) {
        wx.showToast({
          title: '你不能关注你自己',
        })
        return
      }
      that.data.Loading.follow = true;
      that.data.userInfoObj.isMyFollow = !that.data.userInfoObj.isMyFollow
      that.setData({
        userInfoObj: that.data.userInfoObj
      })
      let p = !that.data.userInfoObj.isMyFollow ? comUTU.Unfollow(that.data.userInfoObj._id) : comUTU.follow(that.data.userInfoObj._id)
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
        that.data.Loading.follow = false
        that.loadData()
      })
    },
    byebye() {
      let myUserInfo = wx.getStorageSync('userInfo')
      if (myUserInfo._id == that.data.userInfoObj._id) {
        wx.showToast({
          title: '你不能拉黑你自己',
        })
        return
      }
      this.setData({
        bye: !this.data.bye
      })
    },
    exit() {
      this.triggerEvent('callshowUserInfoFun')
    }
  }
})