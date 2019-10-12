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
    })
  },
  clickScan: function () {
    var that = this;
    // wx.navigateTo({
    //   url: "/pages/sqrbind/sqrbind?sceneId=4"
    // });
    var show;
    wx.scanCode({
      success: (res) => {
        //pages/userbill/userbill?scene=6
        console.log(res);
        let sceneId = res.path.split('=')[1];
        console.log("sceneId--->"+sceneId);
        wx.navigateTo({
          url: "/pages/sqrbind/sqrbind?sceneId=" + sceneId
        });
   
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {

      }
    })
  },
  staffManage: function () {
    wx.showToast({
      title: '功能维护中，请稍后',
      icon: 'none',
      duration: 2000
    })
  }

})