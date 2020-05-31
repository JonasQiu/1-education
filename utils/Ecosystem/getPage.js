function getPage(startNum, Num) {
    // startNum 从0开始获取
    // Num 获取数量
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'getListEcosystem',
            data: {
                startNum,
                Num,
            }
        }).then(res => {
            if (res.result) {
                resolve(res.result)
            } else {
                reject({
                    ecoList: [],
                    isBottom: true
                })
            }
        }).catch(res => {
            reject({
                ecoList: [],
                isBottom: true
            })
        })
    })
}
module.exports = {
    getPage
}