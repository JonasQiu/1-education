const comOrg = require('../../../utils/Org/getOrg')
const comType = require('../../../utils/Type/Type')
const comEco = require('../../../utils/Ecosystem/getPage')
const comUserToEco = require('../../../utils/User/UserToEco')
const comLocation = require('../../../utils/Func/location')
const comFunUser = require('../../../utils/User/Fun_User')

Component({
  properties: {
    list: {
      type: Array
    },
    typeIndex: {
      type: Number
    },
    titleName: {
      type: String
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    navTop: wx.getSystemInfoSync().statusBarHeight,
    TabCur: 0,
    dataList: [],
    // 动画
    toggleDelay: false,
    isShowUser: false
  },
  attached() {
    this.LoadData()
    this.setData({
      toggleDelay: true
    })
    this.toggleDelay(this)
  },
  methods: {
    // ALL
    LoadData() {
      // 刷新页面数据
      let that = this;
      let p;
      switch (that.data.typeIndex) {
        case 0:
          p = new Promise(async (resolve, reject) => {
            let UserTypeList = ['普通用户', '专业人士', '机构', '官方']
            let origin = await comFunUser.getInfoList(that.data.list)
            let showData = [{
              nav: '全部',
              list: origin
            }]
            let typeName = ''
            // 将获取到的用户列表进行分类到每个列表中。
            for (let i = 0; i < origin.length; i++) {
              if (origin[i].userType == 1) {
                // 普通用户不需要加到其它分类，在全部乖乖躺好就好
                origin[i].fixUserType = '普通用户'
                continue;
              }

              typeName = comType.getTypeName(origin[i].type)
              origin[i].fixUserType = typeName + ' ' + UserTypeList[origin[i].userType - 1]
              for (let j = 1; j < showData.length; j++) {
                if (showData[j]['nav'] == typeName) {
                  showData[j]['list'].push(origin[i])
                  typeName == 'ok'
                  break;
                }
              }
              if (typeName != 'ok') {
                showData.push({
                  nav: typeName,
                  list: [origin[i]]
                })
              }
            }
            resolve(showData)
          })
          break;
        case 1:
          p = new Promise(async (resolve, reject) => {
            wx.getLocation({
              success: (p) => {
                let {
                  latitude,
                  longitude
                } = p
                let orgList = that.data.list
                let originList = comType.deOrgTypeList(orgList)
                let typeList = Object.keys(originList)
                for (let i = 0; i < orgList.length; i++) {
                  // 得到2地的距离
                  orgList[i].distance = comLocation.getDistance(latitude, longitude, orgList[i].location.lat, orgList[i].location.lng)
                  orgList[i].showStar = parseInt(orgList[i].star)
                }
                let showDataList = []
                showDataList[0] = {
                  nav: '全部',
                  list: [...orgList].sort(function (a, b) {
                    return b.star - a.star
                  })
                }
                for (let i = 0; i < typeList.length; i++) {
                  showDataList[i + 1] = {
                    'nav': typeList[i],
                    'list': [...originList[typeList[i]]].sort(function (a, b) {
                      return b.star - a.star
                    })
                  }
                }
                resolve(showDataList)
              }
            })
          });
          break;
        case 2:
          p = new Promise(async (resolve, reject) => {
            let ecoList = comEco.FixUserType(await comEco.fixLikeUser(await comEco.reLoadPageList(that.data.list)))
            resolve([{
              nav: '最新',
              list: [...ecoList].sort(function (a, b) {
                return b.createTime - a.createTime
              })
            }, {
              nav: '最热',
              list: [...ecoList].sort(function (a, b) {
                return b.likeNum - a.likeNum
              })
            }])
          });
          break;
        default:
          // 组件传参错误
          return;
      }
      p.then(res => {
        that.setData({
          dataList: res,
          toggleDelay: true
        })
        that.toggleDelay(that)
        wx.hideLoading()
      }).catch(res => {
        wx.hideLoading()
      })
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
    tabSelect(e) {
      this.setData({
        toggleDelay: true,
        TabCur: e.currentTarget.dataset.id,
      })
      this.toggleDelay(this)
    },
    goTop(e) {
      this.setData({
        goTop: 0
      })
    },
    // 是否展示用户信息
    isShow(e) {
      let that = this
      let data = {
        isShowUser: !that.data.isShowUser
      }
      if (e.currentTarget.dataset.myid) {
        data.showId = e.currentTarget.dataset.myid
      }
      this.setData(data)
    },
    naviToDetail(e) {
      let url;
      let that = this;
      switch (that.data.typeIndex) {
        case 0:
          break;
        case 1:
          url = `/pages/components/orgDetail/orgDetail?query=` + e.currentTarget.dataset.id;
          break;
        case 2:
          url = `/pages/components/ecoDetail/ecoDetail?ecoId=` + e.currentTarget.dataset.id
          break;
        default:
          // 组件传参错误
          return;
      }
      wx.navigateTo({
        url: url
      })
    },
    backTo() {
      this.triggerEvent('callshowChange')
    },
    // ECO 生态圈
    sendLike(e) {
      var that = this;
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo._id) {
        wx.showToast({
          title: '请先登录好吧',
        })
        return
      }
      wx.showLoading({
        title: '请稍后…',
      })
      let index = e.currentTarget.dataset.myindex
      let p = that.data.dataList[that.data.TabCur]['list'][index].isLike ? comUserToEco.Unlike(that.data.dataList[that.data.TabCur]['list'][index]._id) : comUserToEco.like(that.data.dataList[that.data.TabCur]['list'][index]._id)
      p.then(res => {
        console.log(res);
        that.LoadData()
      }).catch(res => {
        wx.hideLoading()
      })
    },
    // ORG 机构
    changeTypeList(index) {
      let that = this;
      this.setData({
        showList: index == 0 ? that.getAll(that.data.searchList) : that.data.searchList[that.data.typeList[index]],
      })
    },
    getAll(searchList) {
      let list = []
      let objList = Object.keys(searchList)
      for (let i = 0; i < objList.length - 1; i++) {
        for (let j = 0; j < searchList[objList[i]].length; j++) {
          list.push(searchList[objList[i]][j])
        }
      }
      return list
    },
    // USER 用户
  }

})