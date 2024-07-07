import {
  servicePlayer
} from '../../service/index'

Page({
  data: {
    id: 0,
    currentPage: 0,
    contentHeight: 0,
    currentSong: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    const id = options.id
    this.setData({
      id
    })

    // 获取歌曲信息
    this.fetchSongInfo(id)

    // 动态计算内容高度
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navBarHeight
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight
    })

    // 播放歌曲
    const context = wx.createInnerAudioContext()
    context.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    context.play()
  },
  async fetchSongInfo(id) {
    const res = await servicePlayer.getSongInfo(id)
    console.log(res, '=====')
    this.setData({
      currentSong: res.songs[0]
    })
  },
  swiperChangeHandle(event) {
    const currentPage = event.detail.current
    this.setData({
      currentPage
    })
  }
})