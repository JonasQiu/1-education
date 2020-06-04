const {
    typeList,
    twoTypeList
} = require("./typeList")

// 返回所有分类对象
function getType() {
    return typeList;
}
// 传入一级分类id，返回二级分类对象
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
// 传入一批未将分类进行分类的机构信息数组，返回分类后的分类机构信息（挺绕口）
function deOrgTypeList(orgList) {
    let typeList = getType()
    let resList = []
    let typeName = ''
    for (let i = 0; i < orgList.length; i++) {
        for (let j in typeList) {
            if (orgList[i].type in typeList[j]['list']) {
                typeName = typeList[j]['name']
                if (!resList[typeName]) {
                    resList[typeName] = []
                }
                resList[typeName].push(orgList[i])
            }
        }
    }
    return resList;
}

module.exports = {
    getType,
    getTypeList,
    getTypeName,
    deOrgTypeList
}