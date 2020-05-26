// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

cloud.init()

// 云函数入口函数
exports.main = (event, context) => {
  return new Promise(async (resolve, reject) => {
    const wxContext = cloud.getWXContext();
    let userInfo = {
      openId: wxContext.OPENID,
      avatarUrl: event.userInfo.avatarUrl,
      gender: event.userInfo.gender,
      nickName: event.userInfo.nickName,
      language: event.userInfo.language,
      address: {
        city: event.userInfo.city,
        province: event.userInfo.province,
        country: event.userInfo.country,
      },
    };
    db.collection('User').where({
      openId: _.eq(userInfo.openId)
    }).get().then(res => {
      if (res.data.length == 0) {
        // 添加记录
        userInfo.type = 1;
        userInfo.phone = "";
        userInfo.registerTime = Date.now();
        userInfo.myFans = [],
          userInfo.myFollow = [],
          userInfo.myCollection = [],
          userInfo.myArticle = [],
          db.collection('User').add({
            data: userInfo
          }).then(res => {
            userInfo.recordId = res._id
            resolve({
              status: 0,
              msg: '登录成功',
              source: res,
              userInfo,
            })
          }).catch(res => {
            reject({
              status: -2,
              msg: '登录失败',
              source: res,
            })
          })
      } else {
        var newUserInfo = res.data[0]
        db.collection('User').doc(newUserInfo._id).update({
          data: userInfo,
        }).then(res => {
          newUserInfo = Object.assign(newUserInfo, userInfo)
          resolve({
            status: 0,
            msg: '登录成功',
            source: res,
            userInfo: newUserInfo,
          })
        }).catch(res => {
          reject({
            status: -3,
            msg: '登录失败',
            source: res,
          })
        })
      }
    }).catch(res => {
      reject({
        status: -1,
        msg: '查询失败',
        source: res,
      })
    })
  })
}