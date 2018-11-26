// pages/discount/discount.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show0:false,//遮罩
    show2:false, //提示成功
    show3:false,//底部成功
    show4:false,//过期提示
    show5:true,//电话隐藏
    show6:true,//地址隐藏
    footerStart:"",
    footerEnd:"",
    footerTel:"",
    footerAdd:"北京市海淀区青云大厦",
    name:"",//表单名字
    yzm: "", //表单验证码
    yzm_tit: "获取验证码", //验证码按钮内容
    yz1: false, //判断姓名
    yz2: false, //判断电话
    yz3: false, //判断验证码
    yz4:false,
    openid:"",
    market_id:"",
    bannerUrl:"", //背景图
    name:"",
    phone:"",
    chepai:"",
    buttons:"马上报名",
    slogan1:"",//标语
    slogan2:"",
    content:"" //活动内容
  },
  formsubmit:function(e){
    var that=this;
    wx.request({
      url: app.globalData.url + 'check_verify',
      data: {
        mobile: that.data.phone,
        code: that.data.yzm
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == "404") {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.request({
            url: app.globalData.url + 'update_user_market',
            data: {
              openid: that.data.openid,
              market_id: that.data.market_id,
              real_name: that.data.name,
              mobile: that.data.phone,
              car_number: that.data.chepai
            },
            method: 'POST',
            header: {
              'content-type': "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              that.setData({
                show2: true,
                show0:true
              })

            },
          })
        }
      }
    })
  },
  getYzmValue: function (e) {
    this.setData({
      yzm: e.detail.value
    })
    if (this.data.yzm.length == 5) {
      this.setData({
        yz3: true
      })
    } else {
      this.setData({
        yz3: false
      })
    }
  },
  close: function (e) {
    this.setData({
      show2: false,
      show0: false,
      show3: true
    })
  },
  // 验证码函数
  getCode: function (e) {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      _this.setData({
        disabled: true
      })
      wx.request({
        data: { mobile: a },
        method: "POST",
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        url: app.globalData.url + "send_verify_code",
        success(res) {
          console.log(res)
          if (res.data.code == "404") {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
          var num = 121;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                yzm_tit: '重新发送',
                disabled: false
              })
            } else {
              _this.setData({
                yzm_tit: num + "s",
                disabled: true
              })
            }
          }, 1000)
        }
      })
    }
  },
  getYzm: function (e) {
    this.getCode();
  },
  getChepai: function (e) {
    var chepai = e.detail.value.replace(/\s/g, "")
   
    this.setData({
      chepai: chepai
    })
    if (e.detail.value == "" || (e.detail.value.trim().length == 0)) {
      this.setData({
        yz4: false
      })
    } 
    // var myreg1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$$/;
    if (this.data.chepai.length ==7) {
      var myreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Za-z]{1}[A-Za-z_0-9]{5}$/;
      if (!myreg.test(this.data.chepai)) {
        wx.showToast({
          title: '请输入正确的车牌号',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.setData({
          yz4: true
        })
      }
    } else if(this.data.chepai.length==8){
      var myreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Za-z]{1}(([0-9]{5}[DFdf]$)|([DFdf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}$))/;
      if (!myreg.test(this.data.chepai)) {
        wx.showToast({
          title: '请输入正确的车牌号',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.setData({
          yz4: true
        })
      }
    }
     
  },
  getPhone: function (e) {
    var phone = e.detail.value.replace(/\s/g, "")
    this.setData({
      phone: phone
    })
    if (e.detail.value == "" || (e.detail.value != 11)) {
      this.setData({
        yz2: false
      })
    } else {
      this.setData({
        yz2: true
      })
    }
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone.length == 11) {
      if (!myreg.test(this.data.phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.setData({
          yz2: true
        })
      }
    }
  },
  getName: function (e) {
    var name = e.detail.value.replace(/\s/g, "")
    this.setData({
      name: name
    })
    if (e.detail.value == "" || (e.detail.value.trim().length == 0)) {
      this.setData({
        yz1: false
      })
    } else {
      this.setData({
        yz1: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      openid: options.openid,
      market_id: options.market_id
    })
    wx.request({
      url: app.globalData.url + 'show_market_info',
      data: {
        market_id: that.data.market_id
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if(res.data.data.dm_phone==""){
          that.setData({
            show5:false
          })
        }
        if(res.data.dm_address==""){
          that.setData({
            show6: false
          })
        }
        if (res.data.data.market_status == 2){
          that.setData({
            slogan1: res.data.data.dm_slogan.slice(0, 4),
            slogan2: res.data.data.dm_slogan.slice(4, res.data.data.dm_slogan.length),
            footerAdd: res.data.data.dm_address,
            footerStart: res.data.data.start_time,
            footerEnd: res.data.data.end_time,
            footerTel: res.data.data.dm_phone,
            content: res.data.data.dm_content,
            logoUrl: res.data.data.logo,
            juanName: res.data.data.store_name,
            show4:true
          })
        }else{
          that.setData({
            logoUrl: res.data.data.logo,
            juanName: res.data.data.store_name,
            slogan1: res.data.data.dm_slogan.slice(0, 4),
            slogan2: res.data.data.dm_slogan.slice(4, res.data.data.dm_slogan.length),
            footerAdd: res.data.data.dm_address,
            footerStart: res.data.data.start_time,
            footerEnd: res.data.data.end_time,
            footerTel: res.data.data.dm_phone,
            content: res.data.data.dm_content
          })
          wx.request({
            url: app.globalData.url + 'if_user_market',
            data: {
              openid: that.data.openid,
              market_id: that.data.market_id
            },
            method: 'POST',
            header: {
              'content-type': "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              if (res.data.data.result == 0) {
                wx.hideLoading()
              } else {
                wx.hideLoading();
                that.setData({
                  show3: true
                })
              }
            }
          })
        }
      },
      fail: function (res) {
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
    // this.setData({
    //   name:"",
    //   phone:"",
    //   yzm:"",
    //   chepai:""
    // })
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
    var that=this
    return {
      title: app.onShareMess.title,
      path: "pages/login/login?market_id="+ that.data.market_id,
      // imageUrl: app.onShareMess.imageUrl
    }
  }
})