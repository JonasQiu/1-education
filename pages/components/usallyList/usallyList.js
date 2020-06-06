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
    toggleDelay: false
  },
  attached() {
    this.LoadData()

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
            let origin = await comFunUser.getInfoList(list)
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
            let ecoList = list
            let originList = comType.deOrgTypeList(ecoList)
            let typeList = Object.keys(originList)
            for (let i = 0; i < ecoList.length; i++) {
              // 得到2地的距离
              ecoList[i].distance = await comLocation.getDistance(ecoList[i].location.lat, ecoList[i].location.lng)
              ecoList[i].showStar = parseInt(ecoList[i].star)
            }
            let showDataList = []
            showDataList[0] = {
              nav: '全部',
              list: ecoList
            }
            for (let i = 1; i < typeList.length; i++) {
              showDataList[i] = {
                'nav': typeList[i],
                'list': originList[typeList[i]]
              }
            }
            resolve(showDataList)
          });
          break;
        case 2:
          p = new Promise(async (resolve, reject) => {
            let ecoList = comEco.FixUserType(await comEco.fixLikeUser(list))
            console.log(ecoList)
            resolve([{
              nav: '最新',
              list: ecoList
            }, {
              nav: '最热',
              list: []
            }])
          });
          break;
        default:
          // 组件传参错误
          return;
      }
      p.then(res => {
        console.log(res)
        that.setData({
          dataList: res
        })
        wx.hideLoading()
      })
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
    },
    goTop(e) {
      this.setData({
        goTop: 0
      })
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
    // ECO 生态圈
    sendLike(e) {
      var that = this;
      if (!wx.getStorageSync('userInfo')) {
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