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
                        ecoList: res.result,
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
                resolve(res.result)
            }).catch(res => {
                reject([])
            })
        }).catch(res => {
            reject([])
        })
    })
}

function getPage(ecoId) {
    return new Promise((resolve, reject) => {
        db.collection('Eco').doc(ecoId).get().then((res) => {
            let ecoList = [res.data]
            if (ecoList.length < 1) {
                resolve([])
            }
            wx.cloud.callFunction({
                name: 'getListEcosystem',
                data: {
                    ecoList
                }
            }).then(res => {
                resolve(res.result[0])
            }).catch(res => {
                reject([])
            })
        }).catch(res => {
            reject([])
        })
    })
}

module.exports = {
    getPage,
    getPageList,
    searchPage
}