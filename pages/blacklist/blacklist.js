//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    blackList: []
  },
  addBlack: function () {
    wx.navigateTo({
      url: "/pages/blackadd/blackadd"
    })
  },
  delBlack: function (e) {
    var that = this;
    console.log("删除黑名单-->" + e.currentTarget.dataset.id);
    if (e.currentTarget.dataset.id){
      wx.showModal({
        title: '提示',
        content: '确认移出黑名单吗？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.urls + '/black/del',
              data: {
                eToken: app.globalData.sToken,
                userId: e.currentTarget.dataset.id
              },
              success: (res) => {
                if (res.data.respCode == 'R000') {
                  that.initShopBlacks();
                }
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 3000
                });
              }
            })
          }
        }
      });
    }else{
      wx.showToast({
        title: '请输入有效顾客号',
        icon: 'none',
        duration: 3000
      });
    }

  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
  },
  onShow: function () {
    this.initShopBlacks();
  },
  initShopBlacks: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/black/mine',
      data: {
        eToken: app.globalData.sToken
      },
      success: (res) => {
        if (res.data.respCode == 'R000') {
          that.setData({
            blackList: res.data.respData,
            loadingMoreHidden: true
          });
        } else {
          that.setData({
            blackList: null,
            loadingMoreHidden: false
          });
        }
      }
    })
  }

})
