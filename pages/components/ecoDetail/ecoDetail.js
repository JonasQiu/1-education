// pages/ecoDetail/ecoDetail.js
const comEco = require('../../../utils/Ecosystem/getPage')
Page({
  /**
   * 页面的初始数据
   */
  timer: null,
  data: {
    // 底部导航
    tabbarList: [{
      name: 'cuIcon-appreciate',
      event: ""
    }, {
      name: 'cuIcon-community',
      event: "commentNavi"
    }, {
      name: 'cuIcon-add',
      event: ""
    }, {
      name: 'cuIcon-share',
      event: ""
    }],
    // 内容list
    recommendList: {},
    swiperList: [],
    // 机构信息
    ecoObj: {},
    // 动画
    toggleDelay: false,
    commentHeight: 0,
    isAppre: true,
  },
  toggleDelay(that) {
    clearTimeout(that.timer)
    that.timer = setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 3000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 机构信息
    comEco.getPage(options.ecoId).then(async res => {
      // 👇 读取点赞列表
      res = (await comEco.fixLikeUser([res]))[0]
      res.likes = res.likes.length > 5 ? res.likes.slice(0, 5) : res.likes
      this.setData({
        swiperList: res.cimg || res.orgInfo.cimg || [res.userInfo.avatarUrl],
        ecoObj: res,
        toggleDelay: true,
      })
      this.toggleDelay(this)
    }).catch(res => {
      // 异常报错
      console.log(res)
    })

    // 得到评论区块距离顶部的高度
    wx.createSelectorQuery().select('.comment').boundingClientRect(function (res) {
      that.setData({
        commentHeight: res.top
      })

    }).exec();

  },
  commentNavi() {
    wx.pageScrollTo({
      scrollTop: this.data.commentHeight,
      selector: '.comment'
    })
  },
  appreciate() {
    this.setData({
      isAppre: !this.data.isAppre
    })
    // 获取点赞数，和提交点赞人的信息
  },
  // 更多点赞人
  moreAppre() {
    wx.navigateTo({
      url: './appreciateList/appreciateList',
    })
    wx.setStorage({
      data: this.data.ecoObj,
      key: 'appreciateList',
    })
  },
  //点击后，图片进行预览
  showImg(e) {
    wx.previewImage({
      current: this.data.swiperList[e.currentTarget.dataset.imgindex],
      urls: this.data.swiperList
    })
  },
})