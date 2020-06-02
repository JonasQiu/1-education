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
    recommendList: {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n——————————————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      },
      "name": '刘海弟弟'
    },
    // 机构信息
    orgObj: {},
    // 轮播图图片
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
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
    comEco.getPage('gAxZc41UjAdVRFK6aMAcuIjCtvp9G3kQBpnUqzQgNwvXqZWn').then(res => {
      this.setData({
        orgObj: res
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})