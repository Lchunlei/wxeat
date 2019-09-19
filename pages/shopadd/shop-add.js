var commonCityData = require('../../utils/city.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var bossName = e.detail.value.bossName;
    var shopName = e.detail.value.shopName;
    var address = e.detail.value.address;
    var bossTel = e.detail.value.bossTel;
    var bossName = e.detail.value.bossName;
    var inviteCode = e.detail.value.inviteCode;

    if (shopName == "") {
      wx.showToast({
        title: '请填写店铺名',
        icon: 'none',
        duration: 2000
      });
      return
    }

    if (bossName == "") {
      wx.showToast({
        title: '请填写掌柜姓名',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (bossTel == "") {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (this.data.selProvince == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (this.data.selCity == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    var cityId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].id;
    var districtId;
    if (this.data.selDistrict == "请选择" || !this.data.selDistrict) {
      districtId = '';
    } else {
      districtId = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[this.data.selDistrictIndex].id;
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }

    wx.request({
      url: app.globalData.urls + '/shop/join',
      method: 'POST',
      data: {
        wxOpenId: app.globalData.token,
        // province: commonCityData.cityData[this.data.selProvinceIndex].provinceName,
        province: this.data.selProvince,
        city: this.data.selCity,
        district: this.data.selDistrict,
        address: address,
        bossTel: bossTel,
        bossName: bossName,
        shopName: shopName,
        inviteCode: inviteCode
      },
      success: function (res) {
        if (res.data.respCode == 'R000') {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            image: '../../images/active.png',
            duration: 2000
          });
          wx.navigateTo({
            url: "/pages/addshop/addshop"
          });
        }else{
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.respMsg,
            duration: 2000,
            showCancel: false
          });
          return;
        }
        // 跳转到结算页面
        // wx.navigateBack({})
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
    console.log("需要编辑的商户-->" + e.shopId);
    var shopId = e.shopId;
    if (shopId) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        url: app.globalData.urls + '/shop/info',
        // method: "POST",
        data: {
          eToken: app.globalData.token
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.respCode == 'R000') {
            that.setData({
              shopId: shopId,
              addressData: res.data.respData,
              selProvince: res.data.respData.province,
              selCity: res.data.respData.city,
              selDistrict: res.data.respData.district,
              bossTel:res.data.respData.bossTel,
              bossName:res.data.respData.bossName
            });
            that.setDBSaveAddressId(res.data.respData);
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.respMsg,
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
  // deleteAddress: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id;
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定要删除该收货地址吗？',
  //     success: function (res) {
  //       if (res.confirm) {
  //         wx.request({
  //           url: app.siteInfo.url + app.siteInfo.subDomain + '/user/shipping-address/delete',
  //           data: {
  //             token: app.globalData.token,
  //             id: id
  //           },
  //           success: (res) => {
  //             wx.navigateBack({})
  //           }
  //         })
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },
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