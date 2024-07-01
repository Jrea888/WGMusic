/**
 * 节流函数
 * @param {*} fn 
 * @param {*} interval 
 * @param {*} options 
 */
function throttle(fn, interval = 1000, options = {
  leading: true,
  trailing: false
}) {
  // 1.记录上一次的开始时间
  const {
    leading,
    trailing,
    resultCallback
  } = options
  let lastTime = 0
  let timer = null

  // 2.事件触发时, 真正执行的函数
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      // 2.1.获取当前事件触发时的时间
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime

      // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        // 2.3.真正触发函数
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        // 2.4.保留上次触发的时间
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}

/**
 * 防抖函数
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 * @param {*} resultCallback 
 */
function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

export {
  throttle,
  debounce
}