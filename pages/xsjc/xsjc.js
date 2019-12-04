//index.js
//获取应用实例
var app = getApp();
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    xsjcUrl:'https://yuxian.oss-cn-qingdao.aliyuncs.com/jiaocheng01.mp4',
    danmuStr:'',
    danmuList: [
      {
        text: '就是喜欢这么简洁的操作',
        color: '#ff0000',
        time: 1
      },
      {
        text: '黑心商家别的一套点餐主机都几千',
        color: '#ff0000',
        time: 1
      },
      {
        text: '手机中的良心程序点赞',
        color: '#ff00ff',
        time: 3
      }]
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    wx.request({
      url: app.globalData.urls + '/dm/find',
      data: {
        useType: '0',
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            xsjcUrl: res.data.respMsg,
            danmuList: res.data.respData
          });
        }
      }
    });
  },
  bindSendDanmu:function(){
    var that = this;
    let nowColor = getRandomColor();
    let nowText = this.inputValue;
    console.log('---' + nowText);
    if (nowText.length>50){
      console.log('内容过长');
      wx.showToast({
        title: '内容过长',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (nowText == that.data.danmuStr){
      console.log('重复提交');
      wx.showToast({
        title: '重复提交',
        icon: 'none',
        duration: 2000
      });
      return;
    }else{
      wx.request({
        url: app.globalData.urls + '/dm/send',
        method:'POST',
        data: {
          useType: '0',
          text: nowText,
          color: nowColor,
          wxOpenId: app.globalData.token
        },
        success: function (res) {
          if (res.data.respCode == 'R000') {
            that.setData({
              danmuStr: nowText
            });
          }
          wx.showToast({
            title: res.data.respMsg,
            icon: 'none',
            duration: 3000
          });
        }
      });
    }
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
    console.log('>>>' + e.detail.value);
  },
  onShow : function () {
  
  }

})
