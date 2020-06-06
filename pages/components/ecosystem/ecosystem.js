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
    searchList: [],
    starNum: 0,
  },
  created() {
    wx.showLoading({
      title: '正在加载数据...',
    })
  },
  ready() {
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
      if (!wx.getStorageSync('userInfo')) {
        wx.showToast({
          title: '请先登录好吧',
        })
        return
      }
      wx.showLoading({
        title: '请稍后…',
      })
      let index = e.currentTarget.dataset.myindex
      let p = that.data.EcoList[index].isLike ? comUserToEco.Unlike(that.data.EcoList[index]._id) : comUserToEco.like(that.data.EcoList[index]._id)
      p.then(res => {
        that.fun_search()
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
      // 根据传入的分页索引，加载不同的数据，将返回的promise保存到p变量
      switch (index) {
        case 0:
          // 推荐：获取最新的数据
          p = comEco.getNewPageList(that.data.starNum, Num)
          break;
        case 1:
          // 关注：暂时随便获取
          p = comEco.getPageList(that.data.starNum, Num)
          break;
        case 2:
          // 热帖：按点赞排行
          p = comEco.getHotPageList(that.data.starNum, Num)
          break;
        case 3:
          // 搜索：从Data中的searchList数组里面分页加载
          p = that.getSearchList(Num)
          break;
      }
      console.log('读取 ' + that.data.starNum + '~' + (that.data.starNum + Num))
      // 做统一处理
      p.then(async res => {
        // 因为搜索内容fix过了，所以不要再fix了，会报错，所以除了搜索之外的需要fix。fix就是完善数据
        res.ecoList = index == 3 ? res.ecoList : that.FixUserType(await comEco.fixLikeUser(res.ecoList))
        // 添加到原来的数组后面
        that.data.EcoList.push(...res.ecoList)
        that.setData({
          TabCur: index, // 数据获取到了再渲染页面
          scrollLeft: (index - 1) * 60,
          EcoList: that.data.EcoList,
          starNum: that.data.starNum + Num, // 将获取数据的开始指针向后移动
          isBottom: res.isBottom, // 判断是否到底了
          isLoading: false // 加载完毕，取消正在加载状态
        })
        wx.hideLoading()
      }).catch(res => {
        wx.showToast({
          title: '刷新失败！',
        })
      })
    },
    getSearchList(Num) {
      // 分页方式获取data里的searchList数组部分内容
      var that = this;
      return new Promise((resolve, reject) => {
        let isBottom, list = []
        if (!that.data.searchList || that.data.starNum >= that.data.searchList.length) {
          resolve({
            ecoList: [],
            isBottom: true
          })
        } else {
          if (Num + that.data.starNum >= that.data.searchList.length) {
            list = that.data.searchList.slice(that.data.starNum)
            isBottom = true
          } else {
            list = that.data.searchList.slice(that.data.starNum, that.data.starNum + Num)
            isBottom = false
          }
          resolve({
            ecoList: list,
            isBottom: isBottom
          })
        }
      })

    },
    // 导航栏
    tabSelect(e) {
      // 由于搜索页是要么没有要么提前获取了数据存到了searchList里面了，所以不需要提示
      if (e.currentTarget.dataset.id != 3) {
        wx.showLoading({
          title: '正在加载数据中…',
        })
      }
      this.loadData(e.currentTarget.dataset.id, 3, true)
    },
    // 下滑触底操作
    lower(e) {
      let that = this;
      // 防止重复加载
      if (that.data.isLoading || that.data.isBottom) {
        return
      }
      that.data.isLoading = true
      this.loadData(that.data.TabCur, 3, false)
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
        that.data.searchValue = e.detail.value
        that.fun_search()
      }, 700)
    },
    fun_search() {
      var that = this;
      comEco.searchPage(that.data.searchValue).then(async res => {
        that.data.searchList = that.FixUserType(await comEco.fixLikeUser(res))
        that.loadData(3, 3, true)
      })
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