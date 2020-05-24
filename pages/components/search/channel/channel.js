// pages/components/search/channel/channel.js
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
    isShowContent:false,
    searchValue:"",
    haveContentList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue(e){
      if(e.detail.value===''){
        this.setData({
          isShowContent:false
        })
      }
      this.setData({
        searchValue:e.detail.value
      })
    },
    search(e){
      if(this.data.searchValue!==""){
        this.setData({
          isShowContent:true
        })
      }else{
        wx.showModal({
          title: '提示',
          content:"请输入您要搜索的内容",
          showCancel:false
        })
      }
      // 根据searchValue，往云数据库发起请求,返回列表给haveContentList，然后往组件中传列表进行渲染
    }
  }
})
