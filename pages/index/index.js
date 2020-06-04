//获取应用实例
const app = getApp()
let userInfo = {};

Page({
  data: {
    askNum: 20,
    PageCur: 'homePage',
    position: '英德',
    weather: '阴',
    degree: "26",
    hotSearch: "王后雄(满1000减100)"
  },

  // 底部导航切换
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  // 加载页面立刻执行
  onLoad: function () {}
})