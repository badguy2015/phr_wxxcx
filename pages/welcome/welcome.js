Page({
  onTap:function(){
    console.log("tapMe!");
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })
    wx.redirectTo({
      url: '/pages/posts/posts',
    })
  }
})