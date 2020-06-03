function Login(userInfo) {
        return new Promise((resolve, reject) => {
                wx.cloud.callFunction({
                        name: 'login',
                        data: {
                                userInfo: userInfo
                        }
                }).then(res => {
                        wx.setStorageSync('userInfo', res.result.userInfo)
                        resolve(res.result.userInfo)
                }).catch(res => {
                        reject(res)
                })
        })
}
module.exports = {
        Login,
}