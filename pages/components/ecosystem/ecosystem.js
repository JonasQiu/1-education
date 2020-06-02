// components/talk/talk.js
const comEco = require('../../../utils/Ecosystem/getPage')

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
    ecoNavList: ['推荐', '关注', '热帖', '官方'],
    recommendList: [],
    // 查找数据
    searchValue: '',
    // 点赞是否显示
    like: false,
    goTop: 0,
    EcoList: [],
    navTop: wx.getSystemInfoSync().statusBarHeight,
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
    loadData(index) {
      var that = this;
      wx.showLoading({
        title: '正在加载数据中…',
      })
      switch (index) {
        case 0:
          comEco.getPageList(0, 10).then(res => {
            that.setData({
              EcoList: res.ecoList
            })
          }).catch(res => {
            wx.showToast({
              title: '刷新失败！',
            })
          })
          break;
        case 1:
          comEco.getPageList(5, 5).then(res => {
            that.setData({
              EcoList: res.ecoList
            })
          }).catch(res => {
            wx.showToast({
              title: '刷新失败！',
            })
          })
          break;
        case 2:
          comEco.getHotPageList(0, 10).then(res => {
            that.setData({
              EcoList: res.ecoList
            })
          }).catch(res => {
            wx.showToast({
              title: '刷新失败！',
            })
          })
          break;
        case 3:
          comEco.getHotPageList(0, 5).then(res => {
            that.setData({
              EcoList: res.ecoList
            })
          }).catch(res => {
            wx.showToast({
              title: '刷新失败！',
            })
          })
          break;
      }
      wx.hideLoading()
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
      let that = this;
      console.log('value')
      if (that.timer) {
        clearTimeout(that.timer)
      }
      this.setData({
        searchValue: e.detail.value || ''
      })
      that.timer = setTimeout(function () {
        if (e.detail.value != '') {
          that.search(e)
        }
      }, 700)
    },
    search(e) {
      console.log('search')

      if (this.data.searchValue !== "") {
        // let that = this;
        // comOrg.searchOrg(that.data.searchValue).then(res => {
        //   that.setData({
        //     //数据初始化
        //     searchList: res,
        //   })
        // }).catch(res => {
        //   wx.showModal({
        //     title: '提示',
        //     content: "没有搜索到更多的内容",
        //     showCancel: false
        //   })
        // })
      } else {
        wx.showModal({
          title: '提示',
          content: "请输入您要搜索的内容",
          showCancel: false
        })
      }
      // 根据searchValue，往云数据库发起请求,返回列表给haveContentList，然后往组件中传列表进行渲染
    },
    // 详情页跳转，传递参数用户id
    naviToDetail(e) {
      wx.navigateTo({
        url: `/pages/components/ecoDetail/ecoDetail?query=${e.currentTarget.dataset.query}`,
      })
    },
    //点赞功能
    addLike(e) {
      this.setData({
        like: !this.data.like
      })
      // 数据传递
    },
    // 回到顶部
    goTop(e) {
      this.setData({
        goTop: 0
      })
    }
  }
})