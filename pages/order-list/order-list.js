var app = getApp()
Page({
  data: {
    statusType: ["客单", "上菜单"],
    currentType: 0,
    tabClass: ["", ""],
		bodyHeight:null
  },

  statusTap: function (index) {
    // console.log('*******');
    // console.log(index);
    if(index==0||index==1||index==2||index==3){
      this.setData({
        currentType: index
      });
      this.showView(index);
    }else{
      this.setData({
        currentType: index.currentTarget.dataset.index
      });
      this.showView(index.currentTarget.dataset.index);
    }

  },
  // orderDetail: function (e) {
  //   var orderId = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: "/pages/order-detail/order-detail?id=" + orderId + '&share=1'
  //   })
  // },
  cancelOrder: function (e) {
    //取消订单
    var that = this;
    var userId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定删除此客户订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: app.globalData.urls + '/bill/del',
            data: {
              eToken: app.globalData.sToken,
              userId: userId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.respCode == 'R000') {
                that.onShow();
              }else{
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          })
        }
      }
    });
  },
  toPay: function (e) {
    var that = this;
    var userId = e.currentTarget.dataset.id;
    let token = app.globalData.sToken;
    wx.showModal({
      title: '确定已收款交易完成吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: app.globalData.urls + '/bill/complete',
            data: {
              eToken: token,
              userId: userId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.respCode == 'R000') {
                that.statusTap(that.data.currentType);
              }else{
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          })
        }
      }
    });
  },
  cancelOneBill: function (e) {
    var that = this;
    var billId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定删除此订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: app.globalData.urls + '/bill/delOne',
            data: {
              eToken: app.globalData.sToken,
              billId: billId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.respCode == 'R000') {
                that.statusTap(that.data.currentType);
              } else {
                wx.showToast({
                  title: res.data.respMsg,
                  icon: 'none',
                  duration: 2000
                });
              }
            }
          })
        }
      }
    });
  },
  sendDishe: function (e) {
    var that = this;
    var billId = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.urls + '/bill/sendDishe',
      data: {
        eToken: app.globalData.sToken,
        billId: billId
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.respCode == 'R000') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
          that.statusTap(that.data.currentType);
        } else {
          wx.showToast({
            title: res.data.respMsg,
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },
  onLoad: function (e) {
    var that = this;
    console.log(e.currentType);
    if (e.share) {
      that.setData({ share: e.share });
    }
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    var currentType =0;
    if (e.currentType){
      currentType = e.currentType;
    }
    this.data.currentType = currentType;
    if (currentType) {
      that.setData({
        currentType: currentType
      });
    }
    that.statusTap(currentType);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  // getOrderStatistics: function () {
  //   //统计当前订单数量
  //   var that = this;
  //   wx.request({
  //     url: app.siteInfo.url + app.siteInfo.subDomain + '/order/statistics',
  //     data: { token: app.globalData.token },
  //     success: (res) => {
  //       wx.hideLoading();
  //       if (res.data.code == 0) {
  //         var tabClass = that.data.tabClass;
  //         if (res.data.data.count_id_no_pay > 0) {
  //           tabClass[0] = "red-dot"
  //         } else {
  //           tabClass[0] = ""
  //         }
  //         if (res.data.data.count_id_no_transfer > 0) {
  //           tabClass[1] = "red-dot"
  //         } else {
  //           tabClass[1] = ""
  //         }
  //         if (res.data.data.count_id_no_confirm > 0) {
  //           tabClass[2] = "red-dot"
  //         } else {
  //           tabClass[2] = ""
  //         }
  //         if (res.data.data.count_id_no_reputation > 0) {
  //           tabClass[3] = "red-dot"
  //         } else {
  //           tabClass[3] = ""
  //         }
  //         if (res.data.data.count_id_success > 0) {
  //           //tabClass[4] = "red-dot"
  //         } else {
  //           //tabClass[4] = ""
  //         }

  //         that.setData({
  //           tabClass: tabClass,
  //         });
  //       }
  //     }
  //   })
  // },
  onShow: function (e) {

  },
  showView:function(viewId){
    wx.showLoading();
    var that = this;
    let token = app.globalData.sToken;
    if (viewId == 0) {
      //查看客单
      wx.request({
        url: app.globalData.urls + '/bill/ctmBill',
        data: {
          eToken: token,
          billStatus: viewId
        },
        success: (res) => {
          // console.log(res)
          wx.hideLoading();
          if (res.data.respCode == 'R000') {
            that.setData({
              ctmBills: res.data.respData,
              isEmpty: false,
              // goodsMap: res.data.data.goodsMap
            });
          } else {
            that.setData({
              isEmpty: true
            });
            wx.showToast({
              title: res.data.respMsg,
              icon: 'none',
              duration: 1000
            });
            this.setData({
              ctmBills: null
            });
          }
        }
      })
    } else if (viewId == 1){
      wx.request({
        url: app.globalData.urls + '/bill/list',
        data: {
          eToken: token,
          pageNum:1,
          tabNum: that.data.currentType
        },
        success: (res) => {
          wx.hideLoading();
          if (res.data.respCode == 'R000') {
            that.setData({
              orderList: res.data.respData
            });
          } else {
            wx.showToast({
              title: res.data.respMsg,
              icon: 'none',
              duration: 1000
            });
            this.setData({
              isEmpty: true,
              orderList: null
            });
          }
        }
      })

    } else{


    }

    var winInfo = wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        var statusBarHeight = res.statusBarHeight;
        var titleBarHeight = 0
        if (res.model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        var query = wx.createSelectorQuery();
        query.select('.status-box').boundingClientRect()
        query.exec((res) => {
          var listHeight = res[0].height; // 获取list高度
          that.setData({ bodyHeight: windowHeight - statusBarHeight - titleBarHeight - listHeight });
        })
      }
    });
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  }
})