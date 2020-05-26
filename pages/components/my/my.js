// components/my/my.js
let commonLogin = require("../../../utils/User/Login")
Component({
  //  组件的属性列表
  properties: {

  },

  // 组件的初始数据
  data: {
    //登录部分
    userInfo: {},
    //关注 收藏 粉丝数部分
    attentionCount: 0,
    collectionCount: 0,
    fansCount: 0,
  },

  //组件初始化处理
  attached() {
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data,
        })
        that.numDH(0)
      }
    })
  },

  //  组件的方法列表
  methods: {
    numDH(i) {
      const that = this;
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            attentionCount: i,
            collectionCount: i,
            fansCount: i
          })
          that.numDH(i+1);
        }, 20)
      } else {
        that.setData({
          // 注释代码为真实生产环境运行代码，下方为测试代码
          // attentionCount: that.coutNum(that.data.userInfo.myFollow.length),
          // collectionCount: that.coutNum(that.data.userInfo.myCollection.length),
          // fansCount: that.coutNum(that.data.userInfo.myFans.length),
          attentionCount: that.coutNum(2000),
          collectionCount: that.coutNum(35000),
          fansCount: that.coutNum(450000),
        })
      }
    },
    //关注 收藏 粉丝数四舍五入到一位小数
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    //获取用户信息，进行登录处理
    onGetUserInfo(e) {
      wx.showLoading({
        title: '正在登录中…请稍后…',
      })
      const that = this;
      if (e.detail.userInfo) {
        commonLogin.Login(e.detail.userInfo).then(res => {
          that.setData({
            userInfo: res,
          })
          wx.hideLoading();
          that.numDH(0)
        })
      } else {
        wx.hideLoading();
        wx.showModal({
          title: "登录失败，请重新点击登录",
          content: "用户拒绝或取消授权登录",
          showCancel: false
        })
      }
      
    },
  }
})
