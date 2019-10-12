//获取应用实例
var app = getApp()
Page({
  data: {
    receiveName:'',
    receiveTel: '',
    receiveAddr:'',
    getNum:''
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var receiveName = e.detail.value.receiveName;
    var receiveTel = e.detail.value.receiveTel;
    var receiveAddr = e.detail.value.receiveAddr;
    var getNum = e.detail.value.getNum;
    var payCode = e.detail.value.payCode;

    if (receiveName == "") {
      wx.showToast({
        title: '请填写收货人',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (receiveTel == "" || receiveTel.length<6) {
      wx.showToast({
        title: '请填写正确手机号',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (receiveAddr == "") {
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (getNum<1) {
      wx.showToast({
        title: '申领数量有误',
        icon: 'none',
        duration: 2000
      });
      return
    }
   
    wx.request({
      url: app.globalData.urls + '/qr/get',
      method: 'POST',
      data: {
        receiveName: receiveName,
        receiveTel: receiveTel,
        receiveAddr: receiveAddr,
        getNum: getNum,
        payCode: payCode
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          
          wx.showModal({
            title: '提示',
            content: '申领已提交，如有疑问请联系客服',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({});
              }
            }
          });

        }else{
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            showCancel: false
          })
          return;
        }
      }
    })
  },
  onLoad: function (e) {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }

  }
})