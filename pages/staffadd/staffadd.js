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
    var inviteId = e.detail.value.inviteId;
    if (inviteId == "") {
      wx.showToast({
        title: '请填写邀请人顾客号',
        icon: 'none',
        duration: 2000
      });
      return
    }
    
    wx.request({
      url: app.globalData.urls + '/staff/preAdd',
      data: {
        eToken: app.globalData.sToken,
        uId: inviteId,
        userRole: 2
      },
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: res.data.respMsg,
          showCancel: false,
          success: function () {
            if (res.data.respCode == "R000"){
              wx.navigateBack({})
            }
          }
        });
      }
    })
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    // var foodId = e.foodId;
    // if (foodId) {
    //   // 初始化原数据
    //   wx.showLoading();
    //   wx.request({
    //     url: app.globalData.urls + '/food/info',
    //     data: {
    //       foodId: foodId
    //     },
    //     success: function (res) {
    //       wx.hideLoading();
    //       if (res.data.respCode == "R000") {
    //         that.setData({
    //           foodId: foodId,
    //           foodName: res.data.respData.foodName,
    //           foodPrice: res.data.respData.foodPrice,
    //           paixu: res.data.respData.paixu,
    //           sellStatus: res.data.respData.sellStatus,
    //         });
    //       } else {
    //         wx.showModal({
    //           title: '提示',
    //           content: res.data.respMsg,
    //           showCancel: false
    //         })
    //       }
    //     }
    //   })
    // }
  }
})