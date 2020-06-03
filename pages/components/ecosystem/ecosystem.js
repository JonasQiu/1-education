// components/talk/talk.js
const comEco = require('../../../utils/Ecosystem/getPage')
const comUserToEco = require('../../../utils/User/UserToEco')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    navTop: wx.getSystemInfoSync().statusBarHeight,
    // 导航栏
    TabCur: 0,
    scrollLeft: 0,
    ecoNavList: ['推荐', '关注', '热帖', '搜索'],
    // 查找数据
    searchValue: '',
    goTop: 0,
    EcoList: [],
    navTop: wx.getSystemInfoSync().statusBarHeight,
    searchList: [],
  },
  attached() {
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
    this.loadData(0)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    sendLike(e) {
      var that = this;
      wx.showLoading({
        title: '请稍后…',
      })
      let index = e.currentTarget.dataset.myindex
      let p = that.data.EcoList[index].isLike ? comUserToEco.disLike(that.data.EcoList[index]._id) : comUserToEco.like(that.data.EcoList[index]._id)
      p.then(res => {
        this.loadData(that.data.TabCur)
      }).catch(res => {
        wx.hideLoading()
      })
    },
    loadData(index) {
      var that = this;
      wx.showLoading({
        title: '正在加载数据中…',
      })
      let p;
      switch (index) {
        case 0:
          p = comEco.getNewPageList(0, 10)
          break;
        case 1:
          p = comEco.getPageList(5, 5)
          break;
        case 2:
          p = comEco.getHotPageList(0, 10)
          break;
        case 3:
          that.setData({
            EcoList: that.data.searchList
          })
          wx.hideLoading()
          return;
      }
      p.then(res => {
        comEco.fixLikeUser(res.ecoList).then(res => {
          that.setData({
            EcoList: res
          })
          wx.hideLoading()
        })
      }).catch(res => {
        wx.showToast({
          title: '刷新失败！',
        })
      })
    },
    // 下滑触底操作
    lower(e) {
      // 刷新请求数据
      console.log(e)
    },

    // 导航栏
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      })
      this.loadData(e.currentTarget.dataset.id)
    },
    //搜索功能
    getValue(e) {
      var that = this;
      if (that.data.timer) {
        clearTimeout(that.data.timer)
      }
      if (e.detail.value == "") {
        return;
      }
      that.data.timer = setTimeout(function () {
        comEco.searchPage(e.detail.value).then(res => {
          if (res.length > 0) {
            that.setData({
              TabCur: 3,
              scrollLeft: (3 - 1) * 60,
              searchList: res,
              EcoList: res
            })
          }
        })
      }, 700)
    },
    // 详情页跳转，传递参数用户id
    naviToDetail(e) {
      wx.navigateTo({
        url: `/pages/components/ecoDetail/ecoDetail?ecoId=${e.currentTarget.dataset.ecoid}`,
      })
    },
    // 回到顶部
    goTop(e) {
      this.setData({
        goTop: 0
      })
    }
  }
})