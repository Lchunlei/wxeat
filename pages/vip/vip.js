var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreement:'我的你的客户催出',
    payNum: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    // wx.request({
    //   url: app.globalData.urls + '/user/amount',
    //   data: {
    //     token: app.globalData.token
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.setData({
    //         balance: res.data.data.balance,
    //         freeze: res.data.data.freeze,
    //         score: res.data.data.score
    //       });
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // wx.request({
    //   url: app.globalData.urls + '/user/amount',
    //   data: {
    //     token: app.globalData.token
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.setData({
    //         balance: res.data.data.balance,
    //         freeze: res.data.data.freeze,
    //         score: res.data.data.score
    //       });
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var payNum = e.detail.value.payNum;

    if (payNum == "") {
      wx.showModal({
        title: '错误',
        content: '请填写正确的打款单号',
        showCancel: false
      })
      return
    }
    wx.request({
      url: app.globalData.urls + '/shop/vip',
      method:'POST',
      data: {
        eToken: app.globalData.token,
        payNum: payNum
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          wx.showModal({
            title: '成功',
            content: '您的打款已提交，30分钟内审核完毕',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.bindCancel();
              }
            }
          })
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.respMsg,
            showCancel: false
          })
        }
      }
    })
  }
})