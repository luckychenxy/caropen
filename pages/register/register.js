//index.js
//获取应用实例

var appid ='wx2a25f53fb8fc5ccc';
const app = getApp()
var base_url ="https://betacd.icarzoo.com/"
Page({
 data:{
//判断小程序的API，回调，参数，组件等是否在当前版本可用。
   canIUse: wx.canIUse('button.open-type.getUserInfo'),
   phoneshow:false,//判断是直接授权登录还是用手机号登录
   phone: "",//获取到的手机号
   yzm: "",
   currentTime: 60,//限制倒计时60s
   isClick: false,//获取验证码默认可以点击
   yzmtext: "获取验证码",
   yzmerror: true,//验证码错误显示
   sessionKey:"",
   openId:'',
   checked:true,
   unionId:'',
   loginState:0,
   loginBtn:false
 },
  onLoad: function () {
    // 查看是否授权
    let that=this;
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:res=>{
              console.log(res);
              that.setData({
                loginBtn:true
              })
              let value = wx.getStorageSync('phone');
              console.log(value)
              if (value != '' && value && value != undefined) {
               
              }else{
                console.log(value)
                that.setData({
                  phoneshow: true
                })
              }
            }
          })
        }else{
          if(that.data.loginState==1){
            that.setData({
              loginBtn: false
            })
            wx.showModal({
              title: '微信授权提醒',
              content: '小程序正常运行需要获取授权信息,请在设置这哪个打开用户信息授权',
              showCancel:false,
              confirmText:'去设置',
              confirmColor:'#6F85FF',
              success: res => {
                if(res.confirm){
                  console.log(23)
                  wx.openSetting({
                    success: res => {
                      console.log(res.authSetting);
                      if (res.authSetting['scope.userInfo']){
                        that.setData({
                          loginState: 0
                        })
                      }else{
                        that.setData({
                          loginState: 1
                        })
                      }
                      that.onLoad()
                    }
                  })
                }
              }

            })
          }
        }
      }
    })
    // 登录
    var value = wx.getStorageSync('phone');
    console.log(Boolean(value))
    if(value!=''&& value && value!=undefined){
      wx.redirectTo({
        url: '../maintrecord/maintrecord'
      })
    }else{
      
    }
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log("是");
        this.setData({
          phoneshow:true,
          loginBtn:true
        })
    } else {
      //用户按了拒绝按钮
      console.log("否");
      this.setData({
        loginState:1
      })
      this.onLoad()
    }
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码input中的值
  yzmInput: function (e) {
    this.setData({
      yzm: e.detail.value
    })
  },

  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;

    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      //手机号验证码请求
      wx.request({
        url: base_url+'Applet_api/Applet_api/send_verification_code',
        method:"POST",
        data: {mobile:phone},
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  
        },
        success:res=>{
          console.log(res)
        },
        fail:res=>{
          console.log(res)
        }
      })
      //当手机号正确的时候提示用户短信验证码已经发送
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });

      //设置一分钟的倒计时
      var interval = setInterval(function () {
        currentTime--; //每执行一次让倒计时秒数减一
        that.setData({
          yzmtext: currentTime + 's', //按钮文字变成倒计时对应秒数

        })
        //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            yzmtext: '重新发送',
            currentTime: 61,
            disabled: false,
            color: '#929fff'
          })
        }
      }, 1000);

    };

    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })

      that.setData({
        disabled: false,
        color: '#929fff'
      })
      return;

    };
  },
  register: function (e) {
    var that = this;
    console.log(that.data.phone, that.data.yzm)
    if (that.data.phone.length == 0 || that.data.yzm.lenth == 0) {
      wx.showToast({
        title: '手机号或验证码不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      console.log(that.data.openId)
      wx.request({
        url: base_url +'Applet_api/Applet_api/register',
        method:"POST",
        data:{
          mobile: that.data.phone,
          verification_code: that.data.yzm,
          open_id:that.data.openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  
        },
        success:res=>{
          console.log(res);
          wx.setStorage({
            key: "phone",
            data: this.data.phone
          })
          if(this.data.unionId!=''){
            this.sendUid(this.data.unionId);
          }else{
            // 登录成功跳转页面
            wx.redirectTo({
              url: '../maintrecord/maintrecord'
            })
          }
        },
        fail:res=>{
          console.log(res);
        }
      })

    }
  },
  goback:function(){
    this.setData({
      phoneshow:false
    })
  },
  checkeds:function(){
    this.setData({
      checked:!this.data.checked
    })
  },
  // 发送uid
  sendUid(data){
    console.log(data)
    console.log(this.data.phone)
   // console.log(this.data.phone, this.data.openId)
    wx.request({
      url: base_url + 'Applet_api/Applet_api/add_unionId',
      method: "POST",
      data: {
        mobile: this.data.phone,
        open_id: this.data.openId,
        unionId: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  
      },
      success: res => {
        console.log(res);
        // 登录成功跳转页面
        wx.redirectTo({
          url: '../maintrecord/maintrecord'
        })
      },
      fail: res => {
        console.log(res);
      }
    })
  }
})
