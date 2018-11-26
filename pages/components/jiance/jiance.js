// pages/components/jiance/jiance.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeCode: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    description:{},//故障描述
    ait_check:[],//严重问题
    check:[],//问题
    problemLen:0//问题长度
  },
  attached() {//生命周期
    this.getData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      wx.request({
        url: app.globalData.carUrl + 'Applet_api/Applet_api/order_detail',
        method: 'POST',
        data: { ordercode: this.data.code },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success: res => {
          let data = res.data.info;
          console.log(data)
          this.setData({
            description: data.description,
            ait_check: data.tested.ait_check,
            check: data.tested.check,
            problemLen: data.tested.ait_check.length + data.tested.check.length
          })
        },
        fail: err => {
          wx.showToast({
            title: '网络链接超时，请下拉刷新重试',
            icon: 'none',
            duration: 2000
          });
        }
      })
    },
  }
})
