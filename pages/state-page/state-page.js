// pages/state-page/state-page.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateCode:'',
    info:{},
    typeNum:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.code
    })
    wx.showLoading({//打开loading
      title: '加载中',
      mask:true,
      success:() => {
        this.getData()
      }
    })
  },
  
  getData() {
    console.log(this.data.code)
    wx.request({
      url: app.globalData.carUrl + 'Applet_api/Applet_api/order_detail',
      method: 'POST',
      data: { ordercode: this.data.code },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: res => {
        if(res.data.code=="200"){
          let data = res.data.info;
          console.log(data)
          let info={
            "title":data.type,
            "car_number":data.cars.car_number,
            "car":data.cars.car_brand+' '+data.cars.car_type,
            "time":data.cars.predict_time,
            "imgUrl":data.cars.brand_logo,
            "code":data.store.ordercode,
            "createTime":data.store.create_time,
            "company":data.store.company,
            "headerState":this.pic(data.type)
          }
          this.setData({
            stateCode:data.type,
            info
          })
          wx.hideLoading();
        }else{

        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '网络链接超时，请下拉刷新重试',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  // 默认图
  errorFunction: function () {
    let obj=this.data.info;
    obj.imgUrl = 'http://phpo9mptf.bkt.clouddn.com/374167521730575753.png'
    this.setData({
      info:obj
    })
  },
  // 子组件传父
  updateData(e){
    console.log(e)
    let obj=this.data.info;
    obj.title ='已评价';
    obj.headerState ='pingjia'
    this.setData({
      typeNum:'6',
      stateCode:'已评价',
      info:obj
    })
  },
  //图片class
  pic:function(name){
    switch(name){
      case '已进厂':
        this.setData({
          typeNum:1
        })
        return 'jieche'
      case '已检测':
        this.setData({
          typeNum: 2
        })
        return 'jiance'
      case '施工中':
        this.setData({
          typeNum: 3
        })
        return 'shigong'
      case '已完工':
        this.setData({
          typeNum: 4
        })
        return 'zhijian'
      case '已付款':
        this.setData({
          typeNum: 5
        })
        return 'fukuan'
      case '已完成':
        this.setData({
          typeNum: 6
        })
        return 'pingjia'
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})