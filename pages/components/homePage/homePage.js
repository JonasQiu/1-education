// components/homePage/homePage.js
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
    position: '英德',
    weather: '阴',
    degree: "26",
    hotSearch: "王后雄(满1000减100)",
    TabCur: 0,
    scrollLeft: 0,
    // box的列表
    boxList: [{
      src: 'cuIcon-scan',
      name: '扫一扫',
      event: 'scanCode'
    }, {
      src: 'cuIcon-barcode',
      name: '付款码'
      }, {
        src: 'cuIcon-present',
        name: '活动'
      }, {
      src: 'cuIcon-redpacket',
      name: '红包/卡卷'
    }],
    // 宫格列表——第一导航
    FunList: [{
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/小学.png",
      name: '小学'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/初中.png",
      name: '初中'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/高中fix.png",
      name: '高中'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/考研培训fix.png",
      name: '考研培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/职场培训.png",
      name: '职场培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/兴趣培养.png",
      name: '兴趣培养'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/竞赛培训.png",
      name: '竞赛培训'
    }, {
      icon: "cloud://education-1hoqw.6564-education-1hoqw-1302178671/something/心理咨询.png",
      name: '心理咨询'
    }],
    // 轮播图列表
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    // 卡片列表
    orgList: [{
      "_id": "13w9U5oNBJB66vI4UbHmiaZ19nrAeIqSHbRy1u12I1z1d7Ll",
      "cimg": {
        "bgImg": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/bgImg/sns_NvwM2AB31X0509K9Z9VO8F.jpg",
        "logo": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/logo/sns1589007224000010821.jpg",
        "orgImg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_NvwM2AB31X0509K9Z9VO8F.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_EY5O2WGJan0509K9Z9VU2I.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_ylGLefttUI0509K9Z9VYKF.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_2Q0yukYzAx0509K9Z9W45G.jpg"]
      },
      "collectCount": 11,
      "comment": [],
      "description": "龙兴学校是政府教育行政部门批准成立的一所全日制九年义务教育民办学校，校区分别坐落在太原市晋源区晋祠博物馆南侧和阳曲县青龙古镇，晋源校区占地50亩，阳曲校区占地40亩。学校以“让每个生命都精彩”为宗旨，“弘扬国学”为使命，以“国学教育与体制教育深度融合”为特色，坚持“五育”并举，法古开新，日益焕发出生机与活力，是实现“中国梦”精英教育新模式的践行者。",
      "img": {
        "bgimg": "https://ossonline.197.com/202003/06/sns/sns_NvwM2AB31X0509K9Z9VO8F.jpg",
        "images1": ["https://ossonline.197.com/202003/06/sns/sns_NvwM2AB31X0509K9Z9VO8F.jpg", "https://ossonline.197.com/202003/06/sns/sns_EY5O2WGJan0509K9Z9VU2I.jpg", "https://ossonline.197.com/202003/06/sns/sns_ylGLefttUI0509K9Z9VYKF.jpg", "https://ossonline.197.com/202003/06/sns/sns_2Q0yukYzAx0509K9Z9W45G.jpg"],
        "logo": "https://ossonline.197.com/202003/06/sns1589007224000010821.jpg"
      },
      "info": {
        "orgName": "龙兴学校（初中）",
        "phone": "0351-6161771"
      },
      "location": {
        "address": "晋祠镇西门外15号山西省干部疗养院内",
        "lat": 37.704823492263465,
        "lng": 112.43987560272217
      },
      "phone": ["0351-6161771"],
      "price": "",
      "readCount": 35,
      "star": 4.8,
      "time": {
        "businessHours": "",
        "businessType": 1,
        "createTimes": {
          "$numberLong": "1589686352281"
        }
      },
      "type": "3181",
      "userInfo": {
        "userId": "d721728a5ecf306e00564d773e18ace5"
      }
    }, {
      "_id": "15DNZzMeivgIHkYfhIQ2EDaOX1O1PhpN2o8cZtr0KwoMWe9a",
      "cimg": {
        "bgImg": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/bgImg/sns_OqABVByJr10513KA4ZLTH4.jpg",
        "logo": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/logo/sns1589352314000011920.jpg",
        "orgImg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_OqABVByJr10513KA4ZLTH4.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_nCCY5PfuOQ0513KA4ZM07P.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_adQpXL2FXa0513KA4ZNLF1.jpg"]
      },
      "collectCount": 42,
      "comment": [],
      "description": "太原市童乐双语学校位于漪汾街西口往北150米，和平北路106号，是一所全封闭的寄宿制学校。学校地理位置优越，交通便利，设备齐全， 每班安装65英寸教学一体机，让学生体验更加生动形象、丰富多彩的课堂。学校的办学理念是：打好基础教育，奠基学生未来。以“求知、求索、树人、树德”为培养学生的校训。办学16年来，教学成绩优秀，赢得了社会各界人士的赞许。\n学校拥有一支敬业爱岗、爱生如子的优秀教师队伍，每一位走进童乐双语学校的学生，都能够在学习中树立成功的思想，造就成功的心态，掌握成功的知识，培养成功的能力，童乐的学校生活为学生铺垫成功的人生。",
      "img": {
        "bgimg": "https://ossonline.197.com/202003/06/sns/sns_OqABVByJr10513KA4ZLTH4.jpg",
        "images1": ["https://ossonline.197.com/202003/06/sns/sns_OqABVByJr10513KA4ZLTH4.jpg", "https://ossonline.197.com/202003/06/sns/sns_nCCY5PfuOQ0513KA4ZM07P.jpg", "https://ossonline.197.com/202003/06/sns/sns_adQpXL2FXa0513KA4ZNLF1.jpg"],
        "logo": "https://ossonline.197.com/202003/06/sns1589352314000011920.jpg"
      },
      "info": {
        "orgName": "童乐双语小学",
        "phone": "0351-6385555"
      },
      "location": {
        "address": "和平北路106号",
        "lat": 37.87765658103788,
        "lng": 112.51112580299377
      },
      "phone": ["0351-6385555"],
      "price": "",
      "readCount": 126,
      "star": 4.0,
      "time": {
        "businessHours": "",
        "businessType": 1,
        "createTimes": {
          "$numberLong": "1589686368375"
        }
      },
      "type": "3259",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "_id": "1VwIUrlW8zcIdqnYmGtY5owFT9p7rke9FBOqHDNVe3uNJpoM",
      "cimg": {
        "bgImg": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/bgImg/sns_rcI7q74E9L0514KA63T90L.jpg",
        "logo": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/logo/sns1589420088000012128.jpg",
        "orgImg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_rcI7q74E9L0514KA63T90L.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_loYbTbMbvN0514KA63TGXA.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_r5KdQckKH60514KA63TMG7.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_5dlQqRePCW0514KA63TRUX.jpg"]
      },
      "collectCount": 45,
      "comment": [],
      "description": "明德国学实验学校\n1、培养目标：君子人格，领袖风范；身体健美；心态阳光；学习向上。\n2、学校校训：礼乐耕读 六艺大成；礼乐兴邦 耕读传家 孔子六艺 博雅大成\n3、学校特色：书院教育，国学特色；小班建制，个性培养\n4、校园文化：市内桃园，鸟语花香；大道至简，教法自然；大师传道，名师授教，老师解惑；\n5、“三融三汇”教学理念：融孔子教育思想，汇西点军事管理；融皇家官学教育，汇岳麓书院精神；融北大教育气象，汇哈佛学术自由。\n6、“八德大成”教育纲领：\n一贯道统：尧、舜、禹、汤、文、武、周公、孔子。”两大形象：一阴一阳为之道，一文一武为之教。三根扎牢：《弟子规》、《太上感应篇》、《十善业道经》。四段教育：即幼儿养性，童蒙养正，少年养志，成人养德”。五伦总纲：父子有亲，君臣有义，夫妇有别，长幼有序，朋友有信。六字大成：“正心、壮志、强能”。\n7、学校建制：学校设有幼儿、学前、小学、师资培训、国学研究和高峰论坛的一条龙国学教育体系。",
      "img": {
        "bgimg": "https://ossonline.197.com/202003/06/sns/sns_rcI7q74E9L0514KA63T90L.jpg",
        "images1": ["https://ossonline.197.com/202003/06/sns/sns_rcI7q74E9L0514KA63T90L.jpg", "https://ossonline.197.com/202003/06/sns/sns_loYbTbMbvN0514KA63TGXA.jpg", "https://ossonline.197.com/202003/06/sns/sns_r5KdQckKH60514KA63TMG7.jpg", "https://ossonline.197.com/202003/06/sns/sns_5dlQqRePCW0514KA63TRUX.jpg"],
        "logo": "https://ossonline.197.com/202003/06/sns1589420088000012128.jpg"
      },
      "info": {
        "orgName": "明德国学实验小学",
        "phone": "13503506189"
      },
      "location": {
        "address": "府西街109号",
        "lat": 37.875259896992084,
        "lng": 112.54120409488678
      },
      "phone": ["13503506189"],
      "price": "",
      "readCount": 135,
      "star": 4.8,
      "time": {
        "businessHours": "",
        "businessType": 1,
        "createTimes": {
          "$numberLong": "1589686367331"
        }
      },
      "type": "3113",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }, {
      "_id": "1bzBAEsgO5aZAM8o92584LT7zjtQ2vyRJfnZQblWzuYR0HZV",
      "cimg": {
        "bgImg": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/bgImg/sns_q45sC6i2XD0411K8UYS796.jpg",
        "logo": "cloud://education-1hoqw.6564-education-1hoqw-1302178671/logo/sns1586569591000006030.jpg",
        "orgImg": ["cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_q45sC6i2XD0411K8UYS796.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_7Ie2eu8sn50411K8UYSD2U.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_lcIm7mgOlA0411K8UYVIPZ.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_HCV2McUVwv0411K8UYVNT1.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_HqaECVqLly0411K8UYVTSM.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_UhKMvRe7HK0411K8UYW3CB.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_R4BlTaPFaS0411K8UYZOBT.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_BJalw53Uqb0411K8UYZSQC.jpg", "cloud://education-1hoqw.6564-education-1hoqw-1302178671/orgImg/sns_4EBAylR6un0411K8UZT845.jpg"]
      },
      "collectCount": 426,
      "comment": [],
      "description": "太原新力惠中学校，取“新力教育、惠及中华”之意，是经太原市教育部门批准成立的一所含高中、初中、小学、幼儿园在内的一体化全日制寄宿学校，创始于上世纪九十年代，迄今已有20余年的历史。办学20余年来，共向上一级学校输送二十余万名优秀毕业生。学校坚持重基础、重落实、重特长、重人格，办规模适度的精品教育的办学理念，走专家办学、名师任教的办学之路，获得社会的一致好评，连年荣获山西省、太原市教育部门“先进单位”光荣称号，自2010年起，连续三年获得中国教育学会“全国十佳基础教育机构”殊荣。\n\n初中部\n学部理念\n为人生打基础，与学生共发展。初中部落实校长“把学校办成学生成才的摇篮，教师成长的平台，家长受教育的讲堂”的教育思想，牢记“办家长满意的学校，做学生欢迎的老师，创一流的升学纪录”的座右铭。 \n教育教学特色\n创建大成才环境：书法进课堂，每天15分钟坚持不懈。丰富学习生活，提高整体修养，培养浩然正气，积累渊博之才；坚持英语听说强化训练，把课前自练、课堂教学、课后活动有机结合起来，刺激听说兴趣，增强听说信心，提高学生的学习效率。\n优化大和谐课堂：培养“最受学校信赖、最为家长满意、最受学生欢迎”的老师。引导教师关注学生的主体地位和学习中心，落脚于学生的兴趣、需要、方法、习惯、能力和效益，注重课堂上学生的参与度、兴奋度和达成度，以教育智慧启迪学习智慧，成就师生共同发展。\n营造大德育氛围：建立星级宿舍评比制度，培养学生自理生活能力；组建志愿者纪律检查小组，加强学生自律管理；举办青春期生理卫生讲座，营造学生健康成长的校园文化；定期召开主题班会交流活动及班主任经验交流会，探索最佳育人模式；开展多种形式的社区实践活动，提供展示才华、服务社会和贴近生活的舞台；强化回报父母、回报师长等感恩教育，培养学生良好的人格品质。\n\n高中部\n学部理念\n将理想播撒进学生心田，把尊重渗透到教育细节，高中部教师团队以“抓紧三余、杜绝三闲、高声背诵、多练多问”为核心自主学习方法，天天坚持，样样落实，用细节打造精品，用精品奉",
      "img": {
        "bgimg": "https://ossonline.197.com/202001/02/sns/sns_q45sC6i2XD0411K8UYS796.jpg",
        "images1": ["https://ossonline.197.com/202001/02/sns/sns_q45sC6i2XD0411K8UYS796.jpg", "https://ossonline.197.com/202003/06/sns/sns_7Ie2eu8sn50411K8UYSD2U.jpg", "https://ossonline.197.com/202001/02/sns/sns_lcIm7mgOlA0411K8UYVIPZ.jpg", "https://ossonline.197.com/202001/02/sns/sns_HCV2McUVwv0411K8UYVNT1.jpg", "https://ossonline.197.com/202003/06/sns/sns_HqaECVqLly0411K8UYVTSM.jpg", "https://ossonline.197.com/202001/02/sns/sns_UhKMvRe7HK0411K8UYW3CB.jpg", "https://ossonline.197.com/202003/06/sns/sns_R4BlTaPFaS0411K8UYZOBT.jpg", "https://ossonline.197.com/202001/02/sns/sns_BJalw53Uqb0411K8UYZSQC.jpg", "https://ossonline.197.com/202001/02/sns/sns_4EBAylR6un0411K8UZT845.jpg"],
        "logo": "https://ossonline.197.com/202001/02/sns1586569591000006030.jpg"
      },
      "info": {
        "orgName": "新力惠中学校（初中）",
        "phone": "0351-2362359"
      },
      "location": {
        "address": "太原新力惠中学校",
        "lat": 37.74404628520656,
        "lng": 112.58377075195312
      },
      "phone": ["0351-2362359"],
      "price": "",
      "readCount": 1278,
      "star": 3.6,
      "time": {
        "businessHours": "",
        "businessType": 1,
        "createTimes": {
          "$numberLong": "1589686354290"
        }
      },
      "type": "3240",
      "userInfo": {
        "userId": "54bac78c5ecd3a23005318b4110c12b3"
      }
    }],
    typeList: ["全部", "设计", "硬件研发", "外语", "移动开发", "认证考试", "电商平台", "学校", "财会金融", "音乐舞蹈", "互联网产品"]
  },
  created() {
    wx.showLoading({
      title: '正在加载数据...',
    })
  },
  ready() {
    wx.hideLoading()
  },
  attached(e) {
    let that = this
    // 进入页面读取城市
    wx.getStorage({
      key: 'location',
      success(res) {
        that.setData({
          position: res.data.city
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 
    // card列表事件
    orgDetail(e) {
      wx.navigateTo({
        url: `/pages/components/orgDetail/orgDetail?query=${e.currentTarget.dataset.name}`,
      })
    },
    // 扫码
    scanCode(e) {
      wx.scanCode({
        success(res) {
          console.log(res.result)
        }
      })
    },
    // 定位跳转
    positionTem() {
      wx.navigateTo({
        url: '/pages/components/position/position',
      })
    },
    // 顶部搜索跳转
    topSearch() {
      wx.navigateTo({
        url: '/pages/components/search/search',
      })
    },

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  },
})