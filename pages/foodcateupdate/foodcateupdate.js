//获取应用实例
var app = getApp()
Page({
  data: {
    cateId:'',
    cateName: ''
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  deleteBind: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/cate/del',
      data: {
        eToken: app.globalData.sToken,
        cateId: that.data.cateId
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
    let cateName = e.detail.value.cateName;
    if (cateName == "" || cateName.length>5) {
      wx.showModal({
        title: '提示',
        content: '请填写2~5个字',
        showCancel: false
      })
      return
    }
    if (that.data.cateId){
      //修改分类名称
      wx.request({
        url: app.globalData.urls + '/cate/update',
        method:'POST',
        data: {
          eToken: app.globalData.sToken,
          cateName: cateName,
          cateId: that.data.cateId
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

    }else{
      //新增分类
      wx.request({
        url: app.globalData.urls + '/cate/add',
        method: 'POST',
        data: {
          eToken: app.globalData.sToken,
          cateName: cateName,
          cateId: that.data.cateId
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
    }
  },
  onLoad: function (e) {
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    if (e.cateId){
      this.setData({
        cateId: e.cateId,
        cateName: e.cateName,
        pagetitle: '修改分类'
      });
    }else{
      this.setData({
        pagetitle: '新增分类'
      });
    }
  
  }
})