// pages/components/search/channel/haveContent/orgDetail/orgDetail.js
const comOrg = require('../../../utils/Org/getOrg')
const comData = require('../../../utils/Org/getOrgDetailList')
const comUTO = require('../../../utils/User/UserToOrg')
const comUTU = require('../../../utils/User/UserToUser')
const comLocation = require('../../../utils/Func/location')
const comEco = require('../../../utils/Ecosystem/getPage')


Page({

  /**
   * 页面的初始数据
   */

  data: {
    TabCur: 0,
    infoData: [{
      // info组件数据
      nav: '机构信息',
      list: []
    }, {
      // lesson组件数据
      nav: '课程',
      list: comData.list_lesson
    }, {
      //teacher组件数据
      nav: '老师',
      list: comData.list_teacher
    }, {
      // active组件数据
      nav: '动态',
      list: [],
    }],
    lesson: [],
    teacher: [],
    active: [],
    isLoadData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
    that.loadData({
      detail: options.query
    })

  },
  loadData(e) {
    let orgId = e.detail
    let that = this
    wx.getLocation({
      success: (p) => {
        let {
          latitude,
          longitude
        } = p;
        // 机构信息
        comOrg.getOrg(orgId).then(async res => {
          // 👇 读取评论列表
          res = await comOrg.fixComments(res)
          // 👇 读取生态圈列表
          that.data.infoData[3].list = comEco.FixUserType(await comEco.fixLikeUser(await comEco.getEcoByOrg(orgId)))
          // 👇 读取距离信息
          res.location.distance = comLocation.getDistance(latitude, longitude, res.location.lat, res.location.lng)
          // 👇 展示星级信息
          res.star = res.star.toString().length == 1 ? res.star + '.0' : res.star
          res.showStar = parseInt(res.star)
          // 👇 获取我的信息，用来展示讨论区头像
          let userInfo = wx.getStorageSync('userInfo')
          that.data.infoData[0].obj = res

          let showData = {
            myUserInfo: {
              avatarUrl: '/image/logo.png'
            },
            infoData: that.data.infoData,
          }
          if (userInfo) {
            showData.myUserInfo = userInfo
          }
          showData.isLoadData = true
          that.setData(showData)
        }).catch(res => {
          // 异常报错
          console.log(res)
          wx.navigateBack()
        })
      },
      fail(res) {
        // 异常报错
        console.log(res)
        wx.navigateBack()
      }
    })

  },
  collectTap(e) {
    let that = this;
    if (!that.data.myUserInfo) {
      wx.showToast({
        'title': '请先登录'
      })
      return;
    }
    if (that.data.isLoaddingCollect) {
      wx.showToast({
        'title': '操作频繁'
      })
      return
    }
    that.data.isLoaddingCollect = true
    that.data.infoData[0].obj.isCollect = !that.data.infoData[0].obj.isCollect
    that.setData({
      infoData: that.data.infoData
    })
    let p = !that.data.infoData[0].obj.isCollect ? comUTO.Uncollect(that.data.infoData[0].obj._id) : comUTO.collect(that.data.infoData[0].obj._id)
    p.then(res => {
      that.data.isLoaddingCollect = false
      if (res.status != 0) {
        that.data.infoData[0].obj.isCollect = !that.data.infoData[0].obj.isCollect
        that.setData({
          infoData: that.data.infoData
        })
        wx.showToast({
          title: '操作失败！',
        })
      } else {
        wx.showToast({
          title: '操作成功！',
        })
      }
    }).catch(res => {
      wx.showToast({
        title: res
      })
    })
  },
  attentionTap(e) {
    let that = this;
    if (!that.data.myUserInfo) {
      wx.showToast({
        'title': '请先登录'
      })
      return;
    }
    if (that.data.myUserInfo._id == that.data.infoData[0].obj.userInfo._id) {
      wx.showToast({
        'title': '你不能关注自己'
      })
      return;
    }
    if (that.data.isLoaddingAttention) {
      wx.showToast({
        'title': '操作频繁'
      })
      return
    }
    // 正在读取数据
    that.data.isLoaddingAttention = true
    // 先将样式调整，再改变数据，用户体验无延迟
    that.data.infoData[0].obj.userInfo.isMyFollow = !that.data.infoData[0].obj.userInfo.isMyFollow
    that.setData({
      infoData: that.data.infoData
    })
    // 开始数据操作
    let p = !that.data.infoData[0].obj.userInfo.isMyFollow ? comUTU.Unfollow(that.data.infoData[0].obj.userInfo._id) : comUTU.follow(that.data.infoData[0].obj.userInfo._id)
    p.then(res => {
      that.data.isLoaddingAttention = false
      if (res.status != 0) {
        that.data.infoData[0].obj.userInfo.isMyFollow = !that.data.infoData[0].obj.userInfo.isMyFollow
        that.setData({
          infoData: that.data.infoData
        })
        wx.showToast({
          title: '操作失败！',
        })
      } else {
        wx.showToast({
          title: '操作成功！',
        })
      }
    })
  },
  // 导航栏active
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

})