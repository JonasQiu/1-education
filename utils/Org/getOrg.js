const db = wx.cloud.database()
const _ = db.command

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

module.exports = {
    getOrg,
    getOrgList,
    getTypeOrg,
    searchOrg,
}