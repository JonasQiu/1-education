const app = getApp();
const positionCity = require("../../../utils/Func/city")
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    isShow: false,
    allCityObj: {},
    hotCityArr: [],
    chooseCity: '上海市',
    // 搜索功能明天添加，刘海处理
    searchCity: ''
  },
  onLoad() {
    let that = this
    // 初始化城市列表
    this.setData({
      allCityObj: positionCity.all,
      hotCityArr: positionCity.hot
    })
    console.log(this.data.allCityObj)
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
    // 进入页面读取城市
    wx.getStorage({
      key: 'location',
      success(res) {
        that.setData({
          chooseCity: res.data.city
        })
      }
    })
  },
  onReady() {
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }

    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  // 选择城市
  chooseCity(e) {
    if (e.currentTarget.dataset.msg === 'hot') {
      wx.setStorage({
        data: {
          city: this.data.hotCityArr[e.currentTarget.dataset.id].fullname,
          location: this.data.hotCityArr[e.currentTarget.dataset.id].location
        },
        key: 'location',
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    } else if (e.currentTarget.dataset.msg === 'all') {
      wx.setStorage({
        data: {
          city: this.data.allCityObj[e.currentTarget.dataset.key][e.currentTarget.dataset.id].fullname,
          location: this.data.allCityObj[e.currentTarget.dataset.key][e.currentTarget.dataset.id].location
        },
        key: 'location',
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
});