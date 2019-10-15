//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    shopfoodList:[]
  },

  // selectTap: function (e) {
  //   console.log("选择一个菜品-->" + e.currentTarget.dataset.foodId);
  //   var id = e.currentTarget.dataset.foodId;
  //   wx.request({
  //     url: app.globalData.urls +'/user/shipping-address/update',
  //     data: {
  //       eToken:app.globalData.token,
  //       id:id,
  //       isDefault:'true'
  //     },
  //     success: (res) =>{
  //       wx.navigateBack({})
  //     }
  //   })
  // },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/shopfoodadd/shopfoodadd"
    })
  },
  
  editFood: function (e) {
    console.log("修改一个菜品-->" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/shopfoodadd/shopfoodadd?foodId=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    let token = app.globalData.token;
    if (app.globalData.sToken) {
      token = app.globalData.sToken;
    }
    wx.request({
      url: app.globalData.urls +'/food/all',
      data: {
        eToken: token
      },
      success: (res) =>{
        if (res.data.respCode == 'R000') {
          that.setData({
            shopfoodList:res.data.respData,
            loadingMoreHidden: true
          });
        } else{
          that.setData({
            shopfoodList: null,
            loadingMoreHidden: false
          });
        }
      }
    })
  }

})
