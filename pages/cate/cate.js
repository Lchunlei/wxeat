//index.js
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 8000,
    duration: 800,
    swiperCurrent: 0,
    selectCurrent: 0,
    activeCategoryId: 0,
    loadingMoreHidden: true,
    search: true,
    nonehidden: true,
    searchidden: true
  },

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  levelClick: function (e) {
    wx.navigateTo({
      url: "/pages/cate-list/cate-list?id=" + e.currentTarget.dataset.id
    })
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  search: function(e){
    var that = this
    wx.request({
      url: app.globalData.urls + '/shop/goods/list',
      data: {
        nameLike: e.detail.value
      },
      success: function (res) {
        if (res.data.code == 0) {
          var searchs = [];
          for (var i = 0; i < res.data.data.length; i++) {
            searchs.push(res.data.data[i]);
          }
          that.setData({
            searchs: searchs,
            searchidden: false,
            nonehidden: true
          });
        }else{
          that.setData({
            searchidden: true,
            nonehidden: false
          });
        }
      }
    })
    
  },
  searchfocus: function(){
    this.setData({
      search: false,
      searchinput: true
    })
  },
  searchclose: function(){
    this.setData({
      search: true,
      searchinput: false
    })
  },
  onLoad: function () {
    wx.showLoading();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.search('iPhone X') != -1) {
          that.setData({
            iphone: "iphoneTop",
            iponesc: "iphonesearch"
          });
        }
      }
    })
    wx.request({
      url: app.globalData.urls + '/banner/show',
      data: {
        banType: 'goods'
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            banners: res.data.respData
          });
        }
      }
    }),
    wx.request({
      url: app.globalData.urls + '/cate/all',
      success: function (res) {
        var categories = [{ categoryId: 0, cateName: "所有分类" }];
        if (res.data.respCode == 'R000') {
          wx.hideLoading();
          for (var i = 0; i < res.data.respData.length; i++) {
            if (res.data.respData[i].cateLevel == 1) {
              categories.push(res.data.respData[i]);
            }
          }
        }
        that.setData({
          categories: categories,
          //默认被选中的ID
          activeCategoryId: 0
        });
        that.getGoodsList(0);
      }
    })
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.request({
      url: app.globalData.urls + '/cate/all',
      success: function (res) {
        var categorieslist = [];
        if (res.data.respCode == 'R000') {
          for (var i = 0; i < res.data.respData.length; i++) {
            if (categoryId != '') {
              if (res.data.respData[i].pid == categoryId) {
                categorieslist.push(res.data.respData[i]);
              }
            } else {
              if (res.data.respData[i].pid != 0) {
                categorieslist.push(res.data.respData[i]);
              }
            }
          }
        }
        that.setData({
          categorieslist: categorieslist,
        });
      }
    })
  },
  toDetailsTap: function (e){
    wx.navigateTo({
      url: "/pages/goods-detail/goods-detail?id=" + e.currentTarget.dataset.id
    })
    this.setData({
      search: true,
      searchinput: false
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'shopCarInfo',
      success: function (res) {
        if (res.data) {
          that.data.shopCarInfo = res.data
          if (res.data.shopNum > 0) {
            wx.setTabBarBadge({
              index: 2,
              text: '' + res.data.shopNum + ''
            })
          } else {
            wx.removeTabBarBadge({
              index: 2,
            })
          }
        } else {
          wx.removeTabBarBadge({
            index: 2,
          })
        }
      }
    })
    // wx.request({
    //   url: app.globalData.urls + '/order/statistics',
    //   data: { token: app.globalData.token },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       if (res.data.data.count_id_no_pay > 0) {
    //         wx.setTabBarBadge({
    //           index: 3,
    //           text: '' + res.data.data.count_id_no_pay + ''
    //         })
    //       } else {
    //         wx.removeTabBarBadge({
    //           index: 3,
    //         })
    //       }
    //     }
    //   }
    // })
  },

})