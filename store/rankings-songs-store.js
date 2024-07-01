import {
  HYEventStore
} from 'hy-event-store'
import {
  serviceMusic
} from '../service/index'

const rankingsSongsState = new HYEventStore({
  state: { 
    upRanking: {}, // 飙升榜
    newRanking: {}, // 新歌榜
    originRanking: {}, // 原创榜
    recommendSongsList: [], // 推荐歌曲列表
  },
  actions: {
    // 获取推荐歌曲数据
    getRankingSongsAction(ctx) {
      // 热门歌曲 3778678
      serviceMusic.getSongRanking(3778678).then(res => {
        ctx.recommendSongsList = res.playlist.tracks
      })
      // 新歌歌曲-3779629
      serviceMusic.getSongRanking(3779629).then(res => {
        ctx.newRanking = res.playlist
      })
      // 原创歌曲-2884035
      serviceMusic.getSongRanking(2884035).then(res => {
        ctx.originRanking = res.playlist
      })
      // 飙升歌曲-19723756
      serviceMusic.getSongRanking(19723756).then(res => {
        ctx.upRanking = res.playlist
      })
    }
  }
})

export {
  rankingsSongsState
}