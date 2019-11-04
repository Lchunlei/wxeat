//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    cateList: []
  },
  addCate: function () {
    wx.navigateTo({
      url: "/pages/foodcateupdate/foodcateupdate"
    })
  },
  updateCate: function (e) {
    wx.navigateTo({
      url: "/pages/foodcateupdate/foodcateupdate?cateId=" + e.currentTarget.dataset.id + "&cateName=" + e.currentTarget.dataset.catename
    });
  },
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
  },
  onShow: function () {
    this.initFoodCates();
  },
  initFoodCates: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/cate/mine',
      data: {
        eToken: app.globalData.token
      },
      success: (res) => {
        if (res.data.respCode == 'R000') {
          that.setData({
            cateList: res.data.respData,
            loadingMoreHidden: true
          });
        } else {
          that.setData({
            cateList: null,
            loadingMoreHidden: false
          });
        }
      }
    })
  }

})
