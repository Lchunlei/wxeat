const app = getApp()
Page({
	data: {
    companyInfo:'雷燕出品-力成精品',
    versionInfo: 'V-1.0.16',
    comHidden:true,
    loginName:"点击头像登录"
  },
  onGotUserInfo: function (e) {
    var that = this;
    if (!app.globalData.token){
      app.login();
    }
    if ('点击头像登录' != that.data.loginName && that.data.userRole && that.data.sToken) {
      console.log("登录者--->" + app.globalData.userInfo.nickName);
      return;
    }
    wx.request({
      url: app.globalData.urls + '/shop/userLogin',
      method:'POST',
      data: {
        wxOpenId: app.globalData.token,
        nickName: e.detail.userInfo.nickName,
        headUrl: e.detail.userInfo.avatarUrl
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content:'系统繁忙，请联系客服',
          showCancel: false
        });
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          console.log("登录成功！"+e.detail.userInfo.nickName);
          app.globalData.token = res.data.respMsg;
          if (res.data.respData.userRole!=1){
            app.globalData.sToken = res.data.respData.wxOpenId;
          }
          if (e.detail.userInfo && e.detail.userInfo.nickName){
            console.log("1");
            app.globalData.userInfo = {
              eToken: res.data.respMsg,
              userRole: res.data.respData.userRole,
              nickName: e.detail.userInfo.nickName,
              headUrl: e.detail.userInfo.avatarUrl
            };
            that.setData({
              loginName: e.detail.userInfo.nickName,
              userRole: res.data.respData.userRole,
              sToken: res.data.respMsg
            });
          }else{
            console.log("2");
            app.globalData.userInfo = {
              eToken: res.data.respMsg,
              userRole: res.data.respData.userRole
            };
            that.setData({
              loginName: '尊贵商家',
              userRole: res.data.respData.userRole,
              sToken: res.data.respMsg
            });
          }
          that.getMyMsg();
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.respMsg,
            showCancel: false
          });
        }
      }
    });
  },
  getComInfo:function(){
    var that = this;
    that.setData({
      comHidden:false
    });
  },
  closeComInfo: function () {
    var that = this;
    that.setData({
      comHidden: true
    });
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
    }
  },
  onShow() {
    var that = this;
    //加载有无邀请信息未处理
    that.getMyMsg();
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
      if (that.data.userRole==1){
        wx.navigateTo({
          url: "/pages/addshop/addshop"
        });
      }else{
        wx.showToast({
          title: '仅店长有权访问',
          icon: 'none',
          duration: 2000
        });
      }
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
  sincome: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (that.data.userRole == 1) {
        wx.navigateTo({
          url: "/pages/sincome/sincome"
        });
      } else {
        wx.showToast({
          title: '仅店长有权访问',
          icon: 'none',
          duration: 2000
        });
      }
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
      if (that.data.userRole == 1) {
        wx.navigateTo({
          url: "/pages/vip/vip"
        });
      } else {
        wx.showToast({
          title: '仅店长有权访问',
          icon: 'none',
          duration: 2000
        });
      }
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
    // try {
    //   wx.requestSubscribeMessage({
    //     tmplIds: ['7a8V3A6vTlst2FAzogfu7m4UxP2n12navvJu27LjQdU'],
    //     success(res) {
    //       console.log('统一发送信息成功');
    //     },
    //     fail(res) {
    //       console.log('失败', res);
    //     }
    //   });
    // } catch (err) {

    // }
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
    wx.showToast({
      title: '请先扫码下单！',
      icon: 'none',
      duration: 2000
    });
  },
  qbdd: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请点击头像登录！',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: "/pages/allbill/allbill"
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
getMyMsg: function () {
  var that = this;
  if (that.data.sToken){
    wx.request({
      url: app.globalData.urls + '/staff/lookup',
      data: {
        eToken: that.data.sToken
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            myMsg: res.data.respData
          });
        } else if (res.data.respCode == 'R502'){
          //登录信息过期
          app.globalData.userInfo == null;
          that.setData({
            loginName: "点击头像登录",
            myMsg: null
          });
        } else{
          that.setData({
            myMsg: null
          });
        }
      }
    })
    }else{
      app.globalData.userInfo == null;
      that.setData({
        loginName: "点击头像登录",
        userRole:null,
        myMsg: null
      });
    }
  }
})