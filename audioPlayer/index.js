var playOrPauseBtn = document.querySelector('audio-player').shadowRoot.querySelector('#playOrpause')
function changeStatus() {
  playStatus = audio.paused
  console.log(playStatus)
  if (playStatus) {
    audio.pause()
    playOrPauseBtn.innerHTML = '播放'
  } else {
    audio.play()
    playOrPauseBtn.innerHTML = '暂停'
  }
}