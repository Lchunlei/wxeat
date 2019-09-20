var app = getApp()
Page({
  data: {

  },

  onShow() {

  },
  // //签到按钮
  // scoresign: function () {
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.urls + '/score/info',
  //     data: {
  //       token: app.globalData.token
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         that.onLoad();
  //         that.checkScoreSign();
  //       }
  //       wx.showToast({
  //         title: '签到成功',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //     }
  //   })
  // },
  // checkScoreSign: function () {
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.urls + '/score/today-signed',
  //     data: {
  //       token: app.globalData.token
  //     },
  //     success: function (res) {

  //       if (res.data.code == 0) {
  //         that.setData({
  //           ci: 1
  //         });
  //       }
  //       wx.request({
  //         url: app.globalData.urls + '/score/sign/logs',
  //         data: {
  //           token: app.globalData.token,
  //         },
  //         success: function (res) {
  //           if (res.data.code == 0) {
  //             that.setData({
  //               score_sign_continuous: res.data.data.result[0].continuous
  //             });
  //           }
  //         }
  //       })
  //     }
  //   })

  // },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    //加载店铺详细信息
    wx.request({
      url: app.globalData.urls + '/shop/info',
      data: {
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            shopInfo: res.data.respData
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
    //获取签到规则
    // wx.request({
    //   url: app.globalData.urls + '/score/sign/rules',
    //   data: {
    //   },
    //   success: function (res) {

    //     if (res.data.code == 0) {
    //       that.setData({
    //         rules: res.data.data
    //       });
    //     }
    //   }
    // })
    //获取签到记录

    /*wx.request({
      url: app.siteInfo.url + app.siteInfo.subDomain + '/score/sign/logs',
      data: {
        token:app.globalData.token,
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.result[0].continuous
          });
        }
      }
    })*/
  },
  clickScan: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
        
        that.setData({
          show: this.show
        })
        console.log(show);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {

      }
    })
  },
  qrBinding: function () {
    wx.navigateTo({
      url: "/pages/coupons/coupons"
    });
  },
  staffManage: function () {
    wx.showToast({
      title: '功能维护中，请稍后',
      icon: 'none',
      duration: 2000
    })
    // wx.navigateTo({
    //   url: "/pages/staffs/staffs"
    // });
  }

})