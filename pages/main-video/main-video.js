import {
  serviceVideo
} from '../../service/index'

Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTopMV()
  },
  async fetchTopMV() {
    const res = await serviceVideo.getTopMV(this.data.offset)
    const newList = [...this.data.videoList, ...res.data]

    this.setData({
      videoList: newList,
      hasMore: res.hasMore
    })
    
    this.data.offset = this.data.videoList.length
  },
  // 上拉加载
  onReachBottom() {
    if (!this.data.hasMore) {
      return
    }

    this.fetchTopMV()
  },
  // 下拉刷新
  async onPullDownRefresh() {
    // 清空数据
    this.setData({
      offset: 0,
      hasMore: true,
      videoList: []
    })
    // 再次请求
    await this.fetchTopMV()
    // 请求完成 取消下拉刷新
    wx.stopPullDownRefresh()
  },
  videoDetailHandle(e) {
    console.log('进入详情页面', e.currentTarget.dataset.item)
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/vidoe-detail/video-detail?id=${item.id}`,
    })
  }
})