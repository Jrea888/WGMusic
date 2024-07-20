import {playerStore} from '../../../../store/index'

Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  data: {
  },
  methods: {
    songItemClickHandle() {
      // 1.跳转播放页面
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
      })

      // 2.请求歌曲数据
      playerStore.dispatch('playSongMusicByIdAction', { id })
    }
  }
})