console.log("\n %c HeoMusic 开源静态音乐播放器 v1.5 %c https://github.com/zhheo/HeoMusic \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
console.log("\n %c 播放本地音乐 By 皇家元林 %c https://hjyl.org \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")

var heoMusicPage = document.getElementById("heoMusic-page");
heoMusicPage.innerHTML = `<meting-js><div id="app"></div></meting-js>`;
var aplayer = new APlayer({
    container: document.getElementById("app"),
    lrcType: 3,
    order: 'random',
    preload: 'auto',
    mutex: true,
    theme: '#b7daff'
});
var volume = aplayer.volume(0.5,true);

var heo = {
  getCustomPlayList: function() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', './music.json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          musicList = JSON.parse(xhr.responseText);
          //console.info(musicList);
          //添加音乐列表
          aplayer.list.add(musicList);

          //jsmediatags组件获取音乐封面，并转blob地址，开始
          aplayer.on('loadeddata', function () {
            const musicIndex = document.querySelector(".aplayer-list-light .aplayer-list-index").innerText;
            musicUrl = aplayer.list.audios[musicIndex-1].url;
            //console.log(musicUrl);
            jsmediatags.read(musicUrl, {
              onSuccess: function(tag) {
                // 获取图片信息
                const { data } = tag.tags.picture;
                imageUrl = URL.createObjectURL(new Blob([new Uint8Array(tag.tags.picture.data).buffer]));
                const musicCover = document.querySelector("#heoMusic-page .aplayer-pic");
                musicCover.style.backgroundImage = "url('"+imageUrl+"')";
                //封面转背景
                const heoMusicBg = document.getElementById("music_bg");
                heoMusicBg.style.backgroundImage = musicCover.style.backgroundImage;
                //console.log("heoMusicBg:"+heoMusicBg.style.backgroundImage);
                //console.log("musicCover:"+musicCover.style.backgroundImage);
                //修改标题实时显示歌曲名+歌手
                const musicTitle = document.querySelector(".aplayer-list-light .aplayer-list-title").innerText;
                const musicAuthor = document.querySelector(".aplayer-list-light .aplayer-list-author").innerText;
                if (musicTitle !="" || musicAuthor !=""){
                  document.title = musicTitle +  " - " + musicAuthor + " | 皇家元林";
                }else{
                  document.title = "音乐 | 皇家元林"
                }
                
              },
              onError: function(error) {
                console.log(':( 此音乐无封面', error.type, error.info);
              }
            });
          });
          //jsmediatags组件获取音乐封面，并转blob地址，结束

        } else {
        alert('很抱歉，没有获取到音乐数据哦~')
        }
      }
    }
    xhr.send();
  }
}

// 调用
heo.getCustomPlayList();

// 改进vh
const vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 1;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//空格控制音乐
document.addEventListener("keydown", function(event) {
  //暂停开启音乐
  if (event.code === "Space") {
    event.preventDefault();
    aplayer.toggle();
  };
  //切换下一曲
  if (event.keyCode === 39) {
    event.preventDefault();
    aplayer.skipForward();
  };
  //切换上一曲
  if (event.keyCode === 37) {
    event.preventDefault();
    aplayer.skipBack();
  }
  //增加音量
  if (event.keyCode === 38) {
    if (volume <= 1) {
      volume += 0.1;
      aplayer.volume(volume,true);
    }
  }
  //减小音量
  if (event.keyCode === 40) {
    if (volume >= 0) {
      volume += -0.1;
      aplayer.volume(volume,true);
    }
  }
});
