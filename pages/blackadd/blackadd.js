//获取应用实例
var app = getApp()
Page({
  data: {

  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var addBlackId = e.detail.value.addBlackId;
    if (addBlackId) {
      wx.request({
        url: app.globalData.urls + '/black/add',
        method:'post',
        data: {
          eToken: app.globalData.sToken,
          userId: addBlackId
        },
        success: function (res) {
          wx.showModal({
            title: '提示',
            content: res.data.respMsg,
            showCancel: false,
            success: function () {
              if (res.data.respCode == "R000") {
                wx.navigateBack({})
              }
            }
          });
        }
      })
    }else{
      wx.showToast({
        title: '请填写拉黑顾客号',
        icon: 'none',
        duration: 2000
      });
    }
    
   
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
  }
})