var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {

  },
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/notice/details',
      data: {
        nteId: e.id
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            notice: res.data.respData
          });
          WxParse.wxParse('article', 'html', res.data.respData.nteContent, that, 5);
        }
      }
    })
  }
})