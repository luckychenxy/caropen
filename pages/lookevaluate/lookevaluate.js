// pages/lookevaluate/lookevaluate.js
const app = getApp();
var base_url = "https://betacd.icarzoo.com/"
Page({
  data: {
    flag:5,
    avatar:"",
    startLabel: [],//评价标签
    image:[],
    content:"",
    factory:""
  },
  onLoad: function (options) {
    console.log(options)
    wx.request({
      method: "POST",
      url: base_url + 'Applet_api/Applet_api/comments_detail',
      data: {
        ordercode:options.code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  
      },
      success: (res) => {
        console.log(res);
        console.log(res.data.comments)
        this.setData({
          startLabel:res.data.comments,
          flag: res.data.evaluatetotle,
          img:res.data.comments_img,
          content:res.data.content,
          avatar:res.data.store.avatar,
          image: res.data.comments_img,
          factory:res.data.store.company
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '网络链接超时，请下拉刷新重试',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  errorFunction: function () {
    this.setData({
      avatar: '../../img/factory.png'
    })
  }

})
