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
              shopId: res.data.respData.shopId,
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
    var that = this;
    console.log(that.data.shopId);
    if (that.data.shopId){
      console.log('修改店铺');
      wx.navigateTo({
        url: "/pages/shopadd/shop-add?shopId=" + that.data.shopId
      })
    }else{
      console.log('新加店铺');
      wx.navigateTo({
        url: "/pages/shopadd/shop-add"
      })
    }
  },
  staffManage: function () {
    wx.showToast({
      title: '功能维护中，请稍后',
      icon: 'none',
      duration: 2000
    })
    // wx.navigateTo({
    //   url: "/pages/staffs/staffs"
    // });
  },
  clickScan: function () {
    var that = this;
    // wx.navigateTo({
    //   url: "/pages/sqrbind/sqrbind?sceneId=4"
    // });
    var show;
    wx.scanCode({
      success: (res) => {
        //pages/userbill/userbill?scene=6
        console.log(res);
        let sceneId = res.path.split('=')[1];
        console.log("sceneId--->" + sceneId);
        wx.navigateTo({
          url: "/pages/sqrbind/sqrbind?sceneId=" + sceneId
        });

      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      },
      complete: (res) => {

      }
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
  getScan: function () {
    var that = this;
    wx.navigateTo({
      url: "/pages/getqr/getqr"
    })
  }
})