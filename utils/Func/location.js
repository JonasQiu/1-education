function getDistance(originLat, originLng, targetLat, targetLng) {
    var radLat1 = originLat * Math.PI / 180.0
    var radLat2 = targetLat * Math.PI / 180.0
    var a = radLat1 - radLat2
    var b = originLng * Math.PI / 180.0 - targetLng * Math.PI / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    // 保留两位小数
    return Math.round(s * 100) / 100
}

module.exports = {
    getDistance
}