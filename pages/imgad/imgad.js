//获取应用实例
var app = getApp()
Page({
  data: {

  },
  onLoad: function (e) {
    wx.showLoading();
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    console.log(e.id);
    wx.request({
      url: app.globalData.urls + '/banner/one',
      data: {
        bannerId: e.id
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.respCode == "R000") {
          that.setData({
            imgUrl: res.data.respData.linkUrl
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.respMsg,
            showCancel: false
          })
        }
      }
    })
  }
})