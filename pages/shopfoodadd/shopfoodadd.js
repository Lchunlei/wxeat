var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    // provinces: [],
    // citys: [],
    // districts: [],
    // selProvince: '请选择',
    // selCity: '请选择',
    // selDistrict: '请选择',
    // selProvinceIndex: 0,
    // selCityIndex: 0,
    // selDistrictIndex: 0
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var foodName = e.detail.value.foodName;
    var foodPrice = e.detail.value.foodPrice;
    var paixu = e.detail.value.paixu;

    if (foodName == "") {
      wx.showToast({
        title: '请填写菜名',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (foodPrice == "") {
      wx.showToast({
        title: '请填写售价',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (paixu == "") {
      wx.showToast({
        title: '请填写推荐指数',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (paixu > 5 || paixu<1) {
      wx.showToast({
        title: '推荐指数填写错误！',
        icon: 'none',
        duration: 2000
      });
      return
    }
   
    var apiAddoRuPDATE = "add";
    var foodId = that.data.foodId;
    if (foodId) {
      apiAddoRuPDATE = "update";
    } else {
      foodId = 0;
    }
    console.log("单个菜品-->" + apiAddoRuPDATE);
    wx.request({
      url: app.globalData.urls + '/food/addOne',
      method: 'POST',
      data: {
        eToken: app.globalData.token,
        foodId: foodId,
        foodName: foodName,
        foodPrice: foodPrice*100,
        paixu: paixu
      },
      success: function (res) {
        if (res.data.respCode != 'R000') {
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            showCancel: false
          })
          return;
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })
  },
  initCityData: function (level, obj) {
    if (level == 1) {
      var pinkArray = [];
      for (var i = 0; i < commonCityData.cityData.length; i++) {
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces: pinkArray
      });
    } else if (level == 2) {
      var pinkArray = [];
      var dataArray = obj.cityList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys: pinkArray
      });
    } else if (level == 3) {
      var pinkArray = [];
      var dataArray = obj.districtList
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts: pinkArray
      });
    }

  },
  bindPickerProvinceChange: function (event) {
    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince: selIterm.name,
      selProvinceIndex: event.detail.value,
      selCity: '请选择',
      selCityIndex: 0,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange: function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange: function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },
  onLoad: function (e) {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    this.initCityData(1);
    var id = e.id;
    if (id) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        url: app.globalData.urls + '/user/shipping-address/detail',
        data: {
          token: app.globalData.token,
          id: id
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              id: id,
              addressData: res.data.data,
              selProvince: res.data.data.provinceStr,
              selCity: res.data.data.cityStr,
              selDistrict: res.data.data.areaStr
            });
            that.setDBSaveAddressId(res.data.data);
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: '无法获取快递地址数据',
              showCancel: false
            })
          }
        }
      })
    }
  },
  setDBSaveAddressId: function (data) {
    var retSelIdx = 0;
    for (var i = 0; i < commonCityData.cityData.length; i++) {
      if (data.provinceId == commonCityData.cityData[i].id) {
        this.data.selProvinceIndex = i;
        for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
          if (data.cityId == commonCityData.cityData[i].cityList[j].id) {
            this.data.selCityIndex = j;
            for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
              if (data.districtId == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                this.data.selDistrictIndex = k;
              }
            }
          }
        }
      }
    }
  },
  selectCity: function () {

  },
  deleteShopFood: function (e) {
    var that = this;
    var foodId = e.currentTarget.dataset.foodId;
    wx.showModal({
      title: '提示',
      content: '确定要删除该菜品吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.urls + '/food/delOne',
            data: {
              eToken: app.globalData.token,
              foodId: foodId
            },
            success: (res) => {
              wx.navigateBack({})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  readFromWx: function () {
    let that = this;
    wx.chooseAddress({
      success: function (res) {
        let provinceName = res.provinceName;
        let cityName = res.cityName;
        let diatrictName = res.countyName;
        let retSelIdx = 0;

        for (var i = 0; i < commonCityData.cityData.length; i++) {
          if (provinceName == commonCityData.cityData[i].name) {
            let eventJ = { detail: { value: i } };
            that.bindPickerProvinceChange(eventJ);
            that.data.selProvinceIndex = i;
            for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
              if (cityName == commonCityData.cityData[i].cityList[j].name) {
                //that.data.selCityIndex = j;
                eventJ = { detail: { value: j } };
                that.bindPickerCityChange(eventJ);
                for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
                  if (diatrictName == commonCityData.cityData[i].cityList[j].districtList[k].name) {
                    //that.data.selDistrictIndex = k;
                    eventJ = { detail: { value: k } };
                    that.bindPickerChange(eventJ);
                  }
                }
              }
            }

          }
        }

        that.setData({
          wxaddress: res,
        });
      }
    })
  }
})