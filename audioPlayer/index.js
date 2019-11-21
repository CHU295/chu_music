const template = document.createElement('template');
template.innerHTML = `
<style>
    .audio-player {
      position: fixed;
      left: 1%;
      right: 1%;
      bottom: 3px;
      background: #fff;
      text-align: center;
      padding: 20px;
      box-shadow: 0px 0px 9px 3px #ddd;
      border-radius: 10px;
    }
    .btn {
      display: inline-block;
      border: 1px solid #ddd;
      padding: 3px 10px;
      cursor: pointer;
    }
    .progressBar {
      position: relative;
      margin: 10px 0;
    }
    .bg-line {
      height: 6px;
      background: #eaeaea;
      border-radius: 6px;
    }
    .pass-line {
      position: absolute;
      top: 0;
      left: 0;
      height: 6px;
      right: 100%;
      background: #d4d2d2;
    }
    .rBtn {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #9eb8ff;
      border-radius: 20px;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%,-7px);
    }
    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 6px; /*将轨道设为圆角的*/
      box-shadow: 0 1px 1px #d4d2d2, inset 0 .125em .125em #eaeaea; /*轨道内置阴影效果*/
    }    
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
      background: #9eb8ff; 
      border-radius: 50%; /*外观设置为圆形*/
      border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
      box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
    }
  </style>
  <div class="audio-player">
    <h1 class="songName"></h1>

    <div class="progressBar">
      <div class="bg-line"></div>
      <div class="pass-line">
        <span class="rBtn"></span>
      </div>
      <input type="range" id="input-range" value="0" />
    </div>
    <div>
      <p class="songProgressTime">00:00 / --:--</p>
      <span class="btn preBtn">上一曲</span>
      <span id="playOrpause" class="btn playBtn">暂停</span>
      <span class="btn nextBtn">下一曲</span>
    </div>
  </div>
`

window.audioPlayer = {
  preBtn: null, // 上一曲按钮
  nextBtn: null, // 下一曲按钮
  playBtn: null, // 播放/暂停按钮
  songName: null, // 当前播放歌曲名
  progressBar: null, // 进度条控制
  progressTime: '00:00', // 已播放时间
  songProgressTime: null, // 当前歌曲总时间标签
  InputProgressBar: null, // 进度条input
}
class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    console.log('加载audio模板成功')
    window.audioPlayerTemp = document.querySelector('audio-player')

    audioPlayer.nextBtn = audioPlayerTemp.shadowRoot.querySelector('.nextBtn')
    audioPlayer.preBtn = audioPlayerTemp.shadowRoot.querySelector('.preBtn')
    audioPlayer.playBtn = audioPlayerTemp.shadowRoot.querySelector('.playBtn')
    audioPlayer.songName = audioPlayerTemp.shadowRoot.querySelector('.songName')
    audioPlayer.progressBar = audioPlayerTemp.shadowRoot.querySelector('.pass-line')
    audioPlayer.songProgressTime = audioPlayerTemp.shadowRoot.querySelector('.songProgressTime')
    audioPlayer.InputProgressBar = audioPlayerTemp.shadowRoot.querySelector('#input-range')
    this.addEvents()
  }

  static get observedAttributes() {
    return ['songname'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateFuc(name, oldValue, newValue)
  }

  updateFuc(name, oldValue, newValue) {
    if (name === 'songname') {
      audioPlayer.songName.innerText = newValue
    }
  }

  addEvents() {
    audioPlayer.preBtn.onclick = () => {
      console.log('上一首, 开发中')
    }
    audioPlayer.nextBtn.onclick = () => {
      console.log('下一首，开发中')
    }
    audioPlayer.playBtn.onclick = () => {
      if (audioPlayer.playBtn.innerText === '暂停') {
        audio.pause()
        audioPlayer.playBtn.innerText = '播放'
      } else {
        audio.play()
        audioPlayer.playBtn.innerText = '暂停'
      }
    }
    audioPlayer.progressBar.onclick = () => {
      console.log('下一首，开发中')
    }
    audioPlayer.InputProgressBar.ontouchstart = () => {
      audio.pause()
    }
    audioPlayer.InputProgressBar.onmousedown = () => {
      audio.pause()
    }
    audioPlayer.InputProgressBar.onmouseup = () => {
      progressChange()
    }
    audioPlayer.InputProgressBar.ontouchend = () => {
      progressChange()
    }
  }
}

window.customElements.define('audio-player', AudioPlayer);

// 进度条
function progressChange() {
  let pro = audioPlayer.InputProgressBar.value
  let currentTime = Math.floor(audio.duration * pro / 100)
  audio.currentTime = currentTime
  audio.play()
}
function formateMm(val) {
  let M = Math.floor(val / 60)
  let m = val % 60
  M = M.toString().length === 1 ? '0' + M : M
  return M + ':' + m
}
function getDuration() {
  let currentTime = Math.floor(audio.currentTime),
    duration = Math.floor(audio.duration)
  changeProgressLine(currentTime, duration)
}
function changeProgressLine(cur, all) {
  let progressBarPosition = (cur / all).toFixed(2)
  audioPlayer.progressBar.style.right = (1 - progressBarPosition) * 100 + '%'
  audioPlayer.InputProgressBar.value = progressBarPosition * 100
  audioPlayer.songProgressTime.innerText = formateMm(cur) + ' / ' + formateMm(all)
}
var playStatusInterval
audio.addEventListener("playing", function () {		//播放状态Doing
  playStatusInterval = setInterval(() => {
    getDuration()
  }, 1000)
})
audio.addEventListener("pause", function () {		//播放状态Doing
  clearInterval(playStatusInterval)
})
