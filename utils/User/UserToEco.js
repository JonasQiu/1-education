const db = wx.cloud.database()
const _ = db.command
const comEco = require('../Ecosystem/getPage')

// 阅读
function read(ecoId) {
    // 用户(无需登录)查看了这个帖子
    // resolve -> bool
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let history = wx.getStorageSync('history_Eco') || []
        let updateData = {}
        if (history.indexOf(ecoId) == -1) {
            //找不到历史记录，那么增加本地记录
            history.unshift(ecoId)
            wx.setStorageSync('history_Eco', history)
            updateData['readNum'] = _.inc(1);
            let userInfo = wx.getStorageSync('userInfo')
            db.collection('Eco').doc(ecoId).get().then(res => {
                if (userInfo && res.data.reads.indexOf(userInfo._id) == -1) {
                    // 如果已登录，且阅读列表暂无本号id，则添加本id到阅读列表
                    updateData['reads'] = _.unshift([userInfo._id])
                }
                db.collection('Eco').doc(ecoId).update({
                    data: updateData,
                }).then(res => {
                    resolve(res.stats.updated == 1)
                }).catch(res => {
                    reject(res)
                })
            }).catch(res => {
                reject(res)
            })
        } else {
            //找到历史访问过了，不做修改，直接返回
            resolve(true)
        }
    })
}

// 喜欢
function like(ecoId) {
    // 用户(需登录)喜欢这个帖子,自增帖子likeNum，用户ID添加到likes列表
    // resolve -> 0:喜欢成功 1:喜欢失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });
        db.collection('Eco').doc(ecoId).get().then(res => {
            if (!res.data) {
                resolve({
                    status: 1,
                    msg: '喜欢失败'
                })
            } else {
                let ecoData = comEco.isLike([res.data])[0]
                if (ecoData.isLike) {
                    resolve({
                        status: 0,
                        msg: '喜欢成功'
                    })
                } else {
                    db.collection('Eco').doc(ecoData._id).update({
                        data: {
                            likeNum: _.inc(1),
                            likes: _.unshift([userInfo._id])
                        },
                    }).then(res => {
                        if (res.stats.updated == 1) {
                            resolve({
                                status: 0,
                                msg: '喜欢成功'
                            })
                        } else {
                            resolve({
                                status: 1,
                                msg: '喜欢失败'
                            })
                        }
                    }).catch(res => {
                        reject(res)
                    })
                }
            }
        })
    })
}

// 取消喜欢
function Unlike(ecoId) {
    // 用户(需登录)取消喜欢这个帖子,自减帖子likeNum，用户ID从likes列表删除
    // resolve -> 0:喜欢成功 1:喜欢失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });
        db.collection('Eco').doc(ecoId).get().then(res => {
            if (!res.data) {
                resolve({
                    status: 1,
                    msg: '取消失败'
                })
            } else {
                let ecoData = comEco.isLike([res.data])[0]
                if (!ecoData.isLike) {
                    resolve({
                        status: 0,
                        msg: '取消成功'
                    })
                } else {
                    ecoData.likes.remove(userInfo._id)
                    db.collection('Eco').doc(ecoData._id).update({
                        data: {
                            likeNum: _.inc(-1),
                            likes: ecoData.likes
                        },
                    }).then(res => {
                        if (res.stats.updated == 1) {
                            resolve({
                                status: 0,
                                msg: '取消成功'
                            })
                        } else {
                            resolve({
                                status: 1,
                                msg: '取消失败'
                            })
                        }
                    }).catch(res => {
                        reject(res)
                    })
                }
            }
        })
    })
}

// 评论
function setComment(ecoId, content) {
    // 用户(需登录)评论这个帖子,将评论信息添加到帖子comments字段
    // resolve -> 0:评论成功 1:评论失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });
        let time = Date.now()
        db.collection('Eco').doc(ecoId).update({
            data: {
                comments: _.unshift([{
                    Id: userInfo._id + "&" + time,
                    userId: userInfo._id,
                    content,
                    time: time,
                    likeNum: 0
                }])
            }
        }).then(res => {
            if (res.stats.updated == 1) {
                resolve({
                    status: 0,
                    msg: '评论成功'
                })
            } else {
                resolve({
                    status: 1,
                    msg: '评论失败'
                })
            }
        }).catch(res => {
            reject(res)
        })

    })
}

// 简单点赞评论
function likeComment(ecoId, CommentId) {
    // 用户点赞这个评论,通过判断本地缓存，自增评论likeNum
    // resolve -> 0:点赞评论成功 1:点赞评论失败
    // reject -> 处理异常
    return new Promise(async (resolve, reject) => {
        let likeCommentList = wx.getStorageSync('like_comment')
        if (likeCommentList && likeCommentList.indexOf(CommentId) > -1) {
            // 说明爱过
            resolve({
                status: 0,
                msg: '点赞评论成功'
            })
        } else {
            likeCommentList = likeCommentList ? likeCommentList : []
            let commentList = (await db.collection('Eco').doc(ecoId).get()).data.comments
            for (let i = 0; i < commentList.length; i++) {
                if (commentList[i].Id == CommentId) {
                    commentList[i].likeNum += 1
                    if ((await db.collection('Eco').doc(ecoId).update({
                            data: {
                                comments: commentList
                            }
                        })).stats.updated == 1) {
                        likeCommentList.push(CommentId)
                        wx.setStorageSync('like_comment', likeCommentList)
                        resolve({
                            status: 0,
                            msg: '点赞评论成功'
                        })
                    } else {
                        resolve({
                            status: 1,
                            msg: '点赞评论失败'
                        })
                    }
                    break;
                }
            }
            resolve({
                status: 1,
                msg: '点赞评论失败'
            })

        }
    })
}

// 简单取消点赞评论
function disLikeComment(ecoId, CommentId) {
    // 用户取消点赞这个评论,通过判断本地缓存，自减评论likeNum
    // resolve -> 0:点赞评论成功 1:点赞评论失败
    // reject -> 处理异常
    return new Promise(async (resolve, reject) => {
        let likeCommentList = wx.getStorageSync('like_comment') || []
        if (!likeCommentList || likeCommentList.indexOf(CommentId) == -1) {
            // 说明没爱过，没爱过取消啥？
            resolve({
                status: 0,
                msg: '取消点赞评论成功'
            })
        } else {
            let commentList = (await db.collection('Eco').doc(ecoId).get()).data.comments
            for (let i = 0; i < commentList.length; i++) {
                if (commentList[i].Id == CommentId) {
                    // 啊找到要操作的了
                    commentList[i].likeNum -= 1
                    if ((await db.collection('Eco').doc(ecoId).update({
                            data: {
                                comments: commentList
                            }
                        })).stats.updated == 1) {
                        likeCommentList.remove(CommentId)
                        wx.setStorageSync('like_comment', likeCommentList)
                        resolve({
                            status: 0,
                            msg: '取消点赞评论成功'
                        })
                    } else {
                        resolve({
                            status: 1,
                            msg: '取消点赞评论失败'
                        })
                    }
                    break;
                }
            }
            resolve({
                status: 1,
                msg: '取消点赞评论失败'
            })

        }
    })
}

// 评论热评、新评排序、分享、
module.exports = {
    read,
    like,
    Unlike,
    setComment,
    likeComment,
    disLikeComment
}