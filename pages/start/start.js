//获取应用实例
var app = getApp();
function countdown(that) {
  var second = that.data.second;
  var home = that.data.home;
  if (home == 0) {
    if (second == 0) {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)

}
Page({
  data: {
    homeTitle:'旺铺掌柜',
    homeRemark:'北京智合联动科技有限公司',
    second: 5,
    home: 0
  },

  goHome: function () {
    this.setData({
      home: 1
    });
    wx.switchTab({
      url: '../index/index'
    })
  },
  // tapBanner: function (e) {
  //   if (e.currentTarget.dataset.id != 0) {
  //     this.setData({
  //       home: 1
  //     });
  //     wx.redirectTo({
  //       url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id + '&share=1'
  //     })
  //   }
  // },
  onLoad: function () {
    console.log(wx.getSystemInfoSync().windowWidth + '-' + wx.getSystemInfoSync().windowHeight);
    var that = this;
    countdown(that);
    wx.request({
      url: app.globalData.urls + '/banner/show',
      data: {
        key: 'mallName',
        banType: 'start'
      },
      success: function (res) {
        if (res.data.respCode == "R000") {
          that.setData({
            sales: res.data.respData
          });
        }
      }
    })

  }
});