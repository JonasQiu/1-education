//获取应用实例
const app = getApp()
let userInfo = {};
const comAsk = require('../../utils/Func/ask')
const comTime = require('../../utils/Func/time')
const comCimg = require("../../utils/Func/loadCimg")

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
    isLoadData: false
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
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height - 69
    })
  },
  // 获取输入数据
  InputBlur(e) {
    this.setData({
      InputBottom: 0,
      inpValue: e.detail.value
    })
  },
  // 选取图片发送
  choosePhoto(e) {
    wx.chooseImage({
      count: 1,
      success(res) {
        // const tempFilePaths = res.tempFilePaths
        console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
        // console.log(tempFilePaths)
        // 触发sendmsg函数
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
    obj.showTime = comTime.showTime(obj.time)
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
    this.setData({
      inpValue: '',
      scrollTop: this.data.chatChunkHeight
    })
  },
  //点击后，图片进行预览
  showImg(e) {
    wx.previewImage({
      current: 1,
      urls: e.currentTarget.dataset.imgurl
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
  },
  // 加载页面立刻执行
  onLoad: function () {
    let that = this;
    wx.showLoading({
      title: '正在获取数据',
    })
    comCimg.initCimg().then(res => {
      that.setData({
        isLoadData: true
      })
      wx.hideLoading()
    }).catch(res => {
      wx.showToast({
        title: '加载数据失败',
      })
      wx.hideLoading()
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