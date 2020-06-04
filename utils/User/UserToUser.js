const comFunUser = require('../User/Fun_User')
const db = wx.cloud.database()
const _ = db.command

function follow(userId) {
    // origin用户(需登录)关注了target用户，双方的关注和粉丝列表做更新
    // resolve -> 0:关注成功 1:关注失败 2:用户未登录
    // reject -> 处理异常
    return new Promise(async (resolve, reject) => {
        let originInfo = wx.getStorageSync('userInfo');
        let targetInfo = await comFunUser.getUserInfo(userId)
        if (targetInfo && originInfo) {
            originInfo = await comFunUser.getUserInfo(originInfo._id)
            // 判断origin用户的关注列表如果不存在target用户的id，那么对origin用户进行数据更新
            if (originInfo.myFollow.indexOf(targetInfo._id) == -1) {
                originInfo.myFollow.unshift(targetInfo._id)
                if (((await db.collection('User').doc(originInfo._id).update({
                        data: {
                            myFollow: _.unshift([targetInfo._id])
                        }
                    })).stats.updated) != 1) {
                    resolve({
                        status: 1,
                        msg: '关注失败'
                    })
                }
            }
            if (targetInfo.myFans.indexOf(originInfo._id) == -1) {
                if (((await db.collection('User').doc(targetInfo._id).update({
                        data: {
                            myFans: _.unshift([originInfo._id])
                        }
                    })).stats.updated) != 1) {
                    resolve({
                        status: 1,
                        msg: '关注失败'
                    })
                }
            }
            wx.setStorageSync('userInfo', originInfo)
            resolve({
                status: 0,
                msg: '关注成功'
            })
        } else {
            resolve({
                status: 2,
                msg: '用户未登录'
            })
        }
    })
}

module.exports = {
    follow,
}