//获取应用实例
const app = getApp()
let userInfo = {};
const comAsk = require('../../utils/Func/ask')
const comTime = require('../../utils/Func/time')
const comCimg = require("../../utils/Func/loadCimg")
const comOrg = require('../../utils/Org/getOrg')
const comLocation = require('../../utils/Func/location')

Page({
  data: {
    askNum: 20,
    PageCur: 'homePage',
    position: '英德',
    weather: '阴',
    degree: "26",
    hotSearch: "王后雄(满1000减100)",
    // ask
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 1,
    scrollLeft: 0,
    InputBottom: 0,
    msgList: [],
    myUserInfo: {},
    askRoomName: [],
    roomObj: {},
    inpValue: '',
    chatChunkHeight: 0,
    scrollTop: 0,
    isLoadData: false,
    showToastData: {
      show: false,
      title: '',
      content: ''
    }
  },
  DiyShowToast(title, content) {
    this.setData({
      showToastData: {
        show: !this.data.showToastData.show,
        title,
        content
      }
    })
  },

  //////////////////////////////////
  // ask
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  sendUserMsg(e) {
    let that = this;
    this.setData({
      InputBottom: 0,
    })
    if (e.detail.value.trim() == '') {
      wx.showToast({
        title: '提交消息不能为空哦',
      })
    } else {
      wx.showLoading({
        title: '正在提交中…',
      })
      let msg = JSON.stringify({
        userId: that.data.myUserInfo._id,
        userAvatar: that.data.myUserInfo.avatarUrl,
        userName: that.data.myUserInfo.nickName,
        msgContent: e.detail.value,
        msgType: 0,
        time: Date.now(),
      })
      comAsk.sendMessages(that.data.roomObj.userId, msg, function () {
        wx.showToast({
          title: '发送成功',
        })
        that.setData({
          inpValue: '',
          scrollTop: that.data.chatChunkHeight
        })
      }, function (error) {
        wx.showToast({
          title: '发送失败:' + error,
        })
        that.setData({
          inpValue: '',
          scrollTop: that.data.chatChunkHeight
        })
      })
    }
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height - 69
    })
  },
  getInputValue(e) {
    if (this.data.lastValue == e.detail.value) {
      // 清空 inputValue
      this.setData({
        lastValue: ''
      })
    } else {
      this.setData({
        inpValue: e.detail.value
      })
    }
    this.data.lastValue = e.detail.value
  },
  InputBlur(e) {
    this.setData({
      // inpValue: '',
      InputBottom: 0,
    })
  },
  // 选取图片发送
  choosePhoto(e) {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        // const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '正在提交中…',
        })
        wx.cloud.uploadFile({
          cloudPath: "chatImg/" + Date.now() + '.png', // 上传至云端的路径
          filePath: res.tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            let msg = JSON.stringify({
              userId: that.data.myUserInfo._id,
              userAvatar: that.data.myUserInfo.avatarUrl,
              userName: that.data.myUserInfo.nickName,
              msgContent: res.fileID,
              msgType: 1,
              time: Date.now(),
            })
            comAsk.sendMessages(that.data.roomObj.userId, msg, function () {
              wx.showToast({
                title: '发送成功',
              })
              that.setData({
                inpValue: '',
                scrollTop: that.data.chatChunkHeight
              })
              wx.hideLoading()
            }, function (error) {
              wx.showToast({
                title: '发送失败:' + error,
              })
              that.setData({
                inpValue: '',
                scrollTop: that.data.chatChunkHeight
              })
              wx.hideLoading()
            })
          },
          fail: (error) => {
            wx.showToast({
              title: '发送失败:' + error,
            })
            that.setData({
              inpValue: '',
              scrollTop: that.data.chatChunkHeight
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  // 选择列表
  naviToChat(e) {
    this.loadChat(e.currentTarget.dataset.roominfo)
  },
  // 刷新聊天界面
  loadChat(roominfo) {
    let that = this;
    wx.showLoading({
      title: '正在连接频道中',
    })
    if (that.data.roomObj) {
      // 如果之前连过，先断开之前的
      if (!comAsk.unsubscribe(that.data.roomObj.userId)) {
        wx.hideLoading()
        wx.showToast({
          title: '连接失败，断开上一个连接失败！',
        })
        return
      }
    }
    comAsk.subscribeMessage(roominfo.userId, that.receiveMessages, function () {
      wx.setStorageSync('curChat', roominfo)
      wx.hideLoading()
      // 关闭左侧栏，将房间信息保存，清空聊天窗口记录，清空输入框
      that.setData({
        modalName: null,
        roomObj: roominfo,
        msgList: [],
        inpValue: '',
      })
    })
  },
  // 收到消息 添加到聊天列表，添加至缓存，实时滚动
  receiveMessages(msg) {
    let obj = JSON.parse(msg.content)
    let time = new Date()
    obj.showTime = time.getHours() + ":" + time.getMinutes()
    // 添加到聊天列表
    this.data.msgList.push(obj)
    this.setData({
      msgList: this.data.msgList
    })
  },

  // 发送数据
  sendMsg(e) {
    let that = this;
    if (that.data.inpValue.trim() == '') {
      wx.showToast({
        title: '消息不能为空哦',
      })
      return
    }
    let msg = JSON.stringify({
      userId: that.data.myUserInfo._id,
      userAvatar: that.data.myUserInfo.avatarUrl,
      userName: that.data.myUserInfo.nickName,
      msgContent: that.data.inpValue,
      msgType: 0,
      time: Date.now(),
    })
    comAsk.sendMessages(that.data.roomObj.userId, msg, function () {
      wx.showToast({
        title: '发送成功',
      })
    }, function (error) {
      wx.showToast({
        title: '发送失败:' + error,
      })
    })
    console.log(this.data.inpValue)
    this.setData({
      InputBottom: 0,
      inpValue: '',
      scrollTop: this.data.chatChunkHeight
    })
    console.log(this.data.inpValue)
  },
  //点击后，图片进行预览
  showImg(e) {
    console.log(e.currentTarget.dataset.imgurl)
    wx.previewImage({
      current: 1,
      urls: [e.currentTarget.dataset.imgurl]
    })
  },
  // 
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  // 底部导航切换
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    let curChat = wx.getStorageSync('curChat')
    if (e.currentTarget.dataset.cur == 'ask' && comAsk.IsOnline()) {
      if (!curChat) {
        curChat = this.data.askRoomName[0]['list'][0]
      }
      console.log(curChat);
      this.loadChat(curChat)
    }
  },
  // 加载页面立刻执行
  onLoad: function () {
    let that = this;
    let pCimg;
    let orgList = [];
    new Promise(async (resolve, reject) => {
      pCimg = comCimg.initCimg()
      if (orgList != []) {
        return
      } else {
        orgList = (await comOrg.getOrgList(0, 115)).orgList
      }
      resolve(orgList)
    }).catch(res => {
      that.setData({
        showToastData: {
          show: true,
          title: '加载数据失败',
          content: '请保证打开GPS且授权位置信息'
        }
      })
    })
    comAsk.getTypeList().then(res => {
      that.setData({
        askRoomName: [{
          name: '用户消息列表',
          list: res[0]
        }, {
          name: '分类频道大厅',
          list: res[1]
        }, {
          name: '机构频道大厅',
          list: res[2]
        }]
      })
    })
    new Promise(async (resolve, reject) => {
      wx.getLocation({
        success: async (res2) => {
          let {
            latitude,
            longitude
          } = res2
          orgList = (await comOrg.getOrgList(0, 115)).orgList
          for (let j = 0; j < orgList.length; j++) {
            orgList[j].distance = comLocation.getDistance(latitude, longitude, orgList[j].location.lat, orgList[j].location.lng)
            orgList[j].showStar = parseInt(orgList[j].star)
          }
          await pCimg
          resolve({
            HomePageInfo: comCimg.getHomePageSwiper(),
            allList: orgList
          })
        },
        fail: async (res) => {
          for (let j = 0; j < orgList.length; j++) {
            orgList[j].distance = 0
          }
          await pCimg
          resolve({
            HomePageInfo: comCimg.getHomePageSwiper(),
            allList: orgList
          })
        }
      })
    }).then(res => {
      if (res.HomePageInfo) {
        wx.setStorageSync('homePageData', res)
        that.setData({
          isLoadData: true
        })
      } else {
        that.setData({
          showToastData: {
            show: true,
            title: '加载数据失败',
            content: '请保证打开GPS且授权位置信息'
          }
        })
      }
    }).catch(res => {
      that.setData({
        showToastData: {
          show: true,
          title: '加载数据失败',
          content: '请保证打开GPS且授权位置信息:' + res
        }
      })
    })


    // 得到元素的高度
    // wx.createSelectorQuery().select('.scrollTop').boundingClientRect(function (res) {
    //   that.setData({
    //     chatChunkHeight: res.height || 0
    //   })
    // }).exec();

    wx.getStorage({
      key: 'userInfo',
      success: res => {
        that.setData({
          myUserInfo: res.data
        })
      }
    })
  }
})