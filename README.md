# WGMusic
## 项目展示
<img src="https://s21.ax1x.com/2024/07/14/pk4q5fU.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk5Mhse.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk5MIZd.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk4qqmR.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk4qTl4.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk4q76J.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk4qL01.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk5MgG6.png" width="400px"/>   <img src="https://s21.ax1x.com/2024/07/14/pk4qOTx.png" width="400px"/>  <img src="https://s21.ax1x.com/2024/07/14/pk5MRxO.png" width="400px"/>

# 学习笔记

## 课程介绍和背景

* 认识小程序开发
* 项目开发前准备
* 小程序文档阅读
* 小程序整体架构

## 项目的核心技术

* 目录、代码规范

  * 使用ES6导入导出模块的方式
  * 使用 `index.ts` 文件重新导出模块，以提高 TypeScript 项目的可读性、可维护性和可重用性
  * baseui：存放其他项目中通用的UI组件库

* 项目架构和设计

* 封装、组件化、模块化思想和规范

  * 小程序同样也支持插槽、默认插槽、具名插槽，需要借助css伪类实现

    ```css
    /* 使用css伪类 判断.slot里面元素是否为空，
       true：则把同级兄弟元素 .default设置为flex显示（即显示默认插槽）
       false：则默认使用.default display: none; 隐藏默认插槽
    */
    
    .default {
      display: none; /* 默认隐藏 */
    }
    
    .slot:empty + .default {
      display: flex;
    }
    ```

* 全局状态管理和工具封装使用

  * 封装防抖和节流函数实现
  * 使用`hy-event-store`库，是一个基于事件的全局状态管理工具，可以在Vue、React、小程序等任何地方使用

* 网络请求封装

  * 结合Promise实现


* 富文本功能开发

  * 搜索热词

* 毛玻璃效果实现

  * `backdrop-filter: blur(30px)`

* 音乐和视频播放、控制等功能实现

* 模糊搜索功能

* 防抖场景应用
  * 搜索输入

* 音乐歌曲展示、同步

* `vantUI`组件库使用

* npm第三方包管理方案
  * @vant/weapp


## 项目的功能实现

* 数据状态管理
* 音乐首页开发
* 视频首页开发
* 视频详情开发
* 搜索页面开发
* 歌曲详情开发
* 歌曲列表详情
* 歌曲播放页面

```js
歌曲进度条状态：
发生变化：
	1.获取slider变化的值 * 歌曲总时长(毫秒) / 100 = 当前播放的时间点
	2.设置音频上下文播放currentTime位置的音乐,即：当前播放的时间点 / 1000
	3.更新sliderValue，且将isSliderChanging设置false
拖动时：
	1.获取当前拖动value,
    2.计算currentTime，即：歌曲总时长 * value / 100
	3.设置isSliderChanging：true，更新sliderValue和currentTime
歌曲歌词匹配：
	[02:17.160]我誓言要打破这命运的棋局，使用正则匹配出时间和歌词文
    定义当前歌词文索引(currentLyricIndex)和当前歌词文(currentLyricText)， currentIndex = i - 1,取当前的上一条词文
    当currentLyricIndex !== currentIndex时，使用currentIndex从lyricInfos中取出当前的Item
	将Item.text设置给currentLyricText，并更新currentLyricIndex：currentIndex


歌曲信息状态和数据共享，保证切换下一首个了，其他地方的数据具有响应式，也要发生变化，采用第三种方式
1.app.js
2.getApp().globleData
3.hy-event-store
	有一个发生变化，其他地方监听到值变化时，及时更新数据

1.监听音乐播放页面 currentSong totalDuration lyricInfos currentAuthor，setupPlayerStoreListener()
2.监听audioContext，
```

## 项目的上线发布

* 上传项目代码
* 项目提交审核
* 项目发布版本
* 发布注意事项
