// pages/index/person.js
Page({

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