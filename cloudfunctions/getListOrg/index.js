// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = (event, context) => {
    return new Promise(async (resolve, reject) => {
        let {
            startNum,
            Num,
        } = event;
        let totalNum = await db.collection('Org').count();
        let isBottom = startNum + Num >= totalNum.total;

        db.collection('Org').skip(startNum).limit(Num).get().then(res => {
            resolve({
                orgList: res.data,
                isBottom
            })
        }).catch(res => {
            reject(res)
        })
    })
}