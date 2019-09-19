var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data: {
    statusType: ["客单", "上菜单", "月订单", "历史订单"],
    currentType: 0,
    tabClass: ["", "", "", ""],
		bodyHeight:null
  },

  statusTap: function (e) {
    var obj = e;
    var count = 0;
    for (var key in obj) {
      count++;
    }
    if (count == 0) {
      var curType = 0;
    } else {
      console.log('出现Cannot read property "dataset" of undefined;这样的错误是正常的，不用管！');
      var curType = e.currentTarget.dataset.index;
    }
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
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
              eToken: app.globalData.token,
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
    wx.showModal({
      title: '确定已收款交易完成吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: app.globalData.urls + '/bill/complete',
            data: {
              eToken: app.globalData.token,
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
              eToken: app.globalData.token,
              billId: billId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.respCode == 'R000') {
                that.onShow();
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
        eToken: app.globalData.token,
        billId: billId
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.respCode == 'R000') {
          that.onShow();
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
    console.log(e.share);
    console.log(e.currentType);
    if (e.share) {
      that.setData({ share: e.share });
    }
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    var currentType = e.currentType;
    this.data.currentType = currentType;
    if (currentType) {
      that.setData({
        currentType: currentType
      });
    }
    that.statusTap(e);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function () {
    //统计当前订单数量
    var that = this;
    wx.request({
      url: app.siteInfo.url + app.siteInfo.subDomain + '/order/statistics',
      data: { token: app.globalData.token },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          var tabClass = that.data.tabClass;
          if (res.data.data.count_id_no_pay > 0) {
            tabClass[0] = "red-dot"
          } else {
            tabClass[0] = ""
          }
          if (res.data.data.count_id_no_transfer > 0) {
            tabClass[1] = "red-dot"
          } else {
            tabClass[1] = ""
          }
          if (res.data.data.count_id_no_confirm > 0) {
            tabClass[2] = "red-dot"
          } else {
            tabClass[2] = ""
          }
          if (res.data.data.count_id_no_reputation > 0) {
            tabClass[3] = "red-dot"
          } else {
            tabClass[3] = ""
          }
          if (res.data.data.count_id_success > 0) {
            //tabClass[4] = "red-dot"
          } else {
            //tabClass[4] = ""
          }

          that.setData({
            tabClass: tabClass,
          });
        }
      }
    })
  },
	// toConfirmTap:function(e){
	//   let that = this;
	//   let orderId = e.currentTarget.dataset.id;
	//   let formId = e.detail.formId;
	//   wx.showModal({
	//       title: '确认您已收到商品？',
	//       content: '',
	//       success: function(res) {
	//         if (res.confirm) {
	//           wx.showLoading();
	//           wx.request({
	//             url: app.globalData.urls + '/order/delivery',
	//             data: {
	//               token: app.globalData.token,
	//               orderId: orderId
	//             },
	//             success: (res) => {
	//               if (res.data.code == 0) {
	//                 that.onShow();
	//                 // 模板消息，提醒用户进行评价
	//                 let postJsonString = {};
	//                 postJsonString.keyword1 = { value: that.data.orderDetail.orderInfo.orderNumber, color: '#173177' }
	//                 let keywords2 = '您已确认收货，期待您的再次光临！';
	//                 if (app.globalData.order_reputation_score) {
	//                   keywords2 += '立即好评，系统赠送您' + app.globalData.order_reputation_score +'积分奖励。';
	//                 }
	//                 postJsonString.keyword2 = { value: keywords2, color: '#173177' }
	//                 app.sendTempleMsgImmediately(app.siteInfo.assessorderkey , formId,
	//                   '/pages/order-detail/order-detail?id=' + orderId, JSON.stringify(postJsonString));
	//               }
	//             }
	//           })
	//         }
	//       }
	//   })
	// },
  onShow: function (e) {
    // console.log("--展示订单中心数据--");
    // 获取订单列表
    wx.showLoading();
    var that = this;
    // var postData = {
    //   eToken: app.globalData.token
    // };
    // postData.billStatus = that.data.currentType;
    //刷新当前订单统计数量
    // this.getOrderStatistics();
    if (that.data.currentType==0){
      //查看客单
      wx.request({
        url: app.globalData.urls + '/bill/ctmBill',
        data: {
          eToken: app.globalData.token,
          billStatus: that.data.currentType
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
            this.setData({
              ctmBills: null
              // logisticsMap: {},
              // goodsMap: {}
            });
          }
        }
      })

    }
    wx.request({
      url: app.globalData.urls + '/bill/list',
      data: {
        eToken: app.globalData.token,
        tabNum:that.data.currentType
      },
      success: (res) => {
				console.log(res)
        wx.hideLoading();
        if (res.data.respCode == 'R000') {
          that.setData({
            orderList: res.data.respData
          });
        } else {
          this.setData({
            orderList: null
            // logisticsMap: {},
            // goodsMap: {}
          });
        }
      }
    })
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