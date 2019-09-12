var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipStr:'普通商家',
    butText:'立即加入',
    balance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    wx.request({
      url: app.globalData.urls + '/shop/info',
      data: {
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {

          if (res.data.respData.shopName){
            if (res.data.respData.vipStatus == 1) {
              vipStr: 'VIP商家'
            }
            that.setData({
              shopName: res.data.respData.shopName,
              butText:'修改信息',
              remake: '商家电话：' + res.data.respData.bossTel + '(' + res.data.respData.bossName+')'
            });
          }else{
            console.log('未登录！！');
            that.setData({
              shopName: '您还没有加入我们哦',
              remake: '真诚的欢迎您的到来'
            });
          }

        }else{
          wx.showToast({
            title: res.data.respMsg,
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.urls + '/user/amount',
  //     data: {
  //       token: app.globalData.token
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         that.setData({
  //           balance: res.data.data.balance,
  //           freeze: res.data.data.freeze,
  //           score: res.data.data.score
  //         });
  //       }
  //     }
  //   })
  // },

  joinShop: function () {
    wx.navigateTo({
      url: "/pages/shopadd/shop-add"
    })
  },

  editShop: function (e) {
    wx.navigateTo({
      url: "/pages/address-add/address-add?id=" + e.currentTarget.dataset.id
    })
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
    var amount = e.detail.value.amount;

    if (amount == "" || amount * 1 < 100) {
      wx.showModal({
        title: '错误',
        content: '请填写正确的提现金额',
        showCancel: false
      })
      return
    }
    wx.request({
      url: app.globalData.urls + '/user/withDraw/apply',
      data: {
        token: app.globalData.token,
        money: amount
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showModal({
            title: '成功',
            content: '您的提现申请已提交，等待财务打款',
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
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  }
})