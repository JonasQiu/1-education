// pages/components/search/channel/haveContent/orgDetail/orgDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    org: {
      "comment": [],
      "description": "太原金桥双语学校是市教育局批准的全封闭寄宿制中学，校园环境优雅、景色宜人；师资力量雄厚、教学理念先进，人文及学术气氛浓厚，融合了“环球雅思”教育集团资源的双语特色，是山西省唯一实施国家级PDC青少年成长课程的基地。\n学校拥有一支善于思考、敢于创新、爱岗敬业的教师队伍。他们围绕“自主、合作、探究”的核心，因材施教，挖掘学生潜能；遵从规律、培养学习兴趣；关注心理，促进健康成长，为学生的未来发展奠定坚实基础。",
      "img": {
        "bgimg": "https://ossonline.197.com/202003/06/sns/sns_Cql0PTwADh0511KA1ZCHZ1.jpg",
        "images1": [
          "https://ossonline.197.com/202003/06/sns/sns_Cql0PTwADh0511KA1ZCHZ1.jpg",
          "https://ossonline.197.com/202003/06/sns/sns_dao0lLMiv10511KA1ZCZV8.jpg",
          "https://ossonline.197.com/202003/06/sns/sns_n026W7s8cQ0511KA1ZDITD.jpg",
          "https://ossonline.197.com/202003/06/sns/sns_0QoLzeOKAv0511KA1ZDNCR.jpg"
        ],
        "images2": [
          "https://ossonline.197.com/202003/06/sns1589170955000011253.jpg",
          "https://ossonline.197.com/202003/06/sns1589170979000011254.jpg",
          "https://ossonline.197.com/202003/06/sns1589170990000011255.jpg",
          "https://ossonline.197.com/202003/06/sns1589170996000011256.jpg"
        ]
      },
      "info": {
        "orgName": "金桥双语学校（小学）",
        "phone": "0351-2729193"
      },
      "location": {
        "address": "许坦东街40号",
        "lat": 22.536500464359964,
        "lng": 114.03130531311035
      },
      "orther": {
        "collectCount": 33,
        "readCount": 99
      },
      "phone": [
        "0351-2729193"
      ],
      "price": "",
      "review": "",
      "star": 4.7,
      "time": {
        "businessHours": "",
        "businessType": 1,
        "createTimes": 1589686348285
      },
      "type": "0"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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