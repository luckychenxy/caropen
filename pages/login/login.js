// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    code:"",
    market_id:"", //通过二维码获取的参数
    res:"",//获取关联优惠券
    show:false //直接进入显示的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = decodeURIComponent(options.market_id);
    console.log(a)
    console.log(options)
    // a = a.substr(a.length - 1, 1);
    // a=Number(a);
    // console.log(a)
    
      this.setData({
        market_id: a
      })
    

    wx.showLoading({
      title: '加载中',
    })
    let that = this
    wx.login({
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: app.globalData.url + 'get_openid_bycode_wxapi',
          data: {
            code: res.code,
          },
          method: 'POST',
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 200) {
              that.setData({
                sessionKey: res.data.data.session_key,
                openid: res.data.data.openid
              })
          
              if (that.data.market_id !="undefined"){
                wx.request({
                  url: app.globalData.url + 'get_market_type',
                  data: {
                    market_id: that.data.market_id,
                  },
                  method: 'POST',
                  header: {
                    'content-type': "application/x-www-form-urlencoded"
                  },
                  success:function(res){
                    wx.hideLoading()
                    console.log(res)
                    if(res.data.code==200){
                      if (res.data.data.result ==1) {
                        wx.reLaunch({
                          url: '../index/index?openid=' + that.data.openid+'&market_id='+that.data.market_id,
                        })
                      } else {
                        wx.reLaunch({
                          url: '../discount/discount?openid=' + that.data.openid + '&market_id=' + that.data.market_id
                        })
                      }
                    }
                  },
                  fail: function (res) {
                    that.setData({
                      status: false
                    })
                    wx.showModal({
                      title: '提示',
                      showCancel: false,
                      content: '网络连接错误',
                      confirmColor: '#4A90E2',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                })
              }else{
                wx.hideLoading()
                that.setData({
                  show:true
                })
              }
            }
          },
          fail: function (res) {
            that.setData({
              status: false
            })
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '网络连接错误',
              confirmColor: '#4A90E2',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      }
    })
  },
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
    return {
      title: app.onShareMess.title,
      path: app.onShareMess.path
    }
  }
})