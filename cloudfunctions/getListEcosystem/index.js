// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = function main(event, context) {
    return new Promise(async (resolve, reject) => {
        let {
            startNum,
            Num,
        } = event;
        let totalNum = await db.collection('Eco').count();
        let isBottom = startNum + Num >= totalNum.total;
        db.collection('Eco').skip(startNum).limit(Num).get().then(async (res) => {
            let ecoList = res.data
            if (ecoList.length < 1) {
                resolve({
                    ecoList,
                    isBottom: true,
                })
            }
            for (let i = 0; i < ecoList.length; i++) {
                ecoList[i]['orgInfo'] = (await db.collection('Org').doc(ecoList[i]['orgInfo']['orgId']).get()).data
                ecoList[i]['userInfo'] = (await db.collection('User').doc(ecoList[i]['userInfo']['userId']).get()).data
            }
            resolve({
                ecoList,
                isBottom
            })
        }).catch(res => {
            reject(res)
        })
    })
}