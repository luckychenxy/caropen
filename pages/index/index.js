// pages/discount/discount.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuoming:"请于活动有效期到北京汽车维修店北京大学店进行消费", //底部说明
    tel: "010 - 23455778 / 010 - 29292929", //底部电话
    address:"地铁四号线北京大学站", //底部地址
    name:"",//表单名字
    phone:"", //表单电话
    chepai:"",//表单车牌
    yzm:"", //表单验证码
    yzm_tit:"获取验证码", //验证码按钮内容
    yz1:false, //判断姓名
    yz2:false, //判断电话
    yz3:false, //判断验证码
    yz4:false,
    show0:false,// 遮罩层
    show1:false,//表单
    show2: false,
    show3:false, //按钮
    show4:false, //已领取
    show5:true, //过期不显示卷上的内容
    show6:false,//已强完提示 
    show7: true,//电话隐藏
    show8: true,//地址隐藏
    buttons:"点击领取",
    juanName: "北京xxx汽车美容维修有限公司维修有限公司",  //优惠券商家名字
    juanDate:"2018.8.22",
    juanAddress:"",
    juanMoney:200,
    juanUrl:"../../img/juan.png",
    juanType:"",
    openid:"",
    market_id:"",
    logoUrl:"",
    slogan1:"",
    slogan2:"",
    more:false //卷类型>6个
  },
  close1:function(e){
    this.setData({
      show0:false,
      show6:false,
      buttons:"已领完",
      show3:true
    })
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
          yz2:true
        })
      }
    }
    
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
          // _this.setData({
          //   iscode: res.data.data
          // })
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
  getYzm:function(e){
    this.getCode();
  },
  getName:function(e){
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
  getChepai:function(e){
    var chepai = e.detail.value.replace(/\s/g, "")
    this.setData({
      chepai: chepai
    })
    if (e.detail.value == "" || (e.detail.value.trim().length == 0)){
      this.setData({
        yz4:false
      })
    }else{
      this.setData({
        yz4: true
      })
    }
    if (this.data.chepai.length == 7) {
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
    } else if (this.data.chepai.length == 8) {
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
  getJuan:function(e){
    this.setData({
      show1:true,
      show0:true
    })
  },
  formsubmit:function(){
    var that=this
    wx.request({
      url: app.globalData.url + 'check_verify',
      data: {
        mobile:that.data.phone,
        code:that.data.yzm
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success:function(res){
        if(res.data.code=="404"){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }else{
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
              if(res.data.code!="209"){
                that.setData({
                  show1: false,
                  show2: true,
                  show3: true,
                  show4: true,
                  buttons: "已领取"
                })
              }else{
                that.setData({
                  show6:true
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
  close:function(e){
    this.setData({
      show2:false,
      show0:false 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      openid:options.openid,
      market_id:options.market_id
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
        if(res.data.data.address==""){
          that.setData({
            show8:false
          })
        }
        if (res.data.data.phone == "") {
          that.setData({
            show7: false
          })
        }
        if (res.data.data.market_status==2){
          wx.hideLoading()
          that.setData({
            juanUrl:"../../img/over.png",
            show5:false,
            buttons:"已结束",
            show3:true,
            tel: res.data.data.phone,
            shuoming: res.data.data.remark,
            address: res.data.data.address,
            slogan1: res.data.data.slogan.slice(0, 4),
            slogan2: res.data.data.slogan.slice(4, res.data.data.slogan.length)
          })
        } else if (res.data.data.market_status == 3){
          wx.hideLoading()
          that.setData({
            show0:true,
            show6:true
          })
        }else{
          wx.hideLoading()
          if (res.data.data.cv_data.length>6){
            that.setData({
              more:true
            })
          }
          that.setData({
            logoUrl: res.data.data.logo,
            juanDate: res.data.data.end_time,
            tel: res.data.data.phone,
            shuoming: res.data.data.remark,
            address: res.data.data.address,
            juanName: res.data.data.store_name,
            juanType: res.data.data.type_chn,
            juanMoney: res.data.data.cv_data,
            slogan1: res.data.data.slogan.slice(0, 4),
            slogan2: res.data.data.slogan.slice(4, res.data.data.slogan.length),
            juanAddress: res.data.data.address
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
              wx.hideLoading()
              console.log(res)
              if (res.data.data.result != 0) {
                that.setData({
                  show4: true,
                  show3: true,
                  buttons: "已领取"
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
    //   name: "",
    //   phone: "",
    //   yzm: "",
    //   chepai: ""
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
    var that = this
    return {
      title: app.onShareMess.title,
      path: "pages/login/login?market_id=" + that.data.market_id,
      // imageUrl: app.onShareMess.imageUrl,
    }
  }
})