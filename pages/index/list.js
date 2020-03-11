var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = options.openid;
    if (!openid) openid = wx.getStorageSync('openid');
    var dateUrl = app.globalParams.host +'/mobile/index/getList';
    var that = this;
    var data = {openid: openid};
    if (options.limit > 0) data.limit = options.limit;
    console.log('d',data);
    wx.request({
      method: 'post',
      url: dateUrl,
      data: data,
      success: function(res){
        that.setData({
          list: res.data.data.list
        });
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
  onShow: function () {

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

  }
})