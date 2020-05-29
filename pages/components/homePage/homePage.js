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
      src: '/images/tubiao.png',
      name: '点我'
    }, {
      src: '/images/tubiao.png',
      name: '点我'
    }, {
      src: '/images/tubiao.png',
      name: '点我'
    }, {
      src: '/images/tubiao.png',
      name: '点我'
    }],
    // 宫格列表——第一导航
    navList: [{
      image: "/images/tubiao.png",
      name: 'VR'
    }, {
      image: "/images/tubiao.png",
      name: '录像'
    }, {
      image: "/images/tubiao.png",
      name: '图像'
    }, {
      image: "/images/tubiao.png",
      name: '通知'
    }, {
      image: "/images/tubiao.png",
      name: '版权'
    }],
    // 宫格列表——第二导航
    barList: [{
      image: "/images/tubiao.png",
      name: '学习'
    }, {
      image: "/images/tubiao.png",
      name: '标签'
    }, {
      image: "/images/tubiao.png",
      name: '版权'
    }, {
      image: "/images/tubiao.png",
      name: '自习室'
    }, {
      image: "/images/tubiao.png",
      name: '自习室'
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
    cardList: [{
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }, {
      imgUrl: "/images/new01.png",
      desc: '描述',
      assess: '评价',
      price: '价格'
    }],
  },


  /**
   * 组件的方法列表
   */
  methods: {
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