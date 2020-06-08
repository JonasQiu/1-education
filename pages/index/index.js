//获取应用实例
const app = getApp()
let userInfo = {};

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
    msgList: [{
      userId: '54bac78c5ecd3a23005318b4110c12b3',
      userAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Uvh0lKxKdAlYddyxmqVXJict2xUscT5npJiaIDsOGn3XQNyDkMcMTHVs0rskEAyUscDLugIkkWG2urjRpLuTBcww/132',
      msgContent: 'https://wx.qlogo.cn/mmopen/vi_32/Uvh0lKxKdAlYddyxmqVXJict2xUscT5npJiaIDsOGn3XQNyDkMcMTHVs0rskEAyUscDLugIkkWG2urjRpLuTBcww/132',
      msgType: 1, //0文本 1图片
      time: Date.now(), //时间戳
      showTime: '几分前', //通过time转换用来显示的
    }],
    my: {
      userId: '54bac78c5ecd3a23005318b4110c12b3'
    },
    askRoomName: [{
      name: '用户消息列表',
      list: [{
        name: '刘海弟弟',
        avatarImg: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKYZ3GU02RDbwtlRaHzgJM3cWeTzr6hACLP8IyoKhhv0O8ibB29lvlXpAtH8UB2alLia5dQWbNvIw3A/132',
        userId: '54bac78c5ecd3a23005318b4110c12b3'
      }, {
        name: '刘海的大哥丘金龙',
        avatarImg: 'https://wx.qlogo.cn/mmopen/vi_32/Uvh0lKxKdAlYddyxmqVXJict2xUscT5npJiaIDsOGn3XQNyDkMcMTHVs0rskEAyUscDLugIkkWG2urjRpLuTBcww/132',
        userId: 'd721728a5ecf306e00564d773e18ace5'
      }]
    }, {
      name: '分类频道大厅',
      list: [{
        name: '互联网',
        avatarImg: '',
        userId: ''
      }, {
        name: '艺术',
        avatarImg: '',
        userId: ''
      }, {
        name: '舞蹈',
        avatarImg: '',
        userId: ''
      }]
    }, {
      name: '机构频道大厅',
      list: [{
        name: '第六小学',
        avatarImg: '',
        userId: ''
      }, {
        name: '第五小学',
        avatarImg: '',
        userId: ''
      }]
    }],
    inpValue: ''
  },

  // 
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
      InputBottom: e.detail.height
    })
  },
  // 获取输入数据

  InputBlur(e) {
    this.setData({
      InputBottom: 0,
      inpValue: e.detail.value
    })
  },
  naviToChat(e) {
    console.log(e.currentTarget.dataset.id)
    this.hideModal()
  },

  // 发送数据
  sendMsg(e) {
    this.data.msgList.push({
      userId: '54bac78c5ecd3a23005318b4110c12b3',
      userAvatar: 'https://wx.qlogo.cn/mmopen/vi_32/Uvh0lKxKdAlYddyxmqVXJict2xUscT5npJiaIDsOGn3XQNyDkMcMTHVs0rskEAyUscDLugIkkWG2urjRpLuTBcww/132',
      msgContent: this.data.inpValue,
      msgType: 0, //0文本 1图片
      time: Date.now(), //时间戳
      showTime: '几分前', //通过time转换用来显示的
    })
    this.setData({
      msgList: this.data.msgList,
      inpValue: ''
    })
    // 加缓存和onload获取缓存
  },
  //点击后，图片进行预览
  showImg(e) {
    wx.previewImage({
      current: this.data.swiperList[e.currentTarget.dataset.imgindex],
      urls: this.data.swiperList
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
  onLoad: function () {}
})