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
  </style>
  <div class="audio-player">
    <h1 class="songName"></h1>
    <div>进度</div>
    <div>
      <span class="btn preBtn">上一曲</span>
      <span id="playOrpause" class="btn playBtn">暂停</span>
      <span class="btn nextBtn">下一曲</span>
    </div>
  </div>
`

window.audioPlayer = {
  preBtn: null,
  nextBtn: null,
  playBtn: null,
  songName: null,
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
  }
}

window.customElements.define('audio-player', AudioPlayer);
