//获取应用实例
var app = getApp()
Page({
  data: {
    deskCode:''
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  deleteBind: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/qr/delbind',
      data: {
        eToken: app.globalData.sToken,
        qrId: that.data.sceneId
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.respMsg,
            showCancel: true,
            success: function (res) {
              wx.navigateBack({})
            }
          })
        } else {
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            showCancel: false
          })
        }
      }
    })
  },
  bindSave: function (e) {
    var that = this;
    let deskCode = e.detail.value.deskCode;
    if (deskCode == "") {
      wx.showModal({
        title: '提示',
        content: '桌号不可为空',
        showCancel: false
      })
      return
    }
    var regPos = /^\d+(\.\d+)?$/;
    if (!regPos.test(deskCode)) {
      wx.showModal({
        title: '提示',
        content: '请填写数字',
        showCancel: false
      })
      return
    }
    
    wx.request({
      url: app.globalData.urls + '/qr/binding',
      data: {
        eToken: app.globalData.sToken,
        qrId: that.data.sceneId,
        deskCode: deskCode
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: res.data.respMsg,
            showCancel: true,
            success: function (res) {
              wx.navigateBack({})
            }
          })
        
        }else{
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            showCancel: false
          })
        }
      }
    })

  },
  onLoad: function (e) {
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    console.log('将要绑定的二维码ID-->' + e.sceneId);
    this.setData({
      sceneId: e.sceneId
    })
  }
})