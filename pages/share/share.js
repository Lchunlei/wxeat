var app = getApp()
Page({
  data: {

  },
  onShow() {
   
  },
  onLoad: function () {
    var that = this;
    //查询是否接到邀请
    wx.request({
      url: app.globalData.urls + '/staff/lookup',
      data: {
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            inviShopName: res.data.respMsg
          });
        }
      }
    });
  },
  acceptBtn: function () {
    var that = this;
    that.cofInvite(1);
  },
  refuseBtn: function () {
    that.cofInvite(0);
  },
  cofInvite:function(confStatus){
    var that = this;
    wx.request({
      url: app.globalData.urls + '/staff/cofInvite',
      data: {
        eToken: app.globalData.token,
        cof: confStatus
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            inviShopName: null
          });
          if (confStatus==1){
            app.globalData.sToken = res.data.respData;
          }
        }
        wx.showToast({
          title: res.data.respMsg,
          icon: 'none',
          duration: 2000
        });
      }
    });
  }

})