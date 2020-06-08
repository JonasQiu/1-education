const comOrg = require('../Org/getOrg')
const comFunUser = require('../User/Fun_User')
const comType = require('../Type/Type')

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

module.exports = {
    getTypeList
}