const comOrg = require('../../../utils/Org/getOrg')
const comType = require("../../../utils/Type/Type")
const comCimg = require("../../../utils/Func/loadCimg")
const comLocation = require('../../../utils/Func/location')
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
    cardCur: 0,
    // 卡片列表
    orgAllList: [],
    orgList: [],
    orgReallyList: [],
    orgListStart: 0,
    orgListEnd: 5,
    orgListNum: 5,
    typeList: [],
    typeAllList: [],
    // 是否展示load组件
    isShowLoad: true
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
    comOrg.getOrgList(0, 115).then(async res => {

      for (let j = 0; j < res.orgList.length; j++) {
        // 得到2地的距离

        res.orgList[j].showStar = parseInt(res.orgList[j].star)
        // res.orgList[j].distance = await comLocation.getDistance(res.orgList[j].location.lat, res.orgList[j].location.lng)
      }
      // console.log(res.orgList[0].distance)
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
    })
    this.setData({
      HomePageInfo: comCimg.getHomePageSwiper()
    })
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
        orgListEnd: this.data.orgListEnd + this.data.orgListNum,
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
        orgReallyList: [],
        orgListStart: 0,
        orgListEnd: 5,
        TabCur: e.currentTarget.dataset.id,
        orgList: this.data.typeAllList[e.currentTarget.dataset.id],
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      this.touchBottom()
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  },
})