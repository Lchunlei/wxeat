var app = getApp()
Page({
  data: {
    shopKpi:{
      toDayIncome: 0,
      toDayBills: 0,
      toDayClient:0
    }
  },
  onShow() {

  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    //加载店铺详细信息
    wx.request({
      url: app.globalData.urls + '/sKpi/today',
      data: {
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            shopKpi: res.data.respData
          });
        }else{
          wx.showToast({
            title: res.data.respMsg,
            icon: 'none',
            duration: 3000
          });
        }
      }
    });
  }

})