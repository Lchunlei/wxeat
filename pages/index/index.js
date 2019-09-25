//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
    myfoodList: [],
		indicatorDots: true,
		autoplay: true,
		interval: 6000,
		duration: 800,
		swiperCurrent: 0,
		iphone:false,
		loadingHidden: false, // loading
    paiMingHidden: true, 
		wxlogin: true,
		loadingMoreHidden: false,
		showSearch: true,
    userId:0
	},
	onShow(){
		var that = this
		// app.fadeInOut(this,'fadeAni',0)
		setTimeout(function () {
		  if (app.globalData.usinfo == 0) {
		    that.setData({
		      wxlogin: false
		    })
		    wx.hideTabBar();
		  }
		}, 800)
		//获取购物车商品数量
		app.getShopCartNum()
	},
	onLoad: function() {
		var that = this;
		app.fadeInOut(this,'fadeAni',0)
		if (app.globalData.iphone == true) {
			that.setData({
				iphone: true
			})
		}
    if (app.globalData.uid){
      that.setData({
        userId: app.globalData.uid
      })
    }
		//首页顶部Logo
		wx.request({
      url: app.globalData.urls + '/banner/show',
			data: {
        banType: 'toplogo'
			},
			success: function(res) {
				if (res.data.code == 0) {
					that.setData({
						toplogo: res.data.data[0].picUrl,
						topname: wx.getStorageSync('mallName')
					});
				}
			}
		})
		//首页幻灯片
		wx.request({
      url: app.globalData.urls + '/banner/show',
			data: {
        banType: 'home'
			},
			success: function(res) {
        if (res.data.respCode == 'R000') {
					that.setData({
            banners: res.data.respData
					});
				}
			}
		})
		//4个功能展示位
		wx.request({
      url: app.globalData.urls + '/banner/show',
		  data: {
        banType: 'sale'
		  },
		  success: function (res) {
        if (res.data.respCode == 'R000') {
		      that.setData({
            sales: res.data.respData
		      });
		    }
		  }
		})
		//4个热销广告位
		wx.request({
      url: app.globalData.urls + '/banner/show',
		  data: {
        banType: 'hot'
		  },
		  success: function (res) {
        if (res.data.respCode == 'R000') {
		      that.setData({
            hot: res.data.respData
		      });
		    }
		  }
		})
		//获取推荐商品信息
		// wx.request({
    //   url: app.globalData.urls + '/config/show',
		//   data: {
		//     key: 'topgoods'
		//   },
		//   success: function (res) {
    //     if (res.data.respCode == 'R000') {
		//       that.setData({
    //         topgoods: res.data.respData
		//       });
		//       wx.request({
		//         url: app.globalData.urls + '/goods/list',
		//         data: {
    //           recommendStatus: 1,
    //           pageNum: 1,
		//           pageSize: 10
		//         },
		//         success: function (res) {
		//           that.setData({
		//             goods: [],
		//             loadingMoreHidden: true
		//           });
		//           var goods = [];
    //           if (res.data.respCode != 'R000' || res.data.respData.length == 0) {
		//             that.setData({
		//               loadingMoreHidden: false,
		//             });
		//             return;
		//           }
    //           for (var i = 0; i < res.data.respData.length; i++) {
    //             goods.push(res.data.respData[i]);
		//           }
		//           that.setData({
		//             goods: goods,
		//           });
		//         }
		//       })
		//     }
		//   }
		// })
	},
  // makeBills: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/userbill/userbill?role=1"
  //   });
  // },
	swiperchange: function(e) {
		this.setData({
			swiperCurrent: e.detail.current
		});
	},
	toDetailsTap: function(e) {
		// wx.navigateTo({
		// 	url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
		// })
	},
	tapBanner: function(e) {
		// if (e.currentTarget.dataset.id != 0) {
		// 	wx.navigateTo({
		// 		url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
		// 	})
		// }
	},
	tapSales: function (e) {
    var that = this;
    var batId = e.currentTarget.dataset.id;
    if (batId == 1) {
      if (app.globalData.eatQrId!=null && app.globalData.eatQrId!=0){
        wx.navigateTo({
          url: '/pages/userbill/userbill'
        });
      }else{
        wx.showToast({
          title: '请先扫码占座点餐哦',
          icon: 'none',
          duration: 2000
        });
      }
    } else if (batId == 2){
      wx.showToast({
        title: '您稍等，服务员马上就到',
        icon:'none',
        duration: 2000
      });
    } else if (batId == 3){
      //请求个人点餐详情
      wx.request({
        url: app.globalData.urls + '/bill/rate',
        data: {
          userId: that.data.userId
        },
        success: function (res) {
          if (res.data.respCode == 'R000') {
            that.setData({
              paiMingHidden: false,
              paiduiInfo: res.data.respData
            });
          }else{
            wx.showToast({
              title: res.data.respMsg,
              icon: 'none',
              duration: 2000
            });
          }
        }
      })

    }else{
      wx.showToast({
        title: '您的服务马上就到',
        icon: 'none',
        duration: 2000
      });
    }
	},
  closePaiMing: function () {
    var that = this;
    that.setData({
      paiMingHidden: true
    });
	},
	onPageScroll: function(t) {
		if(t.scrollTop >= 180){
			wx.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: '#ffffff'
			})
			app.fadeInOut(this,'fadeAni',1)
		}else{
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#ffffff'
			})
			app.fadeInOut(this,'fadeAni',0)
		}
	}
})
