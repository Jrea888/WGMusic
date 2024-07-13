// 使用正则(regular)表达式(expression) 匹配出 [00:45.55] / [00:45.456]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

function parseLyric(lyricString) {
  const lyricstrings = lyricString.split("\n")
  
  let lyricInfos = []
  for (const lineString of lyricstrings) {
    // [02:17.160]我誓言要打破这命运的棋局
    const timeResult = timeRegExp.exec(lineString)

    if (!timeResult) {
      continue
    }

    // 1.获取时间 这里的 1,2,3 是上面正则匹配的（）中的内容，索引 0 的内容为源匹配字符串
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime  * 1
    const time = minute + second + millsecond

    // 2.获取歌词文 replace()第一个参数可以是正则表达式，也可以是字符串
    const text = lineString.replace(timeRegExp, "")
    lyricInfos.push({time, text})
  }

  return lyricInfos
}

export {parseLyric}