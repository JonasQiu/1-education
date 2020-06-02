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
    historyList: [],
    // 有搜索内容
    TabCur: 0,
    scrollLeft: 0,
    searchList: []
  },
  attached() {
    var that = this;
    wx.getStorage({
      key: 'history_search',
      success: (res) => {
        that.setData({
          historyList: res.data,
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      fun_search(e);
    },
    fun_search(keyWord) {
      let that = this;
      comOrg.searchOrg(keyWord).then(res => {
        let myData = {}
        if (that.data.historyList.indexOf(keyWord) == -1) {
          that.data.historyList.push(keyWord)
          wx.setStorage({
            data: that.data.historyList,
            key: 'history_search',
          })
          myData.historyList = that.data.historyList
        }
        myData.searchList = res
        that.setData(myData)
        return true
      }).catch(res => {
        return false
      })
    },
    clearHistory(e) {
      this.setData({
        historyList: []
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
    getValue(e) {
      var that = this;
      if (that.data.timer) {
        clearTimeout(that.data.timer)
      }
      if (e.detail.value == "") {
        that.setData({
          searchList: []
        })
        return;
      }
      that.data.timer = setTimeout(function () {
        if (!that.fun_search(e.detail.value)) {
          that.setData({
            searchList: []
          })
        }
      }, 700)
    },
    addInfo(e) {
      if (e.currentTarget.dataset.value) {
        if (!this.fun_search(e.currentTarget.dataset.value)) {
          wx.showModal({
            title: '提示',
            content: "没有搜索到更多的内容",
            showCancel: false
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: "请输入您要搜索的内容",
          showCancel: false
        })
      }
    }
  }
})