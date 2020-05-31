// components/talk/talk.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    navTop: wx.getSystemInfoSync().statusBarHeight,
    // 导航栏
    TabCur: 0,
    scrollLeft: 0,
    ecoNavList: ['推荐', '关注', '热帖', '官方'],
    recommendList: [{
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n——————————————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n——————————————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_5PldphJx9u0528KAQVULPU.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_wMLiv9AgHf0528KAQVULSS.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8ZeATVGEwL0528KAQVULU7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "瓦力工厂3-5岁少儿大颗粒积木空间构建课程",
      "createTime": 1590676727430,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_5PldphJx9u0528KAQVULPU.jpg", "https://oss.197.com/202005/19/sns/moments_wMLiv9AgHf0528KAQVULSS.jpg", "https://oss.197.com/202005/19/sns/moments_8ZeATVGEwL0528KAQVULU7.jpg", "https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "lastTime": 1590676797430,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 406,
      "title": "3-5岁大颗粒课程 六一钜惠",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    },{
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n——————————————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_5PldphJx9u0528KAQVULPU.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_wMLiv9AgHf0528KAQVULSS.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8ZeATVGEwL0528KAQVULU7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "瓦力工厂3-5岁少儿大颗粒积木空间构建课程",
      "createTime": 1590676727430,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_5PldphJx9u0528KAQVULPU.jpg", "https://oss.197.com/202005/19/sns/moments_wMLiv9AgHf0528KAQVULSS.jpg", "https://oss.197.com/202005/19/sns/moments_8ZeATVGEwL0528KAQVULU7.jpg", "https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "lastTime": 1590676797430,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 406,
      "title": "3-5岁大颗粒课程 六一钜惠",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    }],
    attentionList: [{
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n———————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_5PldphJx9u0528KAQVULPU.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_wMLiv9AgHf0528KAQVULSS.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8ZeATVGEwL0528KAQVULU7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "瓦力工厂3-5岁少儿大颗粒积木空间构建课程",
      "createTime": 1590676727430,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_5PldphJx9u0528KAQVULPU.jpg", "https://oss.197.com/202005/19/sns/moments_wMLiv9AgHf0528KAQVULSS.jpg", "https://oss.197.com/202005/19/sns/moments_8ZeATVGEwL0528KAQVULU7.jpg", "https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "lastTime": 1590676797430,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 406,
      "title": "3-5岁大颗粒课程 六一钜惠",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    }],
    hotList: [{
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，核心秘密之一\n——————————————\n考前集中营———刷题\n组长带队训练讲授\n提分技巧宝典\n答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_5PldphJx9u0528KAQVULPU.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_wMLiv9AgHf0528KAQVULSS.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8ZeATVGEwL0528KAQVULU7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "瓦力工厂3-5岁少儿大颗粒积木空间构建课程",
      "createTime": 1590676727430,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_5PldphJx9u0528KAQVULPU.jpg", "https://oss.197.com/202005/19/sns/moments_wMLiv9AgHf0528KAQVULSS.jpg", "https://oss.197.com/202005/19/sns/moments_8ZeATVGEwL0528KAQVULU7.jpg", "https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "lastTime": 1590676797430,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 406,
      "title": "3-5岁大颗粒课程 六一钜惠",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    }],
    officialList: [{
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "comments": [],
      "content": "疫情耽误三个月，刷题一月补回来。\n学大教育核心秘密之一\n——————————————\n考前答题踩分100%",
      "createTime": 1590661267605,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_HzKh6Flhs20528KAQMMQMB.jpg"],
      "lastTime": 1590661967605,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 373,
      "title": "中考刷题班0351-3787792",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_5PldphJx9u0528KAQVULPU.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_wMLiv9AgHf0528KAQVULSS.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8ZeATVGEwL0528KAQVULU7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "comments": [],
      "content": "瓦力工厂3-5岁少儿大颗粒积木空间构建课程",
      "createTime": 1590676727430,
      "imgUrls": ["https://oss.197.com/202005/19/sns/moments_5PldphJx9u0528KAQVULPU.jpg", "https://oss.197.com/202005/19/sns/moments_wMLiv9AgHf0528KAQVULSS.jpg", "https://oss.197.com/202005/19/sns/moments_8ZeATVGEwL0528KAQVULU7.jpg", "https://oss.197.com/202005/19/sns/moments_t1wXOixG6U0528KAQVULVQ.jpg"],
      "lastTime": 1590676797430,
      "likes": [],
      "orgInfo": {
        "orgId": "wfPeOqBJtPDUjMgrKIGxyil8LCgrOdYO8W5xTuZtrDBbsSaP"
      },
      "reads": [],
      "shareNum": 406,
      "title": "3-5岁大颗粒课程 六一钜惠",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    }],
    // 查找数据
    searchValue: '',
    // 点赞是否显示
    like: false
  },
  attached() {
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 导航栏
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      })
    },
    //搜索功能
    getValue(e) {
      let that = this;
      console.log('value')
      if (that.timer) {
        clearTimeout(that.timer)
      }
      this.setData({
        searchValue: e.detail.value || ''
      })
      that.timer = setTimeout(function () {
        if (e.detail.value != '') {
          that.search(e)
        }
      }, 700)
    },
    search(e) {
      console.log('search')

      if (this.data.searchValue !== "") {
        // let that = this;
        // comOrg.searchOrg(that.data.searchValue).then(res => {
        //   that.setData({
        //     //数据初始化
        //     searchList: res,
        //   })
        // }).catch(res => {
        //   wx.showModal({
        //     title: '提示',
        //     content: "没有搜索到更多的内容",
        //     showCancel: false
        //   })
        // })
      } else {
        wx.showModal({
          title: '提示',
          content: "请输入您要搜索的内容",
          showCancel: false
        })
      }
      // 根据searchValue，往云数据库发起请求,返回列表给haveContentList，然后往组件中传列表进行渲染
    },
    // 详情页跳转，传递参数用户id
    naviToDetail(e) {
      wx.navigateTo({
        url: `/pages/components/ecoDetail/ecoDetail?query=${e.currentTarget.dataset.query}`,
      })
    },
    //点赞功能
    addLike(e) {
      this.setData({
        like: !this.data.like
      })
      // 数据传递
    }
  }
})