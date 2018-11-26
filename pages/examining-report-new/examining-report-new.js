// pages/examining-report-new/examining-report-new.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfo:{},//车辆信息
    companyInfo:{},//底部公司信息
    aitReport:{},//智能检测报告
    aitBadly:[],//ait检测严重
    humanReport:{},//普通检测
    humanBadly:[],//普通检测严重
    aitState:true,
    checkState:true,
    hidden:false,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({//打开loading
      title: '加载中',
      mask: true,
      success: () => {
        this.getData()
      }
    })
  },
  getData() {
    wx.request({
      url: app.globalData.carUrl + 'Applet_api/Applet_api/cars_examining_report',
      method: 'GET',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        if(res.data.code=='200'){
          let data = res.data.info;
          this.setData({
            carInfo: data.cars,
            humanReport: this.changeObj(data.check),
            aitReport: data.ait,
            companyInfo: data.store,
            hidden:true,
            noData:false
          })
          
        }else{
          this.setData({
            hidden:false,
            noData:true
          })
        }
        wx.hideLoading()
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '网络链接超时，请下拉刷新重试',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  // 对象处理
  changeObj:function(data){
    data.abnormal_data=Object.values(data.abnormal_data);
    data.normal_data = Object.values(data.normal_data);
    return data
  },
  // 下拉收起
  toggle:function(e){
    let state=e.target.dataset.state;
    if(state == "ait"){
      this.setData({
        aitState:!this.data.aitState
      })
    }else{
      this.setData({
        checkState: !this.data.checkState
      })
    }
  },
  lookPic(e) {//查看大图
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src] // 需要预览的图片http链接列表
    })
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