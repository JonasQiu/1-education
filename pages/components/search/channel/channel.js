// pages/components/search/channel/channel.js
const comOrg = require('../../../../utils/Org/getOrg')
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
    isShowContent: false,
    searchValue: "",
    haveContentList: [],
    // 没有搜索内容
    hotList: ['shuai', 'sad', 'asdasd', 'shuai', 'sad', 'asdasd', 'shuai', 'sad', 'asdasd'], //数据截取前10个
    showClear: false,
    historyList: ['shuai', 'sad', 'asdasd', 'shuai', 'sad', 'asdasd', 'shuai', 'sad', 'asdasd'],
    // 有搜索内容
    TabCur: 0,
    scrollLeft: 0,
    searchedList: [{
      src: '/images/logo.png',
      userName: 'hhan'
    }]
  },
  attached() {
    var that = this;

    if (that.data.historyList) {
      // historylist,后台请求数据进行渲染
      that.setData({
        showClear: true,
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getValue(e, value) {
      let that = this;
      if (that.timer) {
        clearTimeout(that.timer)
      }
      if (e.detail.value === '' && value == undefined) {
        this.setData({
          isShowContent: false
        })
      }
      this.setData({
        searchValue: e.detail.value || value || ''
      })
      that.timer = setTimeout(function () {
        if (e.detail.value != '') {
          that.search(e)
        }
      }, 700)
    },
    search(e) {
      if (this.data.searchValue !== "") {
        let that = this;
        comOrg.searchOrg(that.data.searchValue).then(res => {
          that.setData({
            isShowContent: true,
            //数据初始化
            searchList: res,
          })
        }).catch(res => {
          wx.showModal({
            title: '提示',
            content: "没有搜索到更多的内容",
            showCancel: false
          })
        })
      } else {
        wx.showModal({
          title: '提示',
          content: "请输入您要搜索的内容",
          showCancel: false
        })
      }
      // 根据searchValue，往云数据库发起请求,返回列表给haveContentList，然后往组件中传列表进行渲染
    },
    clearHistory(e) {
      this.setData({
        historyList: [],
        showClear: false
      })
      wx.showToast({
        title: '清除成功',
        icon: "success"
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    orgDetail(e) {
      wx.navigateTo({
        url: `/pages/components/orgDetail/orgDetail?query=${e.currentTarget.dataset.name}`,
      })
    },
    addInfo(e) {
      this.getValue(e, e.currentTarget.dataset.value)
      this.search(e)
    }
  }
})