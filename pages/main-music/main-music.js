import {
  serviceMusic
} from '../../service/index'
import {
  throttle
} from '../../utils/debounce-throttle'
import {
  queryRect
} from '../../utils/query-rect'

import {
  rankingsSongsState
} from '../../store/index'

const throttleQueryRect = throttle(queryRect, 1000)

Page({
  data: {
    searchValue: '',
    swiperImageHeight: 0,
    banners: [],
    // 巅峰榜
    peakRankings: {
      upRanking: {}, // 飙升榜
      newRanking: {}, // 新歌榜
      originRanking: {} // 原创榜
    },
    hotSongMenu: [], // 热门歌单
    recommendSongMenu: [], // 推荐歌单
    recommendSongsList: [] // 推荐歌曲: 热门歌曲
    // 热门歌单：全部
    // 推荐歌单：华语
    // 巅峰榜：新歌榜、原创榜、飙升榜
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initFetchData()

    // 1.发起共享数据请求
    rankingsSongsState.dispatch('getRankingSongsAction')

    // 2.从发起的请求中获取对应的数据 -- 推荐歌曲列表
    rankingsSongsState.onState('recommendSongsList', (list) => {
      if (!list.length) {
        return
      }

      const recommendSongsList = list.slice(0, 6)
      this.setData({
        recommendSongsList
      })
    })
    
    // 热门歌单
    rankingsSongsState.onState('newRanking', this.peakRankingDataHandle('newRanking'))
    // 原创歌单
    rankingsSongsState.onState('originRanking', this.peakRankingDataHandle('originRanking'))
    // 飙升歌单
    rankingsSongsState.onState('upRanking', this.peakRankingDataHandle('upRanking'))
  },
  initFetchData() {
    // 请求banner轮播图列表
    serviceMusic.getBannersList().then(res => {
      this.setData({
        banners: res.banners
      })
    })

    // 获取热门歌单，是全部数据
    serviceMusic.getSongsMenu().then(res => {
      this.setData({
        hotSongMenu: res.playlists
      })
    })
    // 获取热门歌单，是全部数据
    serviceMusic.getSongsMenu('华语').then(res => {
      this.setData({
        recommendSongMenu: res.playlists
      })
    })
  },
  // 巅峰榜数据初始化数据
  peakRankingDataHandle: function(type) {
    return (res) => {
      if (!Object.keys(res).length) {
          return
      }

      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      const tempRankings = {...this.data.peakRankings, [type]: rankingObj}
      
      this.setData({
        peakRankings: tempRankings
      })
    }
  },
  // 点击进入 搜索页面
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/search-page/search-page',
    })
  },
  // 轮播图片加载完成，获取高度
  swiperImageLoaded() {
    // 使用节流函数 对代码执行 进行优化
    throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({
        swiperImageHeight: rect.height
      })
    })
  }
})