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
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 机构信息
    comEco.getPage(options.ecoId).then(res => {
      this.setData({
        swiperList: res.cimg || res.orgInfo.cimg || [res.userInfo.avatarUrl],
        ecoObj: res
      })
    }).catch(res => {
      // 异常报错
      console.log(res)
    })
    
  },
  //点击后，图片进行预览
  showImg(e) {
    wx.previewImage({
      current: this.data.swiperList[e.currentTarget.dataset.imgindex],
      urls: this.data.swiperList
    })
  },
})