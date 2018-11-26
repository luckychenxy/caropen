// pages/components/jieche/jieche.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeCode:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    alldata:{},
    description:[],//故障描述
    appearance:[],//外观
    tyre_check:[],//轮胎信息
    interior_check:[]//内饰信息
  },
  lifetimes: {
    attached() {
      this.getData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取数据
    getData() {
      console.log(this.data.typeCode)
      wx.request({
        url: app.globalData.carUrl + 'Applet_api/Applet_api/reception_cars',
        method: 'POST',
        data: { ordercode: this.data.typeCode },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success: res => {
          let data=res.data.info;
          console.log(res)
          this.setData({
            alldata: data,
            description: data.description.data,
            appearance: this.changeState(data.appearance.data),
            tyre_check: this.changeState(data.tyre_check.data),
            interior_check: this.changeState(data.interior_check.data)
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
    // 数据调整
    changeState(data){
      data.map(item => {
        let arr = [];
        for (let key in item) {
          if (key != 'Direction_sum' && key != 'Direction' && key != 'images' && item[key] != '')           {
            arr.push(item[key])
          }
        }
        item.arr = arr;
        item.state=true;
      })
      return data
    },
    // 下拉展开收起
    kindToggle:function(e){
      let name=e.target.dataset.list,num=e.target.dataset.id;
      switch(name){
        case 'appearance':
          this.setData({
            appearance: this.toggleData(this.data.appearance,num)
          })
        case 'tyre_check':
          this.setData({
            tyre_check: this.toggleData(this.data.tyre_check, num)
          })
        case 'interior_check':
          this.setData({
            interior_check: this.toggleData(this.data.interior_check, num)
          })
      }
    },
    // 下拉不同数据循环
    toggleData(data,num){
      data.map((item, index) => {
        if (index == num) {
          item.state = !item.state
        }
      })
      return data
    },
    lookPic(e){//查看大图
      wx.previewImage({
        current: e.target.dataset.src, // 当前显示图片的http链接
        urls: [e.target.dataset.src] // 需要预览的图片http链接列表
      })
    }
  }
})
