// app.js
App({
  onLaunch() {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0
  }
})
