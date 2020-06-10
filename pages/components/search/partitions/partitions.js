const comType = require('../../../../utils/Type/Type')
const comFunBox = require('../../../../utils/Func/FunBox')
Component({
  data: {
    TabCur: 0,
    list: [],
    load: true,
    goTop: 0,
  },
  attached() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    let typeList = []
    let objType = comType.getType()
    for (let key in objType) {
      let obj = {
        'id': key,
        'name': objType[key]['name'],
        'list': []
      }
      for (let key2 in objType[key]['list']) {
        obj['list'].push({
          'id': key2,
          'name': objType[key]['list'][key2]
        })
      }
      typeList.push(obj)
    }

    this.setData({
      list: typeList,
    })
    wx.hideLoading()
  },
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    // 回到顶部
    goTop(e) {
      this.setData({
        TabCur: 0,
        VerticalNavTop: 0,
        goTop: 0
      })
    },
    chooseType(e) {
      let that = this;
      wx.showLoading({
        title: '正在跳转',
      })
      comFunBox.TypeBox(e.currentTarget.dataset.typeid, e.currentTarget.dataset.typename).then(res => {
        that.triggerEvent('callchangetype', {
          usuallyData: res,
          isShowUsu: true
        })
        wx.hideLoading()
      }).catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '跳转失败！',
        })
      })
    },

  }
})