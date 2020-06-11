// pages/ecoDetail/ecoDetail.js
const comEco = require('../../../utils/Ecosystem/getPage')
const comLocation = require('../../../utils/Func/location')
const comUTE = require('../../../utils/User/UserToEco')
const comUTO = require('../../../utils/User/UserToOrg')
const comUTU = require('../../../utils/User/UserToUser')

Page({
  /**
   * 页面的初始数据
   */
  timer: null,
  data: {
    // 底部导航
    tabbarList: [{
      name: 'cuIcon-appreciate',
      event: "appreciate"
    }, {
      name: 'cuIcon-community',
      event: "commentNavi"
    }, {
      name: 'cuIcon-add',
      event: "setFollow"
    }, {
      name: 'cuIcon-share',
      event: "share",
    }],
    // 内容list
    recommendList: {},
    swiperList: [],
    // 机构信息
    ecoObj: {},
    // 动画
    toggleDelay: false,
    commentHeight: 0,
    commentValue: '',
    isAppre: true,
    showUserInfo: false,
    Loading: {
      like: false,
      likeComment: false,
      collect: false,
      follow: false,
    },
    scrollTop: 0,
    isShowUsu: false,
    usuallyData: {
      typeIndex: 0,
      list: [],
      titleName: ""
    },
  },
  toggleDelay(that) {
    clearTimeout(that.timer)
    that.timer = setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
      wx.hideToast()
    }, 3000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.loadData(options.ecoId, true)
    // 得到评论区块距离顶部的高度
    wx.createSelectorQuery().select('.comment').boundingClientRect(function (res) {
      that.setData({
        commentHeight: res.top
      })
    }).exec();

  },
  // 展示更多点赞
  showLikeList() {
    let that = this;
    that.setData({
      usuallyData: {
        typeIndex: 0,
        list: that.data.ecoObj.likeIdList,
        titleName: "点赞的人"
      },
      isShowUsu: !that.data.isShowUsu
    })
  },
  // 展示用户信息详情列表
  showUserInfoFun() {
    let that = this;
    that.setData({
      showUserInfo: that.data.showUserInfo ? '' : that.data.ecoObj.userInfo
    })
  },
  onShareAppMessage(options) {
    this.onShareAppMessage()
  },
  loadData(ecoId, reSet) {
    let that = this
    if (reSet) {
      wx.showLoading({
        title: '正在加载中',
      })
    }
    // 机构信息
    comEco.getPage(ecoId).then(async res => {
      // 👇 读取点赞列表
      res.likeIdList = [...res.likes]
      res = (await comEco.fixLikeUser([res]))[0]
      // 👇 读取评论列表
      res = await comEco.fixComments(res)
      // 👇 读取距离信息
      res.orgInfo.distance = await comLocation.getDistance(res.orgInfo.location.lat, res.orgInfo.location.lng)
      // 👇 展示星级信息
      res.orgInfo.showStar = parseInt(res.orgInfo.star)
      // 👇 展示前五个点赞用户信息
      res.likes = res.likes.length > 5 ? res.likes.slice(0, 5) : res.likes
      // 👇 获取我的信息，用来展示讨论区头像
      let userInfo = wx.getStorageSync('userInfo')
      let showData = {
        myAvatar: userInfo ? userInfo.avatarUrl : 'cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/用户.png',
        swiperList: res.cimg || res.orgInfo.cimg || [res.userInfo.avatarUrl],
        ecoObj: res,
      }
      console.log(res)
      if (reSet) {
        showData.toggleDelay = true
        that.toggleDelay(that)
      }
      showData.tabbarList = [{
        name: res.isLike ? 'cuIcon-appreciatefill' : 'cuIcon-appreciate',
        event: "appreciate"
      }, {
        name: 'cuIcon-community',
        event: "commentNavi"
      }, {
        name: 'cuIcon-add',
        event: "setFollow"
      }, {
        name: 'cuIcon-share',
        event: "share"
      }]
      that.setData(showData)
      wx.hideLoading()
      wx.hideToast()
    }).catch(res => {
      // 异常报错
      console.log(res)
    })
  },
  commentNavi() {
    this.setData({
      scrollTop: this.data.commentHeight,
    })
  },

  //分享
  share() {
    this.onShareAppMessage()
  },
  //点击后，图片进行预览
  showImg(e) {
    wx.previewImage({
      current: this.data.swiperList[e.currentTarget.dataset.imgindex],
      urls: this.data.swiperList
    })
  },
  // 点赞文章
  appreciate() {
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
    that.data.ecoObj.likeNum += that.data.ecoObj.isLike ? -1 : 1
    that.data.ecoObj.isLike = !that.data.ecoObj.isLike
    let showData = {}
    showData.ecoObj = that.data.ecoObj
    that.data.tabbarList[0].name = that.data.tabbarList[0].name != 'cuIcon-appreciate' ? 'cuIcon-appreciate' : 'cuIcon-appreciatefill'
    showData.tabbarList = that.data.tabbarList
    that.setData(showData)
    let p = !that.data.ecoObj.isLike ? comUTE.Unlike(that.data.ecoObj._id) : comUTE.like(that.data.ecoObj._id)
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
      that.loadData(that.data.ecoObj._id, false)
    }).catch(res => {
      wx.hideLoading()
    })
  },
  // 收藏机构
  setCollect() {
    var that = this;
    if (that.data.Loading.collect) {
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
    that.data.Loading.collect = true;
    that.data.ecoObj.orgInfo.isCollect = !that.data.ecoObj.orgInfo.isCollect
    that.setData({
      ecoObj: that.data.ecoObj
    })
    let p = !that.data.ecoObj.orgInfo.isCollect ? comUTO.Uncollect(that.data.ecoObj.orgInfo._id) : comUTO.collect(that.data.ecoObj.orgInfo._id)
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
      that.data.Loading.collect = false
      that.loadData(that.data.ecoObj._id, false)
    }).catch(res => {
      wx.hideLoading()
    })
  },
  // 关注用户
  setFollow() {
    var that = this;
    if (that.data.Loading.follow) {
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
    that.data.Loading.follow = true;
    that.data.ecoObj.userInfo.isMyFollow = !that.data.ecoObj.userInfo.isMyFollow
    that.setData({
      ecoObj: that.data.ecoObj
    })
    let p = !that.data.ecoObj.userInfo.isMyFollow ? comUTU.Unfollow(that.data.ecoObj.userInfo._id) : comUTU.follow(that.data.ecoObj.userInfo._id)
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
      that.loadData(that.data.ecoObj._id, false)
    }).catch(res => {
      wx.hideLoading()
    })
  },
  // 点赞评论或者取消点赞
  sendLikeComment(e) {
    let index = e.currentTarget.dataset.myindex
    var that = this;
    if (that.data.Loading.likeComment) {
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
    that.data.Loading.likeComment = true;
    that.data.ecoObj.comments[index].likeNum += that.data.ecoObj.comments[index].isMyLike ? -1 : 1
    that.data.ecoObj.comments[index].isMyLike = !that.data.ecoObj.comments[index].isMyLike
    that.setData({
      ecoObj: that.data.ecoObj
    })
    let p = !that.data.ecoObj.comments[index].isMyLike ? comUTE.disLikeComment(that.data.ecoObj._id, that.data.ecoObj.comments[index].Id) : comUTE.likeComment(that.data.ecoObj._id, that.data.ecoObj.comments[index].Id)
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
      that.loadData(that.data.ecoObj._id, false)
    }).catch(res => {
      wx.hideLoading()
    })
  },
  // 发表评论
  sendUserComment(e) {
    let that = this;
    if (e.detail.value == "") {
      wx.showToast({
        title: '提交评论内容不能为空哦',
      })
    } else {
      wx.showLoading({
        title: '正在提交中…',
      })
      that.setData({
        commentValue: ''
      })
      comUTE.setComment(that.data.ecoObj._id, e.detail.value).then(res => {
        if (res.status == 0) {
          wx.showToast({
            title: '发表成功',
          })
          that.loadData(that.data.ecoObj._id, false)
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
  goOrgDetail() {
    wx.navigateTo({
      url: `/pages/components/orgDetail/orgDetail?query=${this.data.ecoObj.orgInfo._id}`,
    })
  }
})