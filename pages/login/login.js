// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success: function(res) {
        //有token
      },
      fail: function(res){
        //token失效，重新登录中
        getCode();
      }
    })
  },

  getCode: function(){
    wx.login({
      success(res) {
        if (res.code) {
          // code换token
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            },
            success(res) {
              if (res.data.errCode == 2000) {
                //用户有效，得到token
                wx.setStorageSync(token, res.data.token);
              } else {
                //用户无效，进行登录
                wx.removeStorageSync(token);
                //跳转到登录页面
              }
            },
          })
        }
      }
    })
  },

  userLogin: function(){
    let that = this;
    wx.request({
      url: 'login',
      data:{
        code:that.data.code,
        username:that.data.username,
        pwd:that.data.password
      },
      success: function(){
        if (res.data.errCode == 2000) {
          //用户有效，得到token
          wx.setStorageSync(token, res.data.token);
          //跳转
        } else {
          //用户无效，进行登录
          wx.removeStorageSync(token);
        }
      },
      fail: function(){
        //用户无效，进行登录
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

  handleLogin: function(e){
    wx.login({
      success(res){
        if(res.code){
          console.log(res.code);
        }
      }
    })
  }
})