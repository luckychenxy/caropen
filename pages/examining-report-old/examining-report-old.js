// pages/examining-report-old/examining-report-old.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfo: {},//车辆信息
    companyInfo: {},//底部公司信息
    project:{},//维修项目
    resolved:[],//已解决
    unsolved:[],//未解决
    hidden: false,
    noData: false
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
    console.log(1)
    wx.request({
      url: app.globalData.carUrl + 'Applet_api/Applet_api/cars_examining_report2',
      method: 'GET',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          let data = res.data.info;
          this.setData({
            carInfo: data.cars,
            companyInfo: data.store,
            project: data.data,
            resolved: data.resolved,
            unsolved: Object.values(data.unsolved),
            hidden: true,
            noData: false
          })
          console.log(data.resolved, '\n', Object.values(data.unsolved))
        }else{
          this.setData({
            hidden: false,
            noData: true
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