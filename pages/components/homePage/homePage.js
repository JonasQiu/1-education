const comOrg = require('../../../utils/Org/getOrg')
const comType = require("../../../utils/Type/Type")
const comLocation = require('../../../utils/Func/location')
const comFunBox = require('../../../utils/Func/FunBox')

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
    isShowUsu: false,
    usuallyData: {
      typeIndex: 0,
      list: [],
      titleName: ""
    },
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
    swiperUrl: [
      'GmiGh0pi9YDKSyyLLdE2gDv272h6WhapVbRMb5rtgw2DGilT',
      'rM0lK6iLHhbeCzw7116x4jJ7DvKeZ3VIOh0m6dT42Ti0boJY',
      'yiaBwBryu3PielTDe5ttCwu114RXjCu036TOulNLZT5TOIDr',
      '6z1VYcMXS3Dh5yE0VKWaTgC55C4ol6y5e31KQYILWMPhlA0p',
      'A5Qx5zWex0zvSaJjkWCZAK1stwsk9KiYGokwdt4kLngkStS8',
      '5OKpkLYLGlwrUw3ZjVYpwFF6vTrOhqCOiKUxeEEdo7qUvh5x',
    ],
    toggleDelay: false,
    interestShow: false,
    interestlist: [],
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
    if (!wx.getStorageSync('isFrist')) {
      // 感兴趣分类的显示
      const type = comType.getType()
      const interestlist = []
      const color = ['red', 'orange', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve']
      let z = 0;
      for (let key in type) {
        interestlist.push({
          id: key,
          name: type[key].name,
          color: color[z++ % 8],
          isChoose: false
        })
      }
      if (interestlist.length % 2 != 0) {
        interestlist.pop()
      }
      if (!wx.getStorageSync('isFrist')) {
        this.setData({
          interestShow: true,
          toggleDelay: true,
          interestlist: interestlist
        })
      }
      this.toggleDelay(this)
    } else {
      this.showOrgTypeList()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showOrgTypeList() {
      let that = this
      // 得到轮播图和8个icon的信息
      wx.getStorage({
        key: 'homePageData',
        success(res) {
          const resOrgList = res.data.allList
          that.setData({
            HomePageInfo: res.data.HomePageInfo,
            orgAllList: resOrgList
          })
          // 得到不同类的组织list
          const typeAllListObj = {
            "全部": that.data.orgAllList,
            ...comType.deOrgTypeList(that.data.orgAllList)
          }
          for (let prop in typeAllListObj) {
            that.data.typeAllList.push(typeAllListObj[prop])
          }
          that.setData({
            typeList: Object.keys(typeAllListObj),
            typeAllList: that.data.typeAllList
          })
          that.setData({
            orgList: that.data.typeAllList[0],
            toggleDelay: true
          })
          that.toggleDelay(that)
          that.touchBottom()
        }
      })
    },
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
    // 从上而下一个个展示数据
    toggleDelay(that) {
      clearTimeout(that.timer)
      that.timer = setTimeout(function () {
        that.setData({
          toggleDelay: false
        })
      }, 3000)
    },
    // 感兴趣的分类选择隐藏
    exit(e) {
      this.setData({
        interestShow: false
      })
      wx.setStorage({
        data: true,
        key: 'isFrist',
      })
      this.showOrgTypeList()
    },
    // 感兴趣的分类的选择分选
    chooseClassActive(e) {
      let index = e.currentTarget.dataset.myindex
      this.data.interestlist[index].isChoose = !this.data.interestlist[index].isChoose
      this.setData({
        interestlist: this.data.interestlist,
      })
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
      this.data.orgReallyList = []
      this.setData({
        toggleDelay: false
      })
      this.setData({
        orgListStart: 0,
        orgListEnd: 5,
        TabCur: e.currentTarget.dataset.id,
        orgList: this.data.typeAllList[e.currentTarget.dataset.id],
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
        toggleDelay: true
      })
      this.toggleDelay(this)
      this.touchBottom()
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    swiperToOrg(e) {
      wx.navigateTo({
        url: `/pages/components/orgDetail/orgDetail?query=${this.data.swiperUrl[e.currentTarget.dataset.myindex]}`,
      })
    },
    // FunBox
    FunBox(e) {
      let that = this;
      wx.showLoading({
        title: '正在跳转',
      })
      comFunBox.Box(e.currentTarget.dataset.myindex, e.currentTarget.dataset.myname).then(res => {
        that.setData({
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
    changePage() {
      this.setData({
        isShowUsu: false
      })
    }
  },
})