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
        let isBottom = startNum + Num <= totalNum.total;
        db.collection('Eco').skip(startNum).limit(Num).get().then(async (res) => {
            let ecoList = res.data
            if (ecoList.length < 1) {
                resolve({
                    ecoList: ecoList,
                    isBottom: true,
                })
            }
            for (let i = 0; i < ecoList.length; i++) {
                console.log(ecoList[i]['orgInfo']['orgId'])
                let setUserInfo = await db.collection('Org').where({
                    "_id": ecoList[i]['orgInfo']['orgId']
                }).get()
                if (setUserInfo.length > 0) {
                    ecoList[i]['orgInfo'] = setUserInfo
                }

                setUserInfo = await db.collection('User').where({
                    "_id": ecoList[i]['userInfo']['userId']
                }).get()
                if (setUserInfo.length > 0) {
                    ecoList[i]['userInfo'] = setUserInfo
                }

            }
            resolve({
                ecoList: ecoList,
                isBottom: true,
            })
        }).catch(res => {
            reject(res)
        })
    })
}