// pages/components/search/channel/haveContent/orgDetail/orgDetail.js
const comOrg = require('../../../utils/Org/getOrg')
const comData = require('../../../utils/Org/getOrgDetailList')
const comUTO = require('../../../utils/User/UserToOrg')
const comUTU = require('../../../utils/User/UserToUser')

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
    active: []
  },
  // 
  attentionTap(e) {
    let that = this;
    if (!that.data.myUserInfo) {
      wx.showToast({
        'title': '请先登录'
      })
      return;
    }
    if (that.data.isLoaddingAttention) {
      wx.showToast({
        'title': '操作频繁'
      })
      return
    }
    that.data.isLoaddingAttention = true
    that.data.infoData[0].obj.isCollect = !that.data.infoData[0].obj.isCollect
    that.setData({
      infoData: that.data.infoData
    })
    let p = !that.data.infoData[0].obj.isCollect ? comUTO.Uncollect(that.data.infoData[0].obj._id) : comUTO.collect(that.data.infoData[0].obj._id)
    p.then(res => {
      that.data.isLoaddingAttention = false
      if (res.status != 0) {
        that.data.infoData[0].obj.isCollect = !that.data.infoData[0].obj.isCollect
        that.setData({
          infoData: that.data.infoData
        })
        wx.showToast({
          title: res.msg
        })
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
    if (that.data.myUserInfo._id == that.data.infoData[0].obj.userInfo._id) {
      wx.showToast({
        'title': '你不能关注自己'
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
    that.data.infoData[0].obj.userInfo.isMyFollow = !that.data.infoData[0].obj.userInfo.isMyFollow
    that.setData({
      infoData: that.data.infoData
    })
    let p = that.data.infoData[0].obj.userInfo.isMyFollow ? comUTU.follow(that.data.infoData[0].obj.userInfo._id) : comUTU.Unfollow(that.data.infoData[0].obj.userInfo._id)
    p.then(res => {
      that.data.isLoaddingCollect = false
      if (res.status != 0) {
        that.data.infoData[0].obj.userInfo.isMyFollow = !that.data.infoData[0].obj.userInfo.isMyFollow
        that.setData({
          infoData: that.data.infoData
        })
        wx.showToast({
          title: res.msg
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res.data);
        that.setData({
          myUserInfo: res.data
        })
      }
    })
    //得到一下传递的参数 
    comOrg.getOrg(options.query).then(async res => {
      // fixUser 根据该机构的userId字段获取完整宿主信息
      res.userInfo = await comOrg.fixUser(res)
      that.data.infoData[0].obj = res
      that.setData({
        infoData: that.data.infoData
      })
    }).catch(res => {
      wx.navigateBack()
    })
  }
})