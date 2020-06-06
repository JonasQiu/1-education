function getDistance(targetLat, targetLng) {
    // 返回千里数
    return new Promise((resolve, reject) => {
        wx.getLocation({
            success: (res) => {
                var radLat1 = res.latitude * Math.PI / 180.0
                var radLat2 = targetLat * Math.PI / 180.0
                var a = radLat1 - radLat2
                var b = res.longitude * Math.PI / 180.0 - targetLng * Math.PI / 180.0
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
                s = s * 6378.137 // EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000
                // 保留两位小数
                resolve(Math.round(s * 100) / 100)
            },
            fail: () => {
                reject(0)
            }
        })
    })
}

module.exports = {
    getDistance
}