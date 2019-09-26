const app = getApp()
Page({
	data: {
    companyInfo:'北京智合联动科技有限公司',
    versionInfo: 'V-1.0.0',
    // freeze:0,
    // score:0,
    loginName:"点击头像登录"
  },
  onGotUserInfo: function (e) {
    console.log("--->" + app.globalData.userInfo);
    if (app.globalData.userInfo != null) {
      console.log("登录者--->" + app.globalData.userInfo.nickName);
        return;
    }
    console.log(e.detail.errMsg);
    console.log(e.detail.userInfo);
    console.log(e.detail.rawData);
    wx.request({
      url: app.globalData.urls + '/shop/userLogin',
      method:'POST',
      data: {
        wxOpenId: app.globalData.token,
        nickName: e.detail.userInfo.nickName,
        headUrl: e.detail.userInfo.avatarUrl
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          console.log("登录成功！");
          app.globalData.token = res.data.respData;
          app.globalData.userInfo = {
            eToken: res.data.respData,
            nickName: e.detail.userInfo.nickName,
            headUrl: e.detail.userInfo.avatarUrl
          };
        }
      }
    });
    this.setData({
        loginName: e.detail.userInfo.nickName
    });
  },
  onTabItemTap:function(){

  },
  onLoad: function () {
    var that = this;
    //记载公告
    wx.request({
      url: app.globalData.urls + '/notice/show',
      data: {
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            noticeList: res.data.respData
          });
        }
      }
    });

    if (app.globalData.userInfo!=null){
      that.setData({
        loginName: app.globalData.userInfo.userName
      });
      // that.getUserApiInfo();
      // that.getUserAmount();
      // that.checkScoreSign();
      // that.getInfo();
    }
  },
  onShow() {
    // this.getUserApiInfo();
    // this.getUserAmount();
    // this.checkScoreSign();
    // this.getInfo();
		// this.getUserInfo();
    //更新订单状态
    var that = this;
    // wx.request({
      // url: app.globalData.urls + '/order/statistics',
      // data: { token: app.globalData.token },
      // success: function (res) {
      //   if (res.data.code == 0) {
      //     if (res.data.data.count_id_no_pay > 0) {
      //       wx.setTabBarBadge({
      //         index: 3,
      //         text: '' + res.data.data.count_id_no_pay + ''
      //       })
      //     } else {
      //       wx.removeTabBarBadge({
      //         index: 3,
      //       })
      //     }
      //     that.setData({
      //       noplay: res.data.data.count_id_no_pay,
      //       notransfer: res.data.data.count_id_no_transfer,
      //       noconfirm: res.data.data.count_id_no_confirm,
      //       noreputation: res.data.data.count_id_no_reputation
      //     });
      //   }
      // }
    // })
    // wx.getStorage({
    //   key: 'shopCarInfo',
    //   success: function (res) {
    //     if (res.data) {
    //       that.data.shopCarInfo = res.data
    //       if (res.data.shopNum > 0) {
    //         wx.setTabBarBadge({
    //           index: 2,
    //           text: '' + res.data.shopNum + ''
    //         })
    //       } else {
    //         wx.removeTabBarBadge({
    //           index: 2,
    //         })
    //       }
    //     } else {
    //       wx.removeTabBarBadge({
    //         index: 2,
    //       })
    //     }
    //   }
    // })
  },	
  addShopInfo: function () {
    // 更新用户信息
    var that = this;
    if (app.globalData.userInfo == null){
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.navigateTo({
        url: "/pages/addshop/addshop"
      });
    }
  },
  shopFood: function () {
    // 更新店铺菜单
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/shopfood/shopfood"
      });
    }
  },
  shopSet: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/shopset/shopset"
      });
    }
  },
  vip: function () {
    // 更新店铺菜单
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/vip/vip"
      });
    }
  },
  billsCore: function () {
    //订单中心跳转
    var that = this;
    if (app.globalData.userInfo==null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/order-list/order-list"
      });
    }
  },
  gkdd: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/order-list/order-list?currentType=0"
      });
    }
  },
  cclb: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/order-list/order-list?currentType=1"
      });
    }
  },
  dkxd: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/userbill/userbill"
      });
    }
  },
  syfx: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/order-list/order-list?currentType=2"
      });
    }
  },
	getUserInfo: function (cb) {
      console.log("获取用户基础信息");
      var that = this
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              });
            }
          })
        }
      })
},
  scoresign: function () {
    // var that = this;
    // wx.request({
    //   url: app.globalData.urls + '/score/sign',
    //   data: {
    //     token: app.globalData.token
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.getUserAmount();
    //       that.checkScoreSign();
    //     } else {
    //       wx.showModal({
    //         title: '错误',
    //         content: res.data.msg,
    //         showCancel: false
    //       })
    //     }
    //   }
    // })
  },
  relogin:function(){
    var that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        app.globalData.token = null;
        app.login();
        wx.showModal({
          title: '提示',
          content: '重新登陆成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.onShow();
            }
          }
        })
      },
      fail(res){
        //console.log(res);
        wx.openSetting({});
      }
    })
  },
	score: function () {
	  wx.navigateTo({
	    url: "/pages/score/score"
	  })
	},
})