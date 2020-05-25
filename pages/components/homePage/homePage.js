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
    position:'英德',
    weather:'阴',
    degree:"26",
    hotSearch:"王后雄(满1000减100)",
    TabCur: 0,
    scrollLeft:0,
    // 宫格列表——第一导航
    navList: [{
      image:"/images/tubiao.png",
      name: 'VR'
    }, {
      image:"/images/tubiao.png",
      name: '录像'
    }, {
      image:"/images/tubiao.png",
      name: '图像'
    }, {
      image:"/images/tubiao.png",
      name: '通知'
    }, {
      image:"/images/tubiao.png",
      name: '版权'
    }],
     // 宫格列表——第二导航
    barList: [{
      image:"/images/tubiao.png",
      name: '学习'
    }, {
      image:"/images/tubiao.png",
      name: '标签'
    }, {
      image:"/images/tubiao.png",
      name: '版权'
    }, {
      image:"/images/tubiao.png",
      name: '自习室'
    }, {
      image:"/images/tubiao.png",
      name: '成绩'
    },{
      image:"/images/tubiao.png",
      name: '学校'
    }, {
      image:"/images/tubiao.png",
      name: '老师'
    }, {
      image:"/images/tubiao.png",
      name: '同学'
    }, {
      image:"/images/tubiao.png",
      name: '通知'
    }, {
      image:"/images/tubiao.png",
      name: '版权'
    }],
     // 卡片列表
    cardList: [{
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    },{
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }, {
      imgUrl:"/images/new01.png",
      desc: '描述',
      assess:'评价',
      price:'价格'
    }],
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
    }
  },
})
