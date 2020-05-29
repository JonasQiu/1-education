const {
    typeList,
    twoTypeList
} = require("./typeList")

// 返回所有分类对象
function getType() {
    return typeList;
}
// 传入一极分类id，返回二级分类对象
function getTypeList(typeId) {
    if (typeId in typeList) {
        return typeList[typeId]['list']
    }
    return {};
}
// 传入二级分类id，返回二级分类名字
function getTypeName(typeId) {
    if (typeId in twoTypeList) {
        return twoTypeList[typeId]
    }
    return "";
}

module.exports = {
    getType,
    getTypeList,
    getTypeName
}