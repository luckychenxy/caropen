// pages/pay/pay.js
const app = getApp();
var base_url = "https://betacd.icarzoo.com/"
Page({

  /**
   * 组件的初始数据
   */
  data: {
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],
    showMore:false,//查看更多收起
    flag: 4,//点击小星星的个数
    chooseSize: false,//是否显示阴影
    appchooseSize:false,//是否显示评价内容弹窗
    animationData: {},//创建动画
    info:"",//文本框中的字
    list: '',//图片
    upload_picture_list: [],//图片
    starttext:"一般",//评价是否满意
    startLabel:["服务好",'时间快','性价比高','环境优美','价格实惠'],//评价标签
    label1:false,
    label2:false,
    label3:false,
    label4:false,
    label5:false,
    showlabel:"",//传递的选中的标签
    fukuan:false,//是否显示评价的星星
    pingjia:true,//评价后显示星星 
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
    chooseStart:function(e){
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
    preventTouchMove:function() { },
    //获取input中的值添加到data中
    input:function(e){
      this.setData({
        info:e.detail.value
      })
    },
    clicklabel1:function(e){
      this.setData({
        label1:!this.data.label1
      })
    },
    clicklabel2:function(e){
      this.setData({
        label2:!this.data.label2
      })
    },
    clicklabel3:function(e){
      this.setData({
        label3:!this.data.label3
      })
    },
    clicklabel4:function(e){
      this.setData({
        label4:!this.data.label4
      })
    },
    clicklabel5:function(e){
      this.setData({
        label5:!this.data.label5
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
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var tempFiles = res.tempFiles
          //把选择的图片 添加到集合里
          for (var i in tempFiles) {
            tempFiles[i]['upload_percent'] = 0
            tempFiles[i]['path_server'] = ''
            upload_picture_list.push(tempFiles[i])
          }
          //显示
          that.setData({
            upload_picture_list: upload_picture_list,
          });
        }
      })
    },
    //点击上传事件
    uploadimage: function () {
        var starlist=[]
    if (this.data.label1){
      var length = starlist.length;
      starlist[length] = this.data.startLabel[0];
      this.setData({
        showlabel:starlist
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
      //循环把图片上传到服务器 并显示进度       
      for (var j in upload_picture_list) {
        if (upload_picture_list[j]['upload_percent'] == 0) {
          　　　　　　//调用函数
          page.upload_file_server( page, upload_picture_list, j)
        }
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
    //上传方法
    upload_file_server:function ( that, upload_picture_list, j) {
    //上传返回值
    const upload_task = wx.uploadFile({
      // 模拟https
      url: base_url +'Applet_api/Applet_api/comments_submit', //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
      filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
      name: 'file',
      formData: {
        'num': j
      },
      //附近数据，这里为路径     
      success: function (res) {

        var data = JSON.parse(res.data);
        // //字符串转化为JSON  
        if (data.Success == true) {

          var filename = data.file //存储地址 显示

          upload_picture_list[j]['path_server'] = filename
        } else {
          upload_picture_list[j]['path_server'] = filename
        }
        that.setData({
          upload_picture_list: upload_picture_list
        });
      }
    })
    //上传 进度方法
    upload_task.onProgressUpdate((res) => {
      upload_picture_list[j]['upload_percent'] = res.progress
      that.setData({
        upload_picture_list: upload_picture_list
      });
    });
  },
  //根据选的星数判断评价还有标签
  chooseLabel:function(num){
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
  hiddenappbtn:function(){
    this.setData({
      appchooseSize:false
    })
  }
  // methods结束
})
