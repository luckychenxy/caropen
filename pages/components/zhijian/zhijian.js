// pages/components/zhijian/zhijian.js
const app = getApp();
var base_url = "https://betacd.icarzoo.com/";
const image=[];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeStr:String,
    typeCode:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    allTotal: '',//应付金额
    allPrice: '',//实际金额
    discounts:'',//优惠金额
    repairPro: {},//维修项目
    repairPart: {},//维修配件
    otherPro: {},//其他项目
    company:"",
    showMore: false,//查看更多收起
    flag: 0,//点击小星星的个数
    chooseSize: false,//是否显示阴影
    appchooseSize: false,//是否显示评价内容弹窗
    animationData: {},//创建动画
    info: "",//文本框中的字
    list: '',//图片
    upload_picture_list: [],//图片
    starttext: "一般",//评价是否满意
    startLabel: ["服务好", '时间快', '性价比高', '环境优美', '价格实惠'],//评价标签
    label1: false,
    label2: false,
    label3: false,
    label4: false,
    label5: false,
    showlabel: "",//传递的选中的标签
    fukuan: false,//是否显示评价的星星
    pingjia: false,//评价后显示星星
    avatar:"" 
  },
  attached() {//生命周期
    this.getData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 数据获取
    getData() {
      wx.request({
        url: app.globalData.carUrl + 'Applet_api/Applet_api/order_detail',
        method: 'POST',
        data: { ordercode: this.data.typeCode },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success: res => {
          let data = res.data.info;
          let fukuan,pingjia;
          if (data.type == '已完工'){
            fukuan,pingjia=false;
            
          } else if (data.type == '已付款'){
            fukuan=true,pingjia=false
          }else{
            fukuan=false,pingjia=true
            this.setData({
              flag: data.comments.evaluatetotle,
              avatar: data.store.avatar
            })
          }
          console.log(fukuan,pingjia,data.type)
          console.log(data)
          this.setData({
            fukuan:fukuan,
            pingjia:pingjia,
            allTotal: this.changePrice(data.total),
            allPrice: this.changePrice(data.price),
            discounts: this.changePrice(data.reduce_fee),
            repairPro: data.subject,
            repairPart: data.parts,
            otherPro: data.other_total,
            company:data.store.company,
            
            
          })
          console.log(this.data.repairPro)
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
    // 价格位数修改
    changePrice(n) {
      let num = Number(n);
      if (num < 1000) {
        num = num.toFixed(2);
      } else if (1000 <= num < 10000) {
        num = (num / 1000).toFixed(2) + '千'
      } else {
        num = (num / 10000).toFixed(2) + '万'
      }
      return num
    },
    /**
   * 组件的方法列表
   */
    listToggle: function () {
      this.setData({
        showMore: !this.data.showMore
      })
    },
    changeColor1: function () {
      var that = this;
      that.setData({
        flag: 1
      });
      this.chooseStart();
      this.chooseLabel(1);
    },
    changeColor2: function () {
      var that = this;
      that.setData({
        flag: 2
      });
      this.chooseStart();
      this.chooseLabel(2);
    },
    changeColor3: function () {
      var that = this;
      that.setData({
        flag: 3
      });
      this.chooseStart();
      this.chooseLabel(3);
    },
    changeColor4: function () {
      var that = this;
      that.setData({
        flag: 4
      });
      this.chooseStart();
      this.chooseLabel(4);
    },
    changeColor5: function () {
      var that = this;
      that.setData({
        flag: 5
      });
      this.chooseStart();
      this.chooseLabel(5);
    },
    chooseStart: function (e) {
      // 用that取代this，防止不必要的情况发生
      var that = this;
      // 创建一个动画实例
      var animation = wx.createAnimation({
        // 动画持续时间
        duration: 500,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
      })
      // 将该变量赋值给当前动画
      that.animation = animation
      // 先在y轴偏移，然后用step()完成一个动画
      animation.translateY(200).step()
      // 用setData改变当前动画
      that.setData({
        // 通过export()方法导出数据
        animationData: animation.export(),
        // 改变view里面的Wx：if
        chooseSize: true
      })
      // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 200)
    },
    hideModal: function (e) {
      var that = this;
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      })
      that.animation = animation
      animation.translateY(200).step()
      that.setData({
        animationData: animation.export()

      })
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          chooseSize: false
        })
      }, 200)
    },
    preventTouchMove: function () { },
    //获取input中的值添加到data中
    input: function (e) {
      this.setData({
        info: e.detail.value
      })
    },
    clicklabel1: function (e) {
      this.setData({
        label1: !this.data.label1
      })
    },
    clicklabel2: function (e) {
      this.setData({
        label2: !this.data.label2
      })
    },
    clicklabel3: function (e) {
      this.setData({
        label3: !this.data.label3
      })
    },
    clicklabel4: function (e) {
      this.setData({
        label4: !this.data.label4
      })
    },
    clicklabel5: function (e) {
      this.setData({
        label5: !this.data.label5
      })
    },




    // 图片上传
    //选择图片方法
    uploadpic: function (e) {
      var that = this //获取上下文
      var upload_picture_list = that.data.upload_picture_list
      //选择图片
      wx.chooseImage({
        count: 8,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log(res);
          var tempFiles = res.tempFiles
          //把选择的图片 添加到集合里
          for (var i in tempFiles) {
            upload_picture_list.push(tempFiles[i])
          }
          console.log(upload_picture_list);
          //显示
          that.setData({
            upload_picture_list: upload_picture_list,
          });
        },
        fail:function(res){
          console.log(res);
        }
      })
    },
    //点击上传事件
    uploadimage: function () {
      var starlist = []
      if (this.data.label1) {
        var length = starlist.length;
        starlist[length] = this.data.startLabel[0];
        this.setData({
          showlabel: starlist
        })
      }
      if (this.data.label2) {
        var length = starlist.length;
        starlist[length] = this.data.startLabel[1];
        this.setData({
          showlabel: starlist
        })
      }
      if (this.data.label3) {
        var length = starlist.length;
        starlist[length] = this.data.startLabel[2];
        this.setData({
          showlabel: starlist
        })
      }
      if (this.data.label4) {
        var length = starlist.length;
        starlist[length] = this.data.startLabel[3];
        this.setData({
          showlabel: starlist
        })
      }
      if (this.data.label5) {
        var length = starlist.length;
        starlist[length] = this.data.startLabel[4];
        this.setData({
          showlabel: starlist
        })
      }
      var page = this
      var upload_picture_list = page.data.upload_picture_list
      console.log(upload_picture_list);
      // 判断是否有图片
      if (JSON.stringify(upload_picture_list) === '[]'){
        wx.request({
          url: base_url + 'Applet_api/Applet_api/comments_submit',
          method: "POST",
          data: {
            ordercode: page.data.typeCode,
            images:"",
            content: page.data.info,
            evaluatequality: page.data.label3 ? page.data.flag : "",
            evaluateefficiency: page.data.label2 ? page.data.flag : "",
            evaluateenvironment: page.data.label4 ? page.data.flag : "",
            evaluateprice: page.data.label1 ? page.data.flag : "",
            evaluateservice: page.data.label5 ? page.data.flag : "",
            evaluatetotle: page.data.flag
          },
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if (res.statusCode == 200) {
              page.setData({
                chooseSize: false,
                appchooseSize: true,
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }else{
      //循环把图片上传到服务器 并显示进度       
        page.uploadimg({
          url: base_url + 'Applet_api/Applet_api/uploads_img ',//这里是你图片上传的接口
          path: upload_picture_list//这里是选取的图片的地址数组
        });
      }
       
    },

    // 删除图片
    deleteImg: function (e) {
      let upload_picture_list = this.data.upload_picture_list;
      let index = e.currentTarget.dataset.index;
      upload_picture_list.splice(index, 1);
      this.setData({
        upload_picture_list: upload_picture_list
      });
    },
    //多张图片上传
     uploadimg:function(data){
    var that = this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i].path,
      name: 'images',//这里根据自己的实际情况改
      formData: {
        ordercode: that.data.typeCode
        },//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp.data.replace(/\"/g, ""));
        image.push(resp.data.replace(/\"/g, ""));
        if (success == that.data.upload_picture_list.length){
        wx.request({
          url: base_url + 'Applet_api/Applet_api/comments_submit',
          method: "POST",
          data: {
            ordercode: that.data.typeCode,
            images: image,
            content: that.data.info,
            evaluatequality: that.data.label3?that.data.flag:"",
            evaluateefficiency: that.data.label2 ? that.data.flag : "",
            evaluateenvironment: that.data.label4 ? that.data.flag : "",
            evaluateprice: that.data.label1 ? that.data.flag : "",
            evaluateservice: that.data.label5 ? that.data.flag : "",
            evaluatetotle: that.data.flag
          },
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if(res.statusCode==200){
              that.setData({
                chooseSize:false,
                appchooseSize:true,
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
        console.log(image);
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
    //根据选的星数判断评价还有标签
    chooseLabel: function (num) {
      switch (num) {
        case 1:
          this.setData({
            starttext: "非常不满意",
            startLabel: ["服务态度差", '维修时间长', '价格高', '环境一般', '性价比低']
          })
          break;
        case 2:
          this.setData({
            starttext: "不满意",
            startLabel: ["服务态度差", '维修时间长', '价格高', '环境一般', '性价比低']
          })
          break;
        case 3:
          this.setData({
            starttext: "一般",
            startLabel: ["服务态度差", '维修时间长', '价格高', '环境一般', '性价比低']
          })
          break;
        case 4:
          this.setData({
            starttext: "满意",
            startLabel: ["服务好", '时间快', '性价比高', '环境优美', '价格实惠']
          })
          break;
        default:
          this.setData({
            starttext: "非常满意",
            startLabel: ["服务好", '时间快', '性价比高', '环境优美', '价格实惠']
          })
          break;
      }
    },
    hiddenappbtn: function () {
      let arr={}
      this.triggerEvent('undateData',arr)
      this.setData({
        appchooseSize: false,
        pingjia:true,
        fukuan:false
      })
    },
    errorFunction: function () {
      this.setData({
        avatar: '../../../img/factory.png'
      })
    }
  // methods结束
  }
})
