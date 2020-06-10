const db = wx.cloud.database()
const _ = db.command
const comEco = require('../Ecosystem/getPage')
const comOrg = require('../Org/getOrg')

module.exports = {
    Box,
    MyOrg,
    MyFans,
    MyPage,
    TypeBox,
    MyFollow,
    MyLikePage,
    MyCollectOrg,
    MyHistoryPage,
    getUserInfo
}

function getUserInfo(userId) {
    return new Promise(async(resolve, reject) => {
        db.collection('User').doc(userId).get().then(async res => {
            resolve(await res.data)
        })
    })
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

function Box(index, name) {
    return new Promise(async (resolve, reject) => {
        let showData = {
            typeIndex: 1,
            titleName: name,
            list: []
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
                showData.list = await comOrg.searchOrg(name)
                break;
            case 3:
                showData.list = (await comOrg.getOrgList(0, 20)).orgList
                break;
            case 4:
                showData.list = (await comOrg.getOrgList(20, 20)).orgList
                break;
            case 5:
                showData.list = (await comOrg.getOrgList(40, 20)).orgList
                break;
            case 6:
                showData.list = (await comOrg.getOrgList(60, 20)).orgList
                break;
            case 7:
                showData.list = (await comOrg.getOrgList(80, 20)).orgList
                break;
        }
        resolve(showData)
    })
}

function TypeBox(typeId, name) {
    return new Promise(async (resolve, reject) => {
        resolve({
            typeIndex: 1,
            titleName: name,
            list: await comOrg.getTypeOrg(typeId)
        })
    })
}