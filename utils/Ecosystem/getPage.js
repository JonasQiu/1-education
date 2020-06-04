const comTime = require('../Func/time')
const comFunUser = require('../User/Fun_User')
const db = wx.cloud.database()
const _ = db.command

function getPageList(startNum, Num) {
    // startNum 从0开始获取
    // Num 获取数量
    return new Promise((resolve, reject) => {
        db.collection('Eco').count().then(res => {
            let isBottom = startNum + Num >= res.total;
            db.collection('Eco').skip(startNum).limit(Num).get().then((res) => {
                let ecoList = res.data
                if (ecoList.length < 1) {
                    resolve({
                        ecoList,
                        isBottom: true,
                    })
                }
                wx.cloud.callFunction({
                    name: 'getListEcosystem',
                    data: {
                        ecoList
                    }
                }).then(res => {
                    resolve({
                        ecoList: FixAll(res.result),
                        isBottom
                    })
                }).catch(res => {
                    reject({
                        ecoList: [],
                        isBottom: true,
                    })
                })
            }).catch(res => {
                reject({
                    ecoList: [],
                    isBottom: true,
                })
            })
        })
    })
}

function searchPage(keyWord) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').where(_.or([{
            'content': db.RegExp({
                regexp: keyWord, //做为关键字进行匹配
                options: 'i', //不区分大小写
            })
        }, {
            'title': db.RegExp({
                regexp: keyWord, //做为关键字进行匹配
                options: 'i', //不区分大小写
            })
        }])).get().then((res) => {
            let ecoList = res.data
            if (ecoList.length < 1) {
                resolve(ecoList)
            }
            wx.cloud.callFunction({
                name: 'getListEcosystem',
                data: {
                    ecoList
                }
            }).then(res => {
                resolve(FixAll(res.result))
            }).catch(res => {
                reject(res)
            })
        }).catch(res => {
            reject(res)
        })
    })
}

function getPage(ecoId) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').doc(ecoId).get().then((res) => {
            let ecoList = [res.data]
            if (ecoList.length < 1) {
                resolve({})
            }
            wx.cloud.callFunction({
                name: 'getListEcosystem',
                data: {
                    ecoList
                }
            }).then(res => {
                resolve(FixAll(res.result)[0])
            }).catch(res => {
                reject(res)
            })
        }).catch(res => {
            reject(res)
        })
    })
}

function getHotPageList(startNum, Num) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').count().then(res => {
            let isBottom = startNum + Num >= res.total;
            db.collection('Eco').orderBy('likeNum', 'desc').skip(startNum).limit(Num).get().then((res) => {
                let ecoList = res.data
                if (ecoList.length < 1) {
                    resolve({
                        ecoList,
                        isBottom: true,
                    })
                }
                wx.cloud.callFunction({
                    name: 'getListEcosystem',
                    data: {
                        ecoList
                    }
                }).then(res => {
                    resolve({
                        ecoList: FixAll(res.result),
                        isBottom
                    })
                }).catch(res => {
                    reject({
                        ecoList: [],
                        isBottom: true,
                    })
                })
            }).catch(res => {
                reject({
                    ecoList: [],
                    isBottom: true,
                })
            })
        })
    })
}

function getNewPageList(startNum, Num) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').count().then(res => {
            let isBottom = startNum + Num >= res.total;
            db.collection('Eco').orderBy('createTime', 'desc').skip(startNum).limit(Num).get().then((res) => {
                let ecoList = res.data
                if (ecoList.length < 1) {
                    resolve({
                        ecoList,
                        isBottom: true,
                    })
                }
                wx.cloud.callFunction({
                    name: 'getListEcosystem',
                    data: {
                        ecoList
                    }
                }).then(res => {
                    resolve({
                        ecoList: FixAll(res.result),
                        isBottom
                    })
                }).catch(res => {
                    reject({
                        ecoList: [],
                        isBottom: true,
                    })
                })
            }).catch(res => {
                reject({
                    ecoList: [],
                    isBottom: true,
                })
            })
        })
    })
}

function getHistoryPage() {
    return new Promise((resolve, reject) => {
        let history = wx.getStorageSync('history_Eco')
        let pList = []
        for (let i = 0; i < history.length; i++) {
            pList[i] = getPage(history[i])
        }
        (async () => {
            for (let i = 0; i < pList.length; i++) {
                pList[i] = await pList[i]
            }
            resolve(pList)
        })()
    })
}

function FixAll(ecoList) {
    return fixTime(isLike(ecoList))
}

function isLike(ecoList) {
    let userInfo = wx.getStorageSync('userInfo')
    for (let i = 0; i < ecoList.length; i++) {
        ecoList[i].isLike = (!!userInfo && (ecoList[i].likes.indexOf(userInfo._id) > -1))
    }
    return ecoList;
}

function fixTime(ecoList) {
    for (let i = 0; i < ecoList.length; i++) {
        ecoList[i].fixCreateTime = comTime.showTime(ecoList[i].createTime)
        ecoList[i].fixLastTime = comTime.showTime(ecoList[i].lastTime)
    }
    return ecoList;
}

function fixLikeUser(ecoList) {
    return new Promise((resolve, reject) => {
        let pList = []
        for (let i = 0; i < ecoList.length; i++) {
            pList[i] = comFunUser.getInfoList(ecoList[i].likes)
        }
        (async () => {
            for (let i = 0; i < pList.length; i++) {
                ecoList[i].likes = (await pList[i])
            }
            resolve(ecoList)
        })()
    })
}

module.exports = {
    getPage,
    getPageList,
    getHotPageList,
    getNewPageList,
    getHistoryPage,
    fixLikeUser,
    searchPage,
    isLike
}