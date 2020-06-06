const comOrg = require('../../../utils/Org/getOrg')
const comType = require('../../../utils/Type/Type')
const comEco = require('../../../utils/Ecosystem/getPage')
const comUserToEco = require('../../../utils/User/UserToEco')

Component({
  properties: {
    list: {
      type: Array
    },
    typeIndex: {
      type: Number
    },
    titleName: {
      type: String
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    navTop: wx.getSystemInfoSync().statusBarHeight,
    TabCur: 0,
    dataList: [{
      nav: '最新',
      list: []
    }, {
      nav: '最热',
      list: []
    }],
    TabCur: 0,
    // 动画
    toggleDelay: false
  },
  attached() {
    let that = this;
    switch (this.data.typeIndex) {
      case 0:

        break;
      case 1:

        break;
      case 2:
        comEco.getPageList(0, 5).then(res => {
          that.setData({
            dataList: [{
              nav: '最新',
              list: res.ecoList
            }, {
              nav: '最热',
              list: []
            }]
          })
        })
        break;
    }
    // typeIndex: 0:用户 1:机构 2:生态圈
    console.log(this.data.titleName);
    console.log(this.data.typeIndex);
    // console.log(this.data.list = this.getData());

  },
  methods: {

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
    },
    getData() {
      return [{
        "_id": "1TKhss0zkUbIppE36QVzKmwaw0dIHnWDBpsECbat4IzehpRm",
        "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_G2TRpwrPZO0424K9DRWUB6.jpg"],
        "comments": [],
        "content": "如果你对当地的小机构不太了解，请选择当地的大机构，因为大机构可以确保培训质量的下限。如果你对小机构很了解，可以优先小机构，因为小机构里面的头牌老师，可以给你带来巨大惊喜！因为小机构的头牌老师，就是这个机构的顶梁柱，也是中流砥柱！",
        "createTime": {
          "$numberLong": "1587707283301"
        },
        "imgUrls": ["https://oss.197.com/202004/04/sns/moments_G2TRpwrPZO0424K9DRWUB6.jpg"],
        "lastTime": {
          "$numberLong": "1587707283301"
        },
        "likes": [],
        "orgInfo": {
          "orgId": "hk1JO6GO45UEOnVvmoL77axIJBOMPMxVndCNyNs56ZDv3D7z"
        },
        "reads": [],
        "shareNum": 471,
        "title": "对于大机构和小机构的选择",
        "userInfo": {
          "userId": "54bac78c5ecd3a23005318b4110c12b3"
        },
        "likeNum": 0.0,
        "readNum": 0.0
      }, {
        "_id": "CzUXrtWv2NPhIpN54HZuwnl5cuVqGm79xfvDNjIPbyEAKUWV",
        "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_XDGpq9OTRr0413K8YDL7C8.jpg"],
        "comments": [],
        "content": "2018年全国教育培训机构达9.3万所，市场规模达16600亿元，其中教育培训机构包括K12（指学前教育至高中教育的缩写）辅导、婴幼儿教育、兴趣辅导等为8700亿元。在教育培训行业，像新东方、学而思这样的巨头，所占市场份额也没有超过10个点，各种中小机构遍地开花，整个行业呈现出“大市场，小作坊”的态势。简单地说就是教育培训行业不存在所谓的“巨头碾压”的情况。  作者：语文李寨主 链接：https://www.zhihu.com/question/24040068/answer/724182398 来源：知乎 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。",
        "createTime": {
          "$numberLong": "1586776243239"
        },
        "imgUrls": ["https://oss.197.com/202004/03/sns/moments_XDGpq9OTRr0413K8YDL7C8.jpg"],
        "lastTime": {
          "$numberLong": "1586776243239"
        },
        "likes": ["d721728a5ecf306e00564d773e18ace5"],
        "orgInfo": {
          "orgId": "yiaBwBryu3PielTDe5ttCwu114RXjCu036TOulNLZT5TOIDr"
        },
        "reads": [],
        "shareNum": 55,
        "title": "大市场，小作坊",
        "userInfo": {
          "userId": "54bac78c5ecd3a23005318b4110c12b3"
        },
        "likeNum": 1.0,
        "readNum": 0.0
      }, {
        "_id": "G7kOX5y0Yxr3pnGd79gk3KZqdYoVwgl7QvR2SYenw2KQhenT",
        "cimg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/ecoImg/moments_8TVCup48Ys0414K8ZVSB9R.jpg"],
        "comments": [],
        "content": "职能信息机构是行政信息的发布者与接受者之间的媒介。作为管理信息的机构，其作用有：①确定信息需要，即了解行政过程所需要的信息量，信息的形态和内容，信息需要者，信息需要时间，传递渠道等。②搜集和加工信息。搜集是直接从信源获取原始形态的信息，或接收外界传递过来的信息。加工是对搜集的信息进行验证、分析、加工、编制索引、传递和存贮等。③提取和使用信息，即信息的利用过程，用以作出命令指示，拟订办法或制度，以便实施行政活动。④信息的系统管理，对信息系统进行设计、运行和评价的过程。⑤理清信源、畅开信道、明确信宿，使信息迅速、及时、正确地从信息发布者输给信息接收者。",
        "createTime": {
          "$numberLong": "1586867275322"
        },
        "imgUrls": ["https://oss.197.com/202004/03/sns/moments_8TVCup48Ys0414K8ZVSB9R.jpg"],
        "lastTime": {
          "$numberLong": "1586867275322"
        },
        "likes": [],
        "orgInfo": {
          "orgId": "iw01KeULOooP2wBjTz9YLoNTA1fQupcnbkfCnvutqIRI4GqC"
        },
        "reads": [],
        "shareNum": 443,
        "title": "信息机构的作用",
        "userInfo": {
          "userId": "d721728a5ecf306e00564d773e18ace5"
        },
        "likeNum": 0.0,
        "readNum": 0.0
      }]
    }
  }

})