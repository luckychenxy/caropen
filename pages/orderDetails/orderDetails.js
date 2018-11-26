// pages/orderDetails/orderDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfo: {},//车辆信息
    companyInfo: {},//底部公司信息
    resolved: [],//已解决
    unsolved: [],//未解决
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.code
    })
    this.getData()
  },
  getData() {
    console.log(this.data.code)
    wx.request({
      url: app.globalData.carUrl + 'Applet_api/Applet_api/cars_examining_report2',
      method: 'GET',
      data:{ordercode:this.data.code,type:1},
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        if (res.data.code == '200' || res.data.code == '201') {
          let data = res.data.data;
          this.setData({
            carInfo: data.cars,
            companyInfo: data.store,
            resolved: data.resolved,
            unsolved: Object.values(data.unsolved)
          })
          console.log(data)
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