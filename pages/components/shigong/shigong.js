// pages/components/shigong/shigong.js
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
    allTotal:'',
    repairPro:{},//维修项目
    repairPart:{},//维修配件
    otherPro:{},//其他项目
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
          this.setData({
            allTotal:this.changePrice(data.total),
            repairPro:data.subject,
            repairPart:data.parts,
            otherPro:data.other_total
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
    changePrice(n){
      let num=Number(n);
      if(num<1000){
        num=num.toFixed(2);
      }else if(1000<=num<10000){
        num=(num/1000).toFixed(2)+'千'
      }else{
        num = (num / 10000).toFixed(2) + '万'
      }
      return num
    },
    // 数据循环价格改动
    dataPrice(data){
      data.map( item => {

      })
    }
  }
})
