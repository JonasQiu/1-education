const db = wx.cloud.database()
const _ = db.command

function getInfoList(userIdList) {

    return new Promise((resolve, reject) => {
        let pList = []
        for (let i = 0; i < userIdList.length; i++) {
            pList[i] = db.collection('User').doc(userIdList[i]).get()
        }
        (async () => {
            for (let i = 0; i < pList.length; i++) {
                pList[i] = (await pList[i]).data
            }
            resolve(pList)
        })()
    })
}

module.exports = {
    getInfoList,
}