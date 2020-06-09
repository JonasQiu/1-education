const comOrg = require('../../../utils/Org/getOrg')
const comType = require("../../../utils/Type/Type")

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
    position: '英德',
    weather: '阴',
    degree: "26",
    hotSearch: "王后雄(满1000减100)",
    TabCur: 0,
    scrollLeft: 0,
    // box的列表
    boxList: [{
      src: 'cuIcon-scan',
      name: '扫一扫',
      event: 'scanCode'
    }, {
      src: 'cuIcon-barcode',
      name: '付款码'
    }, {
      src: 'cuIcon-present',
      name: '活动'
    }, {
      src: 'cuIcon-redpacket',
      name: '红包/卡卷'
    }],
    // 宫格列表——第一导航
    FunList: [{
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/小学.png",
      name: '小学'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/初中.png",
      name: '初中'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/高中fix.png",
      name: '高中'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/考研培训fix.png",
      name: '考研培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/职场培训.png",
      name: '职场培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/兴趣培养.png",
      name: '兴趣培养'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/竞赛培训.png",
      name: '竞赛培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/心理咨询.png",
      name: '心理咨询'
    }],
    // 轮播图列表
    cardCur: 0,
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
    // 卡片列表
    orgAllList: [],
    orgList: [],
    orgReallyList: [],
    orgListStart: 0,
    orgListEnd: 5,
    orgListNum: 5,
    typeList: [],
    typeAllList: []
  },
  created() {
    wx.showLoading({
      title: '正在加载数据...',
    })
  },
  ready() {
    wx.hideLoading()
  },
  attached(e) {
    let that = this
    // 进入页面读取城市
    wx.getStorage({
      key: 'location',
      success(res) {
        that.setData({
          position: res.data.city
        })
      }
    })
    // 得到全部组织list
    comOrg.getOrgList(0, 115).then(res => {
      this.setData({
        orgAllList: res.orgList
      })
      // 得到不同类的组织list
      const typeAllListObj = {
        "全部": this.data.orgAllList,
        ...comType.deOrgTypeList(this.data.orgAllList)
      }
      for (let prop in typeAllListObj) {
        this.data.typeAllList.push(typeAllListObj[prop])
      }
      this.setData({
        typeList: Object.keys(typeAllListObj),
        typeAllList: this.data.typeAllList
      })
      this.setData({
        orgList: this.data.typeAllList[0]
      })
      this.touchBottom()
    }).catch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 
    // card列表事件
    // 触底事件
    touchBottom(e) {
      this.data.orgReallyList.push(...this.data.orgList.slice(this.data.orgListStart, this.data.orgListEnd))
      this.setData({
        orgReallyList: this.data.orgReallyList,
        orgListStart: this.data.orgListStart + this.data.orgListNum,
        orgListEnd: this.data.orgListEnd + this.data.orgListNum
      })
      if (this.data.orgList.length == this.data.orgReallyList.length) {
        wx.showToast({
          title: '数据已加载完毕',
        })
      }
    },
    orgDetail(e) {
      wx.navigateTo({
        url: `/pages/components/orgDetail/orgDetail?query=${e.currentTarget.dataset.name}`,
      })
    },
    // 扫码
    scanCode(e) {
      wx.scanCode({
        success(res) {
          console.log(res.result)
        }
      })
    },
    // 定位跳转
    positionTem() {
      wx.navigateTo({
        url: '/pages/components/position/position',
      })
    },
    // 顶部搜索跳转
    topSearch() {
      wx.navigateTo({
        url: '/pages/components/search/search',
      })
    },
    // 卡片导航选择
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        orgList: this.data.typeAllList[e.currentTarget.dataset.id],
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  },
})