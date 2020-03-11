// pages/index/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "/images/icon/a/icon_nav_form.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nickName = wx.getStorageSync('wx_userInfo').nickName;
    nickName = this.wordlimit(nickName,13);
    console.log(nickName);
      this.setData({
        userInfo: {
          avatar: wx.getStorageSync('wx_userInfo').avatarUrl,
          nickName: nickName
        }
      });
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

  },

  formSubmit:function(event){
    console.log('submie了一下，数据为', event.detail.value);
    wx.showToast({
      title: '保存成功！',
      duration:1000,
      icon:"success"
    })
  },

  gotoSetting:function(){
    wx.navigateTo({
      url: '/pages/index/setting',
    })
  },
  wordlimit: function(string, wordMaxLength=7) {
    var newString = string;
    if (string.length > wordMaxLength){
      newString = string.substr(0, wordMaxLength - 3) + '...';
    }
    return newString;
  }


})