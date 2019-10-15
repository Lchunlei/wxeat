var app = getApp()
Page({
  data: {
    currentType: 0,
    isEmpty:true,
    pageNum:1,
    orderList:[],
		bodyHeight:null
  },
  onLoad: function (e) {
    var that = this;
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    that.getPage(that.data.pageNum);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function (e) {

  },
  getPage: function (pageNum){
    wx.showLoading();
    var that = this;
    let token = app.globalData.token;
    if (app.globalData.sToken) {
      token = app.globalData.sToken;
    }
    wx.request({
      url: app.globalData.urls + '/bill/list',
      data: {
        eToken: token,
        pageNum: pageNum,
        tabNum: that.data.currentType
      },
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.respCode == 'R000') {
          let respData = res.data.respData;
          for (var i in respData) {
            that.data.orderList.push(respData[i]);
          }
          that.setData({
            isEmpty:false,
            orderList: that.data.orderList
          });
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 1000
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
    var that = this;
    // 页面上拉触底事件的处理函数
    console.log('上拉-->' + that.data.pageNum);
    let pageNum = that.data.pageNum + 1;
    that.getPage(pageNum);
    that.setData({
      pageNum: pageNum
    });
  }
})