const db = wx.cloud.database()
const _ = db.command

function getInfoList(userIdList) {
    return new Promise((resolve, reject) => {
        let pList = []
        for (let i = 0; i < userIdList.length; i++) {
            pList[i] = getUserInfo(userIdList[i])
        }
        (async () => {
            for (let i = 0; i < pList.length; i++) {
                pList[i] = await pList[i]
            }
            resolve(pList)
        })()
    })
}

function getUserInfo(userId) {
    // 返回目标用户完整信息obj
    return new Promise((resolve, reject) => {
        db.collection('User').doc(userId).get().then(res => {
            resolve(fixUserInfo(res.data))
        }).catch(res => {
            reject(res)
        })
    })
}

function fixUserInfo(userInfo) {
    let myUserInfo = wx.getStorageSync('userInfo')
    userInfo.isMyFollow = fixFollow(myUserInfo, userInfo)
    userInfo.isMyFans = fixFollow(myUserInfo, userInfo)
    return userInfo
}

function fixFollow(myUserInfo, userInfo) {
    return (myUserInfo && userInfo) ? (myUserInfo.myFollow.indexOf(userInfo._id) > -1) : false;
}

function fixFans(myUserInfo, userInfo) {
    return (myUserInfo && userInfo) ? (userInfo.myFans.indexOf(myUserInfo._id) > -1) : false;
}

module.exports = {
    getUserInfo,
    getInfoList,
}