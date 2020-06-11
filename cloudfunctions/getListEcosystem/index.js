// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = function main(event, context) {
    return new Promise(async (resolve, reject) => {
        let ecoList = event.ecoList;
        let pArr = [];
        for (let i = 0; i < ecoList.length; i++) {
            pArr[i] = {
                'org': db.collection('Org').doc(ecoList[i]['orgInfo']['orgId']).get(),
                'user': db.collection('User').doc(ecoList[i]['userInfo']['userId']).get()
            }
        }
        for (let i = 0; i < ecoList.length; i++) {
            ecoList[i]['orgInfo'] = (await pArr[i]['org']).data
            ecoList[i]['userInfo'] = (await pArr[i]['user']).data
        }
        resolve(ecoList)
    })
}