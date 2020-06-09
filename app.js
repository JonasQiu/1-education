//app.js
import GoEasy from './utils/Func/goeasy';


App({
  onLaunch: function () {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
        return true;
      }
      return false;
    };
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true,
        env: "education-1hoqw"
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight + 5;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 55;
        }
      }
    })
    // this.initGoEasy()
  },
  globalData: {
    // ask
    isOnline: false,
    goeasy: '',
  },
  initCimg() {

  },
  initGoEasy() { //初始化goeasy
    let userInfo = wx.getStorageSync('userInfo')
    let that = this;
    if (userInfo) {
      this.globalData.goeasy = new GoEasy({
        host: 'hangzhou.goeasy.io',
        appkey: "BC-fb5b04c9edb24642a6301a7dcac90bc3",
        onConnected: function () {
          that.globalData.isOnline = true
          console.log("连接成功");
        },
        onDisconnected: function () {
          that.globalData.isOnline = false
          wx.showToast({
            title: '与服务器连接断开…',
          })
        },
        onConnectFailed: function (error) {
          that.globalData.isOnline = false
          wx.showToast({
            title: '与服务器连接失败：' + error,
          })
        }
      })
    }

  },
})