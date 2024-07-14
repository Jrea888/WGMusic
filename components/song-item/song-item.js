import {playerStore} from '../../store/index'

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },
  data: {},
  methods: {
    songDetailItemClickHanle() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`,
      })

      // 2.请求歌曲数据
      playerStore.dispatch('playSongMusicByIdAction', {
        id
      })
    }
  }
})