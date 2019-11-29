//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    xsjcUrl:'https://yuxian.oss-cn-qingdao.aliyuncs.com/jiaocheng01.mp4',
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
            danmuList: res.data.respData
          });
        }
      }
    });
  },
  onShow : function () {
  
  }

})
