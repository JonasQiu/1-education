const comOrg = require('../Org/getOrg')
const comFunUser = require('../User/Fun_User')
const comType = require('../Type/Type')
const app = getApp();

function getTypeList() {
    return new Promise(async (resolve, reject) => {
        resolve([await new Promise((resolve, reject) => {
            // 用户列表
            let userInfo = wx.getStorageSync('userInfo')
            if (userInfo) {
                let infoList = []
                comFunUser.getInfoList(userInfo.myFollow).then(res => {
                    for (let i = 0; i < res.length; i++) {
                        infoList.push({
                            name: res[i].nickName,
                            avatarImg: res[i].avatarUrl,
                            userId: res[i]._id > userInfo._id ? res[i]._id + '&' + userInfo._id : userInfo._id + '&' + res[i]._id
                        })
                    }
                    resolve(infoList)
                })
            } else {
                reject([])
            }
        }), await new Promise((resolve, reject) => {
            // 分类列表
            let originObj = comType.twoTypeList
            let infoList = []
            for (let i in originObj) {
                infoList.push({
                    name: originObj[i],
                    avatarImg: '',
                    userId: i
                })
            }
            resolve(infoList)
        }), await new Promise((resolve, reject) => {
            // 机构列表
            comOrg.getOrgList(0, 200).then(res => {
                let infoList = []
                for (let i = 0; i < res.orgList.length; i++) {
                    infoList.push({
                        name: res.orgList[i].info.orgName,
                        avatarImg: res.orgList[i].cimg.logo,
                        userId: res.orgList[i]._id
                    })
                }
                resolve(infoList)
            })
        })])
    })
}

// 订阅频道 onMessage参数msg onSuccess无参
function subscribeMessage(channel, onMessage, onSuccess) {
    var self = this;
    app.globalData.goeasy.subscribe({
        channel,
        onMessage,
        onSuccess
    });
}
//发送消息 onSuccess无参 onFailed参数：error
function sendMessages(channel, message, onSuccess, onFailed) {
    app.globalData.goeasy.publish({
        channel,
        message,
        onSuccess,
        onFailed
    });
}
// 取消订阅 返回bool
async function unsubscribe(channel) {
    return await new Promise((resolve, reject) => {
        app.globalData.goeasy.unsubscribe({
            channel,
            onSuccess: function () {
                resolve(true)
            },
            onFailed: function (error) {
                resolve(false)
            }
        });
    })
}
// 监听用户上下线 onPresence参数 presenceEvents
function subscribePresence(channel) {
    goEasy.subscribePresence({
        channel,
        onPresence: function (presenceEvents) {
            console.log("Presence events", presenceEvents);
        }
    });
}

// 是否连接在线
function IsOnline() {
    return app.globalData.isOnline
}

module.exports = {
    getTypeList,
    subscribeMessage,
    sendMessages,
    unsubscribe,
    IsOnline
}