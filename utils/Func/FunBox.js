const db = wx.cloud.database()
const _ = db.command
const comEco = require('../Ecosystem/getPage')
const comOrg = require('../Org/getOrg')

module.exports = {
    MyOrg,
    MyPage,
    MyFollow,
    MyFans,
    MyLikePage,
    MyCollectOrg,
    MyHistoryPage,
}

function MyOrg(Id) {
    return new Promise((resolve, reject) => {
        db.collection('Org').where({
            userInfo: {
                userId: Id
            }
        }).get().then(res => {
            resolve(res.data)
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyPage(Id) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').where({
            userInfo: {
                userId: Id
            }
        }).get().then(res => {
            wx.cloud.callFunction({
                name: 'getListEcosystem',
                data: {
                    ecoList: res.data
                }
            }).then(res => {
                resolve(comEco.FixAll(res.result))
            }).catch(res => {
                reject(res)
            })
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyFollow(Id) {
    return new Promise((resolve, reject) => {
        db.collection('User').doc(Id).get().then(res => {
            resolve(res.data.myFollow)
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyFans(Id) {
    return new Promise((resolve, reject) => {
        db.collection('User').doc(Id).get().then(res => {
            resolve(res.data.myFans)
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyLikePage(Id) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').where({
            likes: Id
        }).get().then(res => {
            wx.cloud.callFunction({
                name: 'getListEcosystem',
                data: {
                    ecoList: res.data
                }
            }).then(res => {
                resolve(comEco.FixAll(res.result))
            }).catch(res => {
                reject(res)
            })
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyCollectOrg(Id) {
    return new Promise((resolve, reject) => {
        db.collection('User').doc(Id).get().then(async res => {
            let orgList = res.data.myCollection
            for (let i = 0; i < orgList.length; i++) {
                orgList[i] = await comOrg.getOrg(orgList[i])
            }
            resolve(orgList)
        }).catch(res => {
            resolve(res)
        })
    })
}

function MyHistoryPage(Id) {
    return comEco.getHistoryPage()
}