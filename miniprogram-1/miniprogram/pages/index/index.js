//index.js
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true

Page({
  data: {
    music: 'https://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=600902000006889266&resourceType=2&channel=1',
    serachInput: '',
    musicList: [],
  },

  onLoad: function() {

  },

  bindKeyInput: function(e) {
    this.setData({
      serachInput: e.detail.value
    })
  },

  searchMusic: function() {
    console.log(this.data.serachInput)
    this.xhrFuc()
  },

  xhrFuc: function() {
    let that = this
    let url = `https://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=${encodeURI(this.data.serachInput)}&pageNo=${1}&pageSize=${20}&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`
    wx.showLoading({
      title: '搜索中',
    })
    wx.request({
      url: url,
      success(res) {
        wx.hideLoading()
        if (res.data.code === '000000') {
          that.setData({
            musicList: res.data.songResultData.result || []
          })
          // total = res.data.songResultData.totalCount
        } else {
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  checkSong: function(event) {
    let contentId = event.currentTarget.dataset.data.contentId
    this.playMusic(contentId)
  },

  playMusic: function(contentId) {
    let uri = `https://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${contentId}&resourceType=2&channel=1`
    this.setData({
      music: uri
    }, () => {
      innerAudioContext.src = uri
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log('发生错误', res)
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束', res)
        this.randomGet()
      })
    })
  },

  randomGet: function() {
    let random = Math.random()
    let length = this.data.musicList.length
    random = Math.floor(random * length)
    this.playMusic(this.data.musicList[random].contentId)
  }
})