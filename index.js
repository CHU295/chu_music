var list = []
var searchValue = '周杰伦'
var currentPage = 1
var pageSize = 10
var total = 9999

var currentSong = {}

var audio = document.querySelector('audio');
var playStatus = audio.paused // 播放状态

audio.onended = function () {
  randomGet()
};

function keyDown(event, el) {
  if (event.keyCode === 13) {
    search_btn()
  }
}

function change(e, type) {
  window[type] = document.querySelector(`#${type}`).value
}

function search_btn() {
  if (pageSize * (currentPage - 1) > total) {
    alert('？？？？体育老师教的？不会算有几页吗？')
  } else {
    xhrFuc()
  }
}

function changePage(type) {
  if (type == 'reduce') {
    if (currentPage == 1) {
      return alert('还上一页个锤子？')
    }
    currentPage--
  } else if (type == 'add') {
    currentPage++
  }
  search_btn()
}

function randomGet() {
  var random = Math.random()
  var length = list.length
  random = Math.floor(random * length)
  sing(list[random].contentId)
}

function xhrFuc() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=${encodeURI(searchValue)}&pageNo=${currentPage}&pageSize=${pageSize}&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let res = JSON.parse(xhr.responseText)
        if (res.code === '000000') {
          list = res.songResultData.result || []
          total = res.songResultData.totalCount
          document.querySelector('#search_type').innerHTML = `总数量：${total}&nbsp;&nbsp;&nbsp;&nbsp;当前页数：${currentPage}&nbsp;&nbsp;&nbsp;&nbsp;每页条数：${pageSize}`
          createNode()
        } else {
          alert(res.info)
        }
      }
    }
  }
  xhr.send();
}

function createSingleNode(val) {
  return `<div class="pointer" ><span>${val.singers && val.singers.length > 0 ? val.singers[0].name : ''}</span> - <span onclick="checkSong(${JSON.stringify(val).replace(/"/g, '&quot;')})">${val.name}</span></div>`
}
function createNode() {
  var node = '<div>'
  list.map(i => {
    node += createSingleNode(i)
  })
  node += '</div>'
  document.querySelector('#song-list').innerHTML = node
  document.querySelector('#operation').style.visibility = 'visible'
}
function checkSong(val) {
  currentSong = val
  audioPlayerComponent.querySelector('#singName').innerHTML = currentSong.name
  sing(currentSong.contentId)
}
function sing(contentId) {
  // 无损 formatType = SQ resourceType = E
  // 高品 formatType = HQ resourceType = 2
  let uri = `http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${contentId}&resourceType=2&channel=1`
  audio.src = uri
}