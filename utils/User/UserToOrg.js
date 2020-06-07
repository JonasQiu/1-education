const db = wx.cloud.database()
const _ = db.command

function read(orgId) {
    // 用户(无需登录)查看了这个机构
    // resolve -> bool
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        db.collection('Org').doc(orgId).update({
            data: {
                readCount: _.inc(1)
            },
        }).then(res => {
            resolve(res.stats.updated == 1)
        }).catch(res => {
            reject(res)
        })
    })
}

function collect(orgId) {
    // 用户(需登录)收藏了这个机构,自增机构收藏数，机构id添加到用户信息，并更新本地缓存
    // resolve -> 0:成功 1:收藏失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });
        if (userInfo.myCollection.indexOf(orgId) > -1) {
            resolve({
                status: 0,
                msg: '收藏成功'
            });
        } else {
            db.collection('Org').doc(orgId).update({
                data: {
                    collectCount: _.inc(1)
                },
            }).then(res => {
                if (res.stats.updated == 1) {
                    // 机构->收藏数 更新成功，开始更新用户myCollection字段
                    db.collection('User').doc(userInfo._id).update({
                        data: {
                            myCollection: _.unshift([orgId])
                        }
                    }).then(res => {
                        if (res.stats.updated == 1) {
                            // 用户myCollection字段 更新成功，开始更新本地缓存
                            userInfo.myCollection.unshift(orgId)
                            wx.setStorageSync('userInfo', userInfo)
                            resolve({
                                status: 0,
                                msg: '收藏成功'
                            })
                        } else {
                            resolve({
                                status: 1,
                                msg: '收藏失败'
                            })
                        }
                    }).catch(res => {
                        reject(res)
                    })

                } else {
                    resolve({
                        status: 1,
                        msg: '收藏失败'
                    })
                }
            }).catch(res => {
                reject(res)
            })
        }
    })
}

function Uncollect(orgId) {
    // 用户(需登录) 取消收藏 了这个机构,自减机构收藏数，机构id从用户信息中删除，并更新本地缓存
    // resolve -> 0:取消成功 1:取消失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });

        if (userInfo.myCollection.indexOf(orgId) == -1) {
            resolve({
                status: 0,
                msg: '取消成功'
            })
        } else {
            if (!userInfo.myCollection.remove(orgId)) {
                resolve({
                    status: 1,
                    msg: '取消失败'
                })
            };
            console.log(userInfo.myCollection)
            db.collection('Org').doc(orgId).update({
                data: {
                    collectCount: _.inc(-1)
                },
            }).then(res => {
                if (res.stats.updated == 1) {
                    // 机构->收藏数 更新成功，开始更新用户myCollection字段
                    db.collection('User').doc(userInfo._id).update({
                        data: {
                            myCollection: userInfo.myCollection
                        }
                    }).then(res => {
                        if (res.stats.updated == 1) {
                            // 用户myCollection字段 更新成功,更新本地缓存
                            wx.setStorageSync('userInfo', userInfo)
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


    })
}

// 评论
function setComment(orgId, content) {
    // 用户(需登录)评论这个机构,将评论信息添加到机构comment字段
    // resolve -> 0:评论成功 1:评论失败 2:用户未登录
    // reject -> 处理异常
    return new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo') || resolve({
            status: 2,
            msg: '用户未登录'
        });
        let time = Date.now()
        db.collection('Org').doc(orgId).update({
            data: {
                comment: _.unshift([{
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
function likeComment(orgId, CommentId) {
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
            let commentList = (await db.collection('Org').doc(orgId).get()).data.comment
            for (let i = 0; i < commentList.length; i++) {
                if (commentList[i].Id == CommentId) {
                    commentList[i].likeNum += 1
                    if ((await db.collection('Org').doc(orgId).update({
                            data: {
                                comment: commentList
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
function disLikeComment(orgId, CommentId) {
    // 用户点赞这个评论,通过判断本地缓存，自增评论likeNum
    // resolve -> 0:点赞评论成功 1:点赞评论失败
    // reject -> 处理异常
    return new Promise(async (resolve, reject) => {
        let likeCommentList = wx.getStorageSync('like_comment') || []
        if (!likeCommentList || likeCommentList.indexOf(CommentId) == -1) {
            // 说明没爱过，没爱过取消啥？
            resolve({
                status: 0,
                msg: '取消评论成功'
            })
        } else {
            let commentList = (await db.collection('Org').doc(orgId).get()).data.comment
            for (let i = 0; i < commentList.length; i++) {
                if (commentList[i].Id == CommentId) {
                    // 啊找到要操作的了
                    commentList[i].likeNum -= 1
                    if ((await db.collection('Org').doc(orgId).update({
                            data: {
                                comment: commentList
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

// 还有评论，给评论点赞，评论热评、新评排序功能
module.exports = {
    read,
    collect,
    Uncollect,
    setComment,
    likeComment,
    disLikeComment
}