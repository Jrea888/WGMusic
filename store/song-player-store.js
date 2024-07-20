import {HYEventStore} from 'hy-event-store'
import {servicePlayer} from '../service/index'
import {parseLyric} from '../utils/parse-lyric'

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

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

    isStoping: false,
    isPlaying: false,
    isFirstPlay: true,
    playModeIndex: 0, // 0：顺序播放 1：单曲循环 2：随机播放

    playListIndex: 0,
    playListSongs: []
  },
  actions: {
    async playSongMusicByIdAction(ctx, { id, isRefresh = false }) {
      // 对于同一首歌不再做播放逻辑处理
      if (ctx.id === id && !isRefresh) {
        this.dispatch("musicPlayStatusChangeAction", true)
        return
      }
      // 1.获取数据
      ctx.id = id

      // 重置数据
      ctx.isPlaying = true
      ctx.currentSong = {}
      ctx.totalDuration = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""

      // 获取歌曲详情
      const detail = await servicePlayer.getSongDetail(id)
      ctx.currentSong = detail.songs[0]
      ctx.totalDuration = detail.songs[0].dt
      ctx.currentAuthor = detail.songs[0].ar.map(v => v.name).join('、')

      // 获取歌词信息
      const lyricInfo =  await servicePlayer.getSongLyric(id)
      const lyricString = lyricInfo.lrc.lyric
      const lyrics = parseLyric(lyricString)
      ctx.lyricInfos = lyrics

      // 2.播放对应ID的歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = ctx.currentSong.name
      audioContext.autoplay = true

      if (ctx.isFirstPlay) {
        // 3.监听 audioContext 相关事件
        this.dispatch("setupAudioContextListenerAction")
        ctx.isFirstPlay = false
      }
    },
    setupAudioContextListenerAction(ctx) {
      // 1.监听歌曲可以播放
      audioContext.onCanplay(() => {
        audioContext.play()
      })
  
      // 2.监听时间改变
      audioContext.onTimeUpdate(() => {
        // 获取当前时间 秒 转化 为 毫秒
        const currentTime = audioContext.currentTime * 1000
  
        // 1.根据当前时间修改 currentTime
        ctx.currentTime = currentTime
  
        if (!ctx.lyricInfos.length) {
          return
        }
  
        // 2.根据当前时间查找当前播放的歌词
        let index = 0
        for (; index < ctx.lyricInfos.length; index++) {
          const lyricInfo = ctx.lyricInfos[index]
          if (currentTime < lyricInfo.time) {
            break
          }
        }
  
        // 设置当前歌词的索引和和内容 前一条词文 (当for循环嵌套太多可以使用此方式)
        const currentIndex = index - 1
        if (ctx.currentLyricIndex !== currentIndex) {
          const currentLyricInfo = ctx.lyricInfos[currentIndex]
          ctx.currentLyricText = currentLyricInfo.text
          ctx.currentLyricIndex = currentIndex
        }
      })

      // 3.监听歌曲播放完成
      audioContext.onEnded(() =>{
        this.dispatch("switchSongAction")
      })

      // 4.监听音乐播放/暂停/停止
      // 播放状态
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      // 暂停状态
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      // 停止状态
      audioContext.onStop(() => {
        ctx.isPlaying = false
        ctx.isStoping = true
      })
    },
    // 歌曲暂停 和 播放
    musicPlayStatusChangeAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying
      // 如果是播放状态 且 手动从点击 x 号时，重新播放
      if (ctx.isStoping && ctx.isPlaying) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = ctx.currentSong.name
        audioContext.startTime = ctx.currentTime / 1000
        ctx.isStoping = false
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },
    // 歌曲列表的 上一首和下一首 切换
    switchSongAction(ctx, isNext = true) {
      // 1.获取当前播放歌曲的 索引值
      let index = ctx.playListIndex

      // 2.根据播放模式，选择对应的切换逻辑
      switch (ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === ctx.playListSongs.length) {
            index = 0
          }
          if (index === -1) {
            index = ctx.playListSongs.length - 1
          }
          break;
        case 1: // 单曲循环
          break;
        case 2: // 随机播放 0~1 * length, 向下取整
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break;
      }

      // 3.获取当前播放的歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        // 如果当前的播放歌曲为空时，取全局的当前播放歌曲
        currentSong = ctx.currentSong
      } else {
        // 否则才 更新 播放列表的索引值
        ctx.playListIndex = index
      }

      // 4. 对获取的歌曲进行播放 isRefresh:是否需要重头播放
      this.dispatch("playSongMusicByIdAction", {id: currentSong.id, isRefresh: true})
    }
  }
})

export {
  playerStore,
  audioContext
}