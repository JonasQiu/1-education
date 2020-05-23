// components/my/my.js
let commonLogin=require("../../../utils/User/Login")
Component({
  //  组件的属性列表
  properties: {

  },

  // 组件的初始数据
  loginObj:{},
  data: {
    //登录部分
    headImg:"/images/logo.png",
    name:"请登录账号",
    authName:'未登录',
    //关注 收藏 粉丝数部分
    attentionNum:2000,
    collectionNum:30001,
    fansNum:"402283",
  },

  //组件初始化处理
  attached() {
    const that=this;
    console.log("success")
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            attentionCount: i,
            collectionCount: i,
            fansCount: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          // 这三个数都要进行传递
          attentionCount: that.coutNum(that.data.attentionNum),
          collectionCount: that.coutNum(that.data.collectionNum),
          fansCount: that.coutNum(that.data.fansNum)
        })
      }
    }
    wx.hideLoading()
  },
 
  //  组件的方法列表
  methods: {
    //关注 收藏 粉丝数取整
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    //获取用户信息，进行登录处理
    onGetUserInfo(e){
      const that=this;
      if(e.detail.userInfo){
        commonLogin.Login(e.detail.userInfo)
        that.loginObj=e.detail.userInfo

        that.setData({
          headImg:that.loginObj.avatarUrl,
          name:that.loginObj.nickName,
          authName:"已登录",
          //更新粉丝关注收藏数据 attentionNum：
        })
        wx.getStorage({
          key: 'userInfo',
          success(res){
            wx.cloud.callFunction({
              name:"databaseopt",
              data:{
                db:"User",
                type:"get",
                condition:{
                  _id:res.data._id
                },
                skip:0,
                limit:20
              }
            }).then(res=>{
              that.loginObj=res.result.data[0]
              wx.showLoading({
                title: '正在更新数据',
              })
              that.setData({
                headImg:that.loginObj.avatarUrl,
                name:that.loginObj.nickName,
                authName:"已登录",
                //更新粉丝关注收藏数据 attentionNum：
              })
              wx.hideLoading()
              console.log(that.loginObj)
            })
          }
        })
      }else{
        wx.showModal({
          title:"提示",
          content:"请重新打开小程序",
          showCancel:true
        })
      }
    },
  }
})
