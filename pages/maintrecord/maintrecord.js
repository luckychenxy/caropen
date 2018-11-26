// pages/maintrecord/maintrecord.js
const app = getApp();
var base_url = "https://betacd.icarzoo.com/"
Page({
  data: {
    hidden:false,
    maintrecord:[],
    allData:[],
    phone:''
  },
  onLoad: function () {
    this.setData({
      phone:wx.getStorageSync('phone')
    })
    wx.showLoading({
      title: '加载中',
      success:() => {
        this.getData()
      }
    })
  },
  getData(){
    wx.request({
      method: "POST",
      url: base_url + 'Applet_api/Applet_api/get_order_info',
      data:{
        mobile:this.data.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.data)
        if(res.data.code=='200'){
          this.setData({
            maintrecord: res.data.data,
            hidden: false
          })
        }else{
          this.setData({
            hidden: true
          })
        }
        wx.hideLoading();
        wx.stopPullDownRefresh();
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
  onPullDownRefresh() {
    this.getData()
  },
  errorFunction: function (event) {
    var index = event.currentTarget.dataset.index
    var img = 'maintrecord[' + index + '].avatar'
    this.setData({
      [img]: '../../img/factory.png'
    })
  },
  onReachBottom() {
    // var arr = this.data.dataList, max = Math.max(...arr);
    // if (this.data.count < 3) {
    //   for (var i = max + 1; i <= max + 5; ++i) {
    //     arr.push(i);
    //   }
    //   this.setData({
    //     dataList: arr,
    //     count: ++this.data.count
    //   });
    // } else {
    //   wx.showToast({
    //     title: '没有更多数据了！',
    //     image: '../../src/images/noData.png',
    //   })
    // }
    console.log(2)
  },
  detail(e){
    console.log(e.currentTarget.dataset.code)
    wx.navigateTo({
      url: '../state-page/state-page?code=' + e.currentTarget.dataset.code,
    })
  }
})
