var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    // foodId: '',
    // foodName: '',
    items: [
      { name: 1, value: '招牌' },
      { name: 2, value: '热销' },
      { name: 3, value: '主食' },
      { name: 4, value: '酒水' },
      { name: 5, value: '其他' }
    ],
    cateId:1,
    foodPrice: 0,
    // paixu: ''
  },
  checkboxChange: function (e) {
    var that = this;
    if (e.detail.value.length > 1) {
      e.detail.value.splice(0, e.detail.value.length - 1);
      for (var i = 0; i <that.data.items.length;i++){
        if (that.data.items[i].name == e.detail.value){
          that.data.items[i].checked = true;
        }else{
          that.data.items[i].checked = false;
        }
      }
      that.setData({
        items: that.data.items,
        cateId: e.detail.value
      });
    }
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var foodName = e.detail.value.foodName;
    var foodPrice = e.detail.value.foodPrice;
    var paixu = e.detail.value.paixu;

    if (foodName == "") {
      wx.showToast({
        title: '请填写菜名',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (foodPrice == "") {
      wx.showToast({
        title: '请填写售价',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (paixu == "") {
      wx.showToast({
        title: '请填写推荐指数',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (paixu > 5 || paixu<1) {
      wx.showToast({
        title: '推荐指数填写错误！',
        icon: 'none',
        duration: 2000
      });
      return
    }
   
    var apiAddoRuPDATE = "add";
    var foodId = that.data.foodId;
    if (foodId) {
      apiAddoRuPDATE = "update";
    } else {
      foodId = 0;
    }
    console.log("单个菜品-->" + apiAddoRuPDATE);
    wx.request({
      url: app.globalData.urls + '/food/addOne',
      method: 'POST',
      data: {
        eToken: app.globalData.token,
        foodId: foodId,
        foodName: foodName,
        cateId: that.data.cateId,
        foodPrice: foodPrice*100,
        paixu: paixu
      },
      success: function (res) {
        if (res.data.respCode != 'R000') {
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            showCancel: false
          })
          return;
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })
  },
  onLoad: function (e) {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    var foodId = e.foodId;
    if (foodId) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        url: app.globalData.urls + '/food/info',
        data: {
          foodId: foodId
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.respCode == "R000") {
            that.setData({
              foodId: foodId,
              foodName: res.data.respData.foodName,
              foodPrice: res.data.respData.foodPrice,
              paixu: res.data.respData.paixu,
              sellStatus: res.data.respData.sellStatus,
            });
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.respMsg,
              showCancel: false
            })
          }
        }
      })
    }
  },
  deleteShopFood: function (e) {
    var that = this;
    var foodId = e.currentTarget.dataset.id;
    var rMsg = '确定要立即出售吗？';
    console.log(that.data.sellStatus)
    if (that.data.sellStatus){
      rMsg = "确定要下架该菜品吗？";
    }
    wx.showModal({
      title: '提示',
      content: rMsg,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.urls + '/food/sell',
            data: {
              eToken: app.globalData.token,
              foodId: foodId
            },
            success: (res) => {
              if (res.data.respCode == "R000") {
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 1000
                });
                wx.navigateBack({})
              }else{
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 3000
                });
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})