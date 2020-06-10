const db = wx.cloud.database()
const _ = db.command
const comFunUser = require('../User/Fun_User')
const comTime = require('../Func/time')

function getOrgList(startNum, Num) {
    // startNum 从0开始获取
    // Num 获取数量
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'getListOrg',
            data: {
                startNum,
                Num,
            }
        }).then(res => {
            if (res.result) {
                res.result.orgList = isCollect(res.result.orgList)
                resolve(res.result)
            } else {
                reject({
                    orgList: [],
                    isBottom: true
                })
            }
        }).catch(res => {
            console.log(res)
            reject({
                orgList: [],
                isBottom: true
            })
        })
    })
}

function getOrg(orgId) {
    // org记录号
    return new Promise((resolve, reject) => {
        db.collection('Org').where({
            '_id': orgId
        }).get().then(res => {
            if (res.data.length > 0) {
                let orglist = isCollect([res.data[0]])
                resolve(orglist[0])
            } else {
                reject({})
            }
        }).catch(res => {
            console.log(res)
            reject({})
        })
    })
}

function getTypeOrg(TypeId) {
    return new Promise((resolve, reject) => {
        db.collection('Org').where({
            'type': TypeId
        }).get().then(res => {
            if (res.data.length > 0) {
                resolve(isCollect(res.data))
            } else {
                reject([])
            }
        }).catch(res => {
            reject([])
        })
    })
}

function searchOrg(keyWord) {
    return new Promise((resolve, reject) => {
        db.collection('Org').where({
            'info.orgName': db.RegExp({
                regexp: keyWord, //做为关键字进行匹配
                options: 'i', //不区分大小写
            })
        }).get().then(res => {
            if (res.data.length > 0) {
                resolve(isCollect(res.data))
            } else {
                reject([])
            }
        }).catch(res => {
            reject([])
        })
    })

}

function isCollect(orgList) {
    let userInfo = wx.getStorageSync('userInfo')
    for (let i = 0; i < orgList.length; i++) {
        orgList[i].isCollect = (!!userInfo && (userInfo.myCollection.indexOf(orgList[i]._id) > -1))
    }
    return orgList;
}

function fixUser(orgInfo) {
    return comFunUser.getUserInfo(orgInfo.userInfo.userId)
}

function fixComments(orgObj) {
    // 传入单个obj，返回获取评论人完整用户信息的orgObj数据
    return new Promise(async (resolve, reject) => {
        let likeCommentList = wx.getStorageSync('like_comment')
        likeCommentList = likeCommentList ? likeCommentList : []
        for (let j = 0; j < orgObj.comment.length; j++) {
            orgObj.comment[j]['userInfo'] = await comFunUser.getUserInfo(orgObj.comment[j].userId)
            orgObj.comment[j]['showTime'] = comTime.showTime(orgObj.comment[j]['time'])
            orgObj.comment[j]['isMyLike'] = likeCommentList.indexOf(orgObj.comment[j].Id) > -1
        }
        resolve(orgObj)
    })
}

module.exports = {
    getOrg,
    getOrgList,
    getTypeOrg,
    searchOrg,
    isCollect,
    fixUser,
    fixComments
}