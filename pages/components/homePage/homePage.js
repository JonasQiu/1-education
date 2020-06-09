// components/homePage/homePage.js
const comOrg = require('../../../utils/Org/getOrg')
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
    orgListStart: 0,
    orgListEnd: 5,   
    orgListNum: 5,
    typeList: ["全部", "设计", "硬件研发", "外语", "移动开发", "认证考试", "电商平台", "学校", "财会金融", "音乐舞蹈", "互联网产品"]
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
    comOrg.getOrgList(0, 115).then(res => {
      this.setData({
        orgAllList: res.orgList
      })
      this.touchBottom()
      // 存储到缓存中，方便下次加载
      // 下拉刷新列表，一次push加载6条,然后其他nav选项根据type来筛选list
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
      this.data.orgList.push(...this.data.orgAllList.slice(this.data.orgListStart, this.data.orgListEnd))
      this.setData({
        orgList: this.data.orgList,
        orgListStart: this.data.orgListStart + this.data.orgListNum,
        orgListEnd: this.data.orgListEnd + this.data.orgListNum
      })
      console.log(this.data.orgList)
      if (this.data.orgList.length == this.data.orgAllList.length) {
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

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
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