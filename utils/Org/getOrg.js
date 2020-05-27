const db = wx.cloud.database()

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
            console.log('good', res)
        }).catch(res => {
            console.log('fail', res)
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
                resolve(res.data[0])
            } else {
                reject({})
            }
        }).catch(res => {
            reject({})
        })
    })
}
module.exports = {
    getOrg,
    getOrgList,
}