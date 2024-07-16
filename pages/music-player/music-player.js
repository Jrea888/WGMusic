import {
  audioContext,
  playerStore
} from '../../store/index'

const playModeNames = ['order', 'repeat', 'random']

Page({
  data: {
    // 请求网络数据保存
    currentSong: {},
    totalDuration: 0,
    lyricInfos: [],
    currentAuthor: '',
    // 歌曲相关数据
    id: 0,
    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',
    // 页面本身的属性
    sliderValue: 0,
    lyricScrollTop: 0,
    currentPage: 0,
    contentHeight: 0,
    isSliderChanging: false,
    playModeName: 'order',
    playModeIndex: 0,
    isPlaying: false,
    playingName: 'pause'
  },
  onLoad(options) {
    const id = options.id
    this.setData({
      id
    })

    // 1.监听 playerStore 中属性 发生变化时，触发同步数据
    this.setupPlayerStoreListener()

    // 2.动态计算内容高度
    const globalData = getApp().globalData
    const screenHeight = globalData.screenHeight
    const statusBarHeight = globalData.statusBarHeight
    const navBarHeight = globalData.navBarHeight
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight
    })
  },
  swiperChangeHandle(event) {
    const currentPage = event.detail.current
    this.setData({
      currentPage
    })
  },
  clickBackHandle() {
    wx.navigateBack()
  },
  // slider发生变化时触发
  sliderChangedhandle(event) {
    const value = event.detail.value
    // 1.计算出当前播放的 currentTime
    const currentTime = this.data.totalDuration * value / 100

    // 2.设置音频context播放currentTime位置的音乐
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)

    // 3.记录最新的sliderValue, 且需要将 isSliderChanging设置回false
    this.setData({
      sliderValue: value,
      isSliderChanging: false
    })
  },
  // slider 拖动时触发
  sliderchangingHandle(event) {
    const value = event.detail.value
    const currentTime = this.data.totalDuration * value / 100
    this.setData({
      currentTime,
      isSliderChanging: true
    })
  },
  playModeSwitchHandle() {
    let newModeIndex = this.data.playModeIndex + 1
    if (newModeIndex === 3) {
      newModeIndex = 0
    }
    // 更新store中的 模式索引
    playerStore.setState('playModeIndex', newModeIndex)
  },
  playStatusHandle() {
    playerStore.dispatch("musicPlayStatusChangeAction", !this.data.isPlaying)
  },
  prevSongHandle() {
    playerStore.dispatch("switchSongAction", false)
  },
  nextSongHandle() {
    playerStore.dispatch("switchSongAction")
  },
  setupPlayerStoreListener() {
    // 1.监听 currentSong totalDuration lyricInfos currentAuthor
    playerStore.onStates(["currentSong", "totalDuration", "lyricInfos", "currentAuthor"], ({
      currentSong,
      totalDuration,
      lyricInfos,
      currentAuthor
    }) => {
      if (currentSong) this.setData({
        currentSong
      })
      if (totalDuration) this.setData({
        totalDuration
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
      if (currentAuthor) this.setData({
        currentAuthor
      })
    })

    // 2.监听 currentTime currentLyricIndex currentLyricText
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {
      // 歌曲时间变化
      if (currentTime && !this.data.isSliderChanging) {
        const sliderValue = currentTime / this.data.totalDuration * 100
        this.setData({
          sliderValue,
          currentTime
        })
      }
      // 歌词词文变化
      if (currentLyricText) {
        this.setData({
          currentLyricText
        })
      }
      // 歌词索引变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          lyricScrollTop: currentLyricIndex * 35
        })
      }
    })

    // 3.监听播放模式 和 播放状态
    playerStore.onStates(["playModeIndex", "isPlaying"], ({
      playModeIndex,
      isPlaying
    }) => {
      if (playModeIndex !== undefined) {
        this.setData({
          playModeIndex,
          playModeName: playModeNames[playModeIndex]
        })
      }

      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? 'pause' : 'resume'
        })
      }
    })
  },
  onUnload() {}
})