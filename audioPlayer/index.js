const template = document.createElement('template');
template.innerHTML = `
<style>
    .audio-player {
      margin: 20px 0;
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
  </style>
  <div class="audio-player">
    <h1 class="songName"></h1>
    <div class="progressBar">
      <div class="bg-line"></div>
      <div class="pass-line">
        <span class="rBtn"></span>
      </div>
    </div>
    <div>
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
  }
}

window.customElements.define('audio-player', AudioPlayer);

// 进度条
function getDuration() {
  let currentTime = Math.floor(audio.currentTime),
    duration = Math.floor(audio.duration)
  console.log(currentTime, duration)
  changeProgressLine(currentTime, duration)
}
function changeProgressLine(cur, all) {
  let progressBarPosition = 1 - (cur / all).toFixed(2)
  audioPlayer.progressBar.style.right = progressBarPosition * 100 + '%'
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
