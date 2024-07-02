import {
  serviceMusic
} from '../../service/index'
import {
  rankingsSongsState
} from '../../store/index'

Page({
  data: {
    type: '',
    ranking: '',
    songInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type
    console.log(type)
    this.setData({
      type
    })

    if (options.type === 'rank') {
      const ranking = options.ranking
      this.setData({
        ranking
      })
      // 获取排行榜数据
      rankingsSongsState.onState(ranking, this.getRankingDataHandle)
    } else if (type === 'menu') {
      // 歌单详情
      serviceMusic.getSongMenuDetail(options.id).then(res => {
        console.log(res, '-----res')
      })
    }
  },
  getRankingDataHandle(res) {
    this.setData({
      songInfo: res
    })
  }
})