// pages/components/search/channel/haveContent/orgDetail/orgDetail.js
const comOrg = require('../../../utils/Org/getOrg')

Page({

  /**
   * 页面的初始数据
   */

  data: {
    TabCur: 0,
    infoData: {},
    lesson: [],
    teacher: [],
    active: [],
  },
  // 导航栏active
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //判断返回键的显示
    if (getCurrentPages().length > 1) {
      this.setData({
        isShow: true
      })
    }
    //得到一下传递的参数 
    comOrg.getOrg(options.query).then(res => {
      that.setData({
        infoData: res
      })
    }).catch(res => {

    })
    // 初始化信息课程老师动态list
    // 测试数据，具体数据到时请求
    this.setData({
      lesson: [{
          "ios_price": 1,
          "sub_bgtime": 0,
          "cover_url": "http://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLCjYj3icuJOJWGDdL1hOicZJKiaKQ32Q83JbBO1xplsQKzDATLAZ2LpfTO9oib86dp9o0o/", //课程左边图片
          "has_record_class": 1,
          "course_score": 0,
          "terms": 1,
          "term_id": 100566481,
          "curr_task_no": 0,
          "sub_endtime": 0,
          "type": 5,
          "level_label": 0,
          "expr_flag": 0,
          "time": 0,
          "label_info": [{
              "id": 1001270,
              "category_type": 7,
              "name": "零基础"
            },
            {
              "id": 1001377,
              "category_type": 7,
              "name": "0-3年工作经验"
            },
            {
              "id": 1002596,
              "category_type": 15,
              "name": "初级课"
            },
            {
              "id": 1002316,
              "category_type": 15,
              "name": "高级课"
            },
            {
              "id": 1002212,
              "category_type": 14,
              "name": "JavaScript"
            },
            {
              "id": 1002217,
              "category_type": 14,
              "name": "Typescript"
            },
            {
              "id": 1002219,
              "category_type": 14,
              "name": "Node.js"
            },
            {
              "id": 1001912,
              "category_type": 16,
              "name": "web前端开发工程师"
            },
            {
              "id": 1001915,
              "category_type": 16,
              "name": "前端高级开发工程师"
            }
          ],
          "room_url": "tencent://VisitPublicGroup/?subcmd=VisitPublicGroupEx&amp;param=7B22457874506172616D223A7B226170704964223A223231222C22617070506172616D223A227B5C22436F7572736549645C223A3130303536363438312C5C22736369645C223A307D227D2C2262466F72456475223A312C2267726F757055696E223A3130303536363438312C2276697369746F72223A317D&amp;fuin=1711323390",
          "term_num": 1,
          "bg_class_time": 0,
          "recent_sign_num": 0,
          "total_task_num": 33,
          "room_id": 100566481,
          "see_num": 0,
          "recent_study_num": 0,
          "last_update_time": 1584674103,
          "apply_state": 1,
          "has_graph": 0,
          "course_bit_flag": 16448,
          "fee_type": 2,
          "show_id": 5,
          "trans_flag": 0,
          "agency_name": "渡一教育",
          "cid": 473069,
          "bit_flag": 16448,
          "bgtime": 0,
          "price": 1489800, //价格
          "agency_domain": "duyi.ke.qq.com",
          "share_free_flag": 0,
          "category_label": [
            1001270,
            1001377,
            1002596,
            1002316,
            1002212,
            1002217,
            1002219,
            1001912,
            1001915
          ],
          "endtime": 1734364799,
          "industry2nd": 2004,
          "aid": 46532,
          "certificate_flag": 1,
          "id": 473069,
          "agency_id": 46532,
          "industry1st": 1001,
          "name": "Web前端权威高薪全栈课-保就业班", //课程名字
          "recordtime": 1576484001,
          "industry3rd": 3353,
          "info_type": 0,
          "agency_cover_url": "http://p.qpic.cn/qqcourse/QFzQYCgCrxlGILTrkJeq7YsySGsa1E3A81pfP6CgzVoWUTKp0AdmIFfkbI6B4201/",
          "has_listen_class": 0,
          "course_state": 0,
          "store_num": 0,
          "hidden_flag": 0,
          "apply_num": 98, //购买人数
          "is_being": 0,
          "rating": 0,
          "task_flag": 2
        },
        {
          "ios_price": 1,
          "sub_bgtime": 0,
          "cover_url": "http://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLD4PnjpjjKqKRXGvp8aHIJmdoYZgCMgftRl3Sh5dWJp4wIOuVGzicU3dBTB49RzFhAQ/",
          "has_record_class": 1,
          "course_score": 0,
          "terms": 1,
          "term_id": 100562622,
          "curr_task_no": 0,
          "sub_endtime": 0,
          "type": 5,
          "level_label": 0,
          "expr_flag": 0,
          "time": 0,
          "room_url": "tencent://VisitPublicGroup/?subcmd=VisitPublicGroupEx&amp;param=7B22457874506172616D223A7B226170704964223A223231222C22617070506172616D223A227B5C22436F7572736549645C223A3130303536323632322C5C22736369645C223A307D227D2C2262466F72456475223A312C2267726F757055696E223A3130303536323632322C2276697369746F72223A317D&amp;fuin=1711323390",
          "term_num": 1,
          "bg_class_time": 0,
          "recent_sign_num": 5,
          "total_task_num": 1,
          "room_id": 100562622,
          "see_num": 0,
          "recent_study_num": 6,
          "last_update_time": 1590263556,
          "apply_state": 1,
          "has_graph": 0,
          "course_bit_flag": 16448,
          "fee_type": 2,
          "show_id": 5,
          "trans_flag": 0,
          "agency_name": "渡一教育",
          "cid": 469915,
          "bit_flag": 16448,
          "bgtime": 0,
          "price": 990,
          "agency_domain": "duyi.ke.qq.com",
          "share_free_flag": 0,
          "endtime": 1733759999,
          "industry2nd": 2004,
          "aid": 46532,
          "certificate_flag": 1,
          "id": 469915,
          "agency_id": 46532,
          "industry1st": 1001,
          "name": "Web前端VIP体验课",
          "recordtime": 1575615648,
          "industry3rd": 3338,
          "info_type": 0,
          "agency_cover_url": "http://p.qpic.cn/qqcourse/QFzQYCgCrxlGILTrkJeq7YsySGsa1E3A81pfP6CgzVoWUTKp0AdmIFfkbI6B4201/",
          "has_listen_class": 0,
          "course_state": 0,
          "store_num": 0,
          "hidden_flag": 0,
          "apply_num": 26,
          "is_being": 0,
          "rating": 0,
          "task_flag": 2
        },
        {
          "endtime": 1647532799,
          "ios_price": 0,
          "sub_bgtime": 0,
          "cover_url": "http://10.url.cn/qqcourse_logo_ng/ajNVdqHZLLAMTgkFxqz3YYKBC5FSvOtMkobo2oB99Qj6QIDLM12KtmiacvySs0sBJQ97oT1nVtqg/",
          "industry2nd": 2002,
          "term_id": 0,
          "curr_task_no": 0,
          "sub_endtime": 0,
          "aid": 46532,
          "type": 0,
          "id": 22002,
          "agency_id": 46532,
          "expr_flag": 0,
          "term_num": 2,
          "activity_label": [
            100612,
            100616,
            100613,
            100619,
            100620
          ],
          "industry1st": 1001,
          "bg_class_time": 0,
          "name": "Java高级工程师培养计划 第三期 全阶班 【渡一教育】",
          "total_task_num": 0,
          "industry3rd": 3371,
          "info_type": 1,
          "has_listen_class": 0,
          "course_bit_flag": 0,
          "trans_flag": 0,
          "show_id": 0,
          "fee_type": 2,
          "agency_name": "渡一教育",
          "cid": 22002,
          "bgtime": 1574077714,
          "bit_flag": 0,
          "apply_num": 98,
          "hidden_flag": 0,
          "price": 1199800,
          "is_being": 0,
          "agency_domain": "duyi.ke.qq.com",
          "rating": 0,
          "task_flag": 0
        }
      ],
      teacher: [{
          //cover_picurl,前面要加http:
          "summary": "渡一班主任璐璐，主要负责线上学员班级里的各种事务。",
          "id": 60863972,
          "is_follow": 0,
          "student_num": 638,
          "authentication": 0,
          "name": "渡一班主任璐璐",
          "cover_picurl": "http://10.url.cn/eth/ajNVdqHZLLA44MQ5ibQn3bmylAYU8nWo6qicWoSCBSWl7JCBTbI6W3CgIDJyHkGAChn04icG8ykoB0/",
          "score": 0,
          "followCount": 0,
          "tid": 60863972,
          "hot_courseID": 0,
          "course_num": 41
        },
        {
          "summary": "渡一教育高级讲师  原滴滴出行基础平台部软件工程师     数据平台主要前端负责人      在职期间曾一个人肩负整个团队的前端开发工作  基础扎实  实战经验丰富   对底层javascript有深入的研究   对现流行的技术有独特的见解   有自己的授课风格   责任心超强   立志打造中国顶尖前端学员",
          "id": 1882280081,
          "is_follow": 0,
          "student_num": 243033,
          "authentication": 0,
          "name": "渡一美琪老师",
          "cover_picurl": "http://10.url.cn/eth/ajNVdqHZLLBEwkjibRmWyW6KvAUPQLhpw5wAspQ8h52xObradaVrfV9gnZiaOIibvf86kFOicNWXIRE/",
          "score": 0,
          "followCount": 0,
          "tid": 1882280081,
          "hot_courseID": 0,
          "course_num": 37
        },
        {
          "summary": "渡一教育旗下微信公众平台Duing在线小编，人送外号“内容拖拉机”，负责平台内容产出，带用户解构不一样的科技和代码。",
          "id": 569235375,
          "is_follow": 0,
          "student_num": 0,
          "authentication": 0,
          "name": "渡一新媒体灰灰",
          "cover_picurl": "http://10.url.cn/eth/ajNVdqHZLLAjkYzVzh5315S8xuM3MH7R4iaEglFib3VQfGSgiau7IZAUmfSIjGIqibrRicphjWsSKBW4/",
          "score": 0,
          "followCount": 0,
          "tid": 569235375,
          "hot_courseID": 0,
          "course_num": 55
        }
      ],

    })
    this.setData({
      orgResourcesNav: [{
        // info组件数据
        nav: '机构信息',
      }, {
        // lesson组件数据
        nav: '课程',
        length: this.data.lesson.length
      }, {
        //teacher组件数据
        nav: '老师',
        length: this.data.teacher.length
      }, {
        // active组件数据
        nav: '动态',
        length: this.data.active.length
      }]
    })
  }
})