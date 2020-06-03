// pages/ecoDetail/ecoDetail.js
const comEco = require('../../../utils/Ecosystem/getPage')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 底部导航
    tabbarList: ['cuIcon-appreciate', 'cuIcon-community', 'cuIcon-favor', 'cuIcon-share'],
    // 内容list
    recommendList: {},
    swiperList: [],
    // 机构信息
    ecoObj: {},
    // 返回键是否显示
    isShow: false
  },
  backTo(e) {
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 机构信息
    comEco.getPage(options.ecoId).then(res => {
      console.log(res)
      console.log(res.cimg || res.orgInfo.cimg)

      this.setData({
        swiperList: res.cimg || res.orgInfo.cimg || [res.userInfo.avatarUrl],
        ecoObj: res
      })
    }).catch(res => {
      // 异常报错
      console.log(res)
    })
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
  },
  showImg(e) {
    wx.previewImage({
      current: this.data.swiperList[e.currentTarget.dataset.imgindex],
      urls: this.data.swiperList
    })
  },
  methods: {

  }
})