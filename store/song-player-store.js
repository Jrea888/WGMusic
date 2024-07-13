import {HYEventStore} from 'hy-event-store'
import {servicePlayer} from '../service/index'
import {parseLyric} from '../utils/parse-lyric'

const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    currentSong: {},
    totalDuration: 0,
    lyricInfos: [],
    currentAuthor: '',

    id: 0,
    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    isPlaying: false,
    playModeIndex: 0, // 0：循环播放 1：单曲循环 2：随机播放
  },
  actions: {
    playSongMusicByIdAction(ctx, { id }) {
      // 1.获取数据
      ctx.id = id
      // 获取歌曲详情
      servicePlayer.getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.totalDuration = res.songs[0].dt
        ctx.currentAuthor = res.songs[0].ar.map(v => v.name).join('、')
      })
      // 获取歌词信息
      servicePlayer.getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics
      })

      // 2.播放对应ID的歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      // 3.监听 audioContext 相关事件
      this.dispatch("setupAudioContextListenerAction")
    },
    setupAudioContextListenerAction(ctx) {
      // 1.监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })
  
      // 1.监听时间改变
      audioContext.onTimeUpdate(() => {
        // 获取当前时间 秒 转化 为 毫秒
        const currentTime = audioContext.currentTime * 1000
  
        // 1.根据当前时间修改 currentTime
        ctx.currentTime = currentTime
  
        // 2.根据当前时间查找当前播放的歌词
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            break
          }
        }
  
        if (!ctx.lyricInfos.length) {
          return
        }
  
        // 设置当前歌词的索引和和内容 前一条词文 (当for循环嵌套太多可以使用此方式)
        const currentIndex = i - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyricInfo = ctx.lyricInfos[currentIndex]
          ctx.currentLyricText = currentLyricInfo.text
          ctx.currentLyricIndex = currentIndex
        }
      })
    },
    // 歌曲暂停 和 播放
    musicPlayStatusChangeAction(ctx) {
      ctx.isPlaying = !ctx.isPlaying
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    }
  }
})

export {
  playerStore,
  audioContext
}