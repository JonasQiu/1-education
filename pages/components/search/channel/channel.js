// pages/components/search/channel/channel.js
const comOrg = require('../../../../utils/Org/getOrg')
const comType = require('../../../../utils/Type/Type')
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
    hotList: ['太原', '小学', '初中', '高中', '太', '原', '小', '学', '中'], //数据截取前10个
    historyList: [],
    // 有搜索内容
    TabCur: 0,
    scrollLeft: 0,
    searchList: [],
    showList: [],
    typeList: []
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
      wx.showLoading({
        title: '正在加载数据',
      })
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
        res = comType.deOrgTypeList(res)
        myData.typeList = ['全部', ...Object.keys(res)]
        myData.searchList = res
        myData.TabCur = 0
        myData.scrollLeft = (0 - 1) * 60
        myData.showList = that.getAll(myData.searchList)
        that.setData(myData)
        wx.hideLoading()
        return true
      }).catch(res => {
        wx.hideLoading()
        return false
      })
      return true
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
      this.changeTypeList(e.currentTarget.dataset.id)
    },
    getAll(searchList) {
      let list = []
      let objList = Object.keys(searchList)
      for (let i = 0; i < objList.length - 1; i++) {
        for (let j = 0; j < searchList[objList[i]].length; j++) {
          list.push(searchList[objList[i]][j])
        }
      }
      return list
    },
    changeTypeList(index) {
      console.log(index)
      let that = this;
      this.setData({
        TabCur: index,
        scrollLeft: (index - 1) * 60,
        showList: index == 0 ? that.getAll(that.data.searchList) : that.data.searchList[that.data.typeList[index]]
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
          showList: []
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
        this.setData({
          searchValue: e.currentTarget.dataset.value
        })
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