
var app = getApp()
Page({
  data: {
    text: "Page main",
    background: [
      {
        color: 'green',
        sort: 1
      },
      {
        color: 'red',
        sort: 2
      },
      {
        color: 'yellow',
        sort: 3
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    toView: 'blue',
    menus: [],
    myMenus: [],
    selectedMenuId: 1,
    total: {
      count: 0,
      money: 0
    },

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
    // let data = e.currentTarget.dataset;
    // console.log(data);
    // console.log(e.currentTarget.id);
    this.setData({
      toView: 's'+e.currentTarget.id,
      selectedMenuId: e.currentTarget.id,
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  addCount: function (event) {
    let nowMenus = [];
    if (this.data.myMenus.length>0){
      for (let i = 0; i < this.data.myMenus.length; i++) {
        nowMenus.push(this.data.myMenus[i]);
      }
    }
    // console.log(this.data.myMenus);
    // console.log(nowMenus);
    let data = event.currentTarget.dataset
    //获取菜ID
    // console.log(data);
    let total = this.data.total;
    let menus = this.data.menus;
    // console.log(menus);
    let menu = menus.find(function (v) {
      // console.log(v);
      // console.log(data.id);
      return v.cateId == data.cid
    })
    // console.log(menu); 
    // console.log(menu.dishs); 
    let dish = menu.dishs.find(function (v) {
      // console.log(v);
      // console.log(data);
      return v.foodId == data.id;
    })
    // console.log(dish);
    dish.count += 1;
    total.count += 1;
    total.money += dish.foodPrice;
    // console.log(dish.foodId);
    //已经有的元素直接删除，换成新元素
    if (this.data.myMenus.length > 0) {
      for (let i = 0; i < this.data.myMenus.length; i++) {
        console.log("--" + this.data.myMenus[i].foodId);
        if (this.data.myMenus[i].foodId === dish.foodId){
          // console.log("替换--"+dish.foodId);
          // console.log("替换--" + this.data.myMenus[i].foodId);
          nowMenus.splice(i, 1);
        }
      }
    }
    nowMenus.push(dish);
    // nowMenus.splice(nowMenus.findIndex((item) => item.foodId === dish.foodId),1, dish);
    // nowMenus.push(dish);
    this.setData({
      myMenus: nowMenus,
      'menus': menus,
      'total': total
    });
    console.log(this.data.myMenus)
  },
  minusCount: function (event) {
    var nowMenus = this.data.myMenus;
    let data = event.currentTarget.dataset
    // console.log(data);
    let total = this.data.total
    let menus = this.data.menus
    let menu = menus.find(function (v) {
      return v.cateId == data.cid
    })
    let dish = menu.dishs.find(function (v) {
        //  console.log(v);
      return v.foodId == data.id;
    })
    if (dish.count <= 0)
      return
    dish.count -= 1;
    total.count -= 1;
    total.money -= dish.foodPrice;
    // nowMenus.splice(nowMenus.findIndex(item => item.foodId === dish.foodId), 1, dish);
    // nowMenus.push(dish);
    for (let i = 0; i < this.data.myMenus.length; i++) {
      if (this.data.myMenus[i].foodId === dish.foodId) {
        nowMenus.splice(i, 1);
      }
    }
    if (dish.count>0){
      nowMenus.push(dish);
    }
    this.setData({
      myMenus: nowMenus,
      menus: menus,
      total: total
    });
    console.log(this.data.myMenus)
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
  // search: function(e){
  //   var that = this
  //   wx.request({
  //     url: app.globalData.urls + '/shop/goods/list',
  //     data: {
  //       nameLike: e.detail.value
  //     },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         var searchs = [];
  //         for (var i = 0; i < res.data.data.length; i++) {
  //           searchs.push(res.data.data[i]);
  //         }
  //         that.setData({
  //           searchs: searchs,
  //           searchidden: false,
  //           nonehidden: true
  //         });
  //       }else{
  //         that.setData({
  //           searchidden: true,
  //           nonehidden: false
  //         });
  //       }
  //     }
  //   })
    
  // },
  // searchfocus: function(){
  //   this.setData({
  //     search: false,
  //     searchinput: true
  //   })
  // },
  // searchclose: function(){
  //   this.setData({
  //     search: true,
  //     searchinput: false
  //   })
  // },
  onLoad: function () {
    wx.showLoading();
    var that = this;
    //加载分类
    var categories = [{ categoryId: 1, cateName: "招牌" }, { categoryId: 2, cateName: "热销" }, { categoryId: 3, cateName: "主食" }, { categoryId: 4, cateName: "酒水" }, { categoryId: 5, cateName: "其他" }];
    wx.hideLoading();
    // for (var i = 0; i < res.data.respData.length; i++) {
    //   if (res.data.respData[i].cateLevel == 1) {
    //     categories.push(res.data.respData[i]);
    //   }
    // }
    that.setData({
      categories: categories,
      //默认被选中的ID
      activeCategoryId: 1
    });
    that.getGoodsList(0);

    wx.getSystemInfo({
      success: function (res) {
        if (res.model.search('iPhone X') != -1) {
          that.setData({
            iphone: "iphoneTop",
            iponesc: "iphonesearch"
          });
        }
      }
    });
    //加载轮播图
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
    });
    //加载默认菜品
    wx.request({
      url: app.globalData.urls + '/food/can/eat',
      data: {
        shopId: 3,
        cateId:0
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          wx.hideLoading();
          that.setData({
            menus: res.data.respData
          });
        }
        that.setData({
          categories: categories,
          //默认被选中的ID
          activeCategoryId: 1
        });
        that.getGoodsList(0);
      }
    });
  },
  getGoodsList: function (categoryId) {
    //获取商品
    var that = this;
    wx.request({
      url: app.globalData.urls + '/food/can/eat',
      data: {
        shopId: 0,
        eToken: app.globalData.token
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          that.setData({
            menus: res.data.respData,
          });
        }else{
          that.setData({
            menus: [],
          });
          wx.showToast({
            title: res.data.respMsg,
            icon: 'none',
            duration: 1000
          });
        }
      }
    })
  },
  makeBill: function (e){
    //选好下单
    var that = this;
    if (that.data.total.money>0){
      wx.request({
        url: app.globalData.urls + '/bill/make',
        method:'POST',
        data: {
          shopId: 3,
          eToken: app.globalData.token,
          deskCode:1,
          billInfos:that.data.myMenus
        },
        success: function (res) {
          if (res.data.respCode == 'R000') {
            that.setData({
              myMenus: [],
            });
            wx.showModal({
              title: '提示',
              content: '订餐成功，用餐完毕后请联系老板买单哦',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  that.onShow();
                  wx.switchTab({
                    url: "/pages/index/index"
                  });
                }
              }
            });
          
          } else {
            wx.showToast({
              title: res.data.respMsg,
              icon: 'none',
              duration: 1000
            });
          }
        }
      })

    }else{
      wx.showToast({
        title: '您还没有点餐呢',
        icon: 'none',
        duration: 1000
      });
    }
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

});
