// components/talk/talk.js
const comEco = require('../../../utils/Ecosystem/getPage')
const comUserToEco = require('../../../utils/User/UserToEco')
const comType = require('../../../utils/Type/Type')

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
    searchLisst: [],
    starNum: 0,
  },
  attached() {
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
    this.loadData(0, 3)
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
        this.loadData(that.data.TabCur, that.data.starNum, true)
      }).catch(res => {
        wx.hideLoading()
      })
    },
    loadData(index, Num, reload) {
      var that = this;
      let p;
      // 判断是否换了个分类，换了分类则从第一个数据开始读取
      if ((that.data.TabCur != index) || reload) {
        that.data.starNum = 0
        that.data.EcoList = []
      }
      console.log('读取 ' + that.data.starNum + '~' + (that.data.starNum + Num))
      switch (index) {
        case 0:
          p = comEco.getNewPageList(that.data.starNum, Num)
          break;
        case 1:
          p = comEco.getPageList(that.data.starNum, Num)
          break;
        case 2:
          p = comEco.getHotPageList(that.data.starNum, Num)
          break;
        case 3:
          that.setData({
            TabCur: index,
            scrollLeft: (index - 1) * 60,
            EcoList: that.data.searchList || []
          })
          return;
      }
      p.then(res => {
        comEco.fixLikeUser(res.ecoList).then(res_ecoList => {
          res.ecoList = that.FixUserType(res_ecoList)
          that.data.EcoList.push(...res.ecoList)
          that.setData({
            TabCur: index,
            scrollLeft: (index - 1) * 60,
            EcoList: that.data.EcoList,
            starNum: that.data.starNum + Num,
            isBottom: res.isBottom,
          })
          wx.hideLoading()
          that.data.isLoading = false
        })
      }).catch(res => {
        wx.showToast({
          title: '刷新失败！',
        })
      })
    },
    // 下滑触底操作
    lower(e) {
      let that = this;
      if (that.data.isLoading || that.data.TabCur == 3) {
        return
      }
      that.data.isLoading = true
      if (that.data.isBottom) {
        console.log('到底了')
      } else {
        this.loadData(that.data.TabCur, 3, false)
      }
    },

    // 导航栏
    tabSelect(e) {
      if (e.currentTarget.dataset.id != 3) {
        wx.showLoading({
          title: '正在加载数据中…',
        })
      }
      this.data.isLoading = false
      this.loadData(e.currentTarget.dataset.id, 3, true)
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
          comEco.fixLikeUser(res).then(res => {
            if (res.length > 0) {
              res = that.FixUserType(res)
              that.setData({
                TabCur: 3,
                scrollLeft: (3 - 1) * 60,
                searchList: res,
                EcoList: res
              })
            }
          })
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
    },
    FixUserType(ecoList) {
      let UserTypeList = ['普通用户', '专业人士', '机构', '官方']
      let index;
      for (let i = 0; i < ecoList.length; i++) {
        index = ecoList[i].userInfo.userType - 1
        ecoList[i].userInfo.fixUserType = UserTypeList[index]
        if (index in [1, 2]) {
          ecoList[i].userInfo.fixUserType = comType.getTypeName(ecoList[i].userInfo.type) + ' ' + ecoList[i].userInfo.fixUserType
        }
      }
      return ecoList;
    }
  }
})