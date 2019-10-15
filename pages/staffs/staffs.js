//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    staffList: []
  },
  addStaff: function () {
    wx.navigateTo({
      url: "/pages/staffadd/staffadd"
    })
  },
  delStaff: function (e) {
    var that = this;
    console.log("删除店员-->" + e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '确认删除该员工吗？',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.urls + '/staff/del',
            data: {
              eToken: app.globalData.token,
              shopId: e.currentTarget.dataset.id
            },
            success: (res) => {
              if (res.data.respCode == 'R000') {
                that.initShopStaffs();
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
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
  },
  onShow: function () {
    this.initShopStaffs();
  },
  initShopStaffs: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/staff/all',
      data: {
        eToken: app.globalData.token
      },
      success: (res) => {
        if (res.data.respCode == 'R000') {
          that.setData({
            staffList: res.data.respData,
            loadingMoreHidden: true
          });
        } else {
          that.setData({
            staffList: null,
            loadingMoreHidden: false
          });
        }
      }
    })
  }

})
