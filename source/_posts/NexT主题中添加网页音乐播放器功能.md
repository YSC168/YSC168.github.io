---
title: NexT主题中添加网页音乐播放器功能
date: 2018-11-20 21:27:50
tags: hexo
---



为博客添加网页音乐播放器功能

### Download

点击访问Aplayer源码：[GitHubAplayer][1]。下载到本地，解压后将`dist`文件夹复制到`themes\next\source`文件夹下。
<!--more-->
### 新建music.js

新建`themes\next\source\dist\music.js`文件，添加内容：

``` js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    audio: [
         {
        name: 'Sakura Tears',
        artist: '櫻花淚',
        url: 'http://music.163.com/song/media/outer/url?id=509313150.mp3',
        cover: 'http://p1.music.126.net/HS9QYUXD3UCpmBxnMfxicA==/109951163604923548.jpg?param=180y180',
      },
      {
        name: "Shape of You",
        artist: 'J.Fla',
        url: 'http://music.163.com/song/media/outer/url?id=468882985.mp3',
        cover: 'http://p1.music.126.net/hZ2ttGYOQbL9ei9yABpejQ==/109951163032775841.jpg?param=130y130',
      },
     {
        name: "你是人间四月天",
        artist: '解忧邵帅',
        url: 'http://music.163.com/song/media/outer/url?id=1344897943.mp3',
        cover: 'http://p2.music.126.net/o9SkgZVnB2g0JDeeK-ugGA==/109951163886781910.jpg?param=130y130',
      },  
    ]
});
```

源码中对应的参数解释，这边都有： [Aplayer 中文文档][2]

`audio`对应的便是音频文件，所以音乐播放器需要播放的音乐是需要自己进行相关信息（如歌曲链接、歌词、封面等）的配置。





### 网易云音乐获取外链


####  方法一  输入网易云音乐id

外链转换地址https://link.hhtjim.com/
也可以直接替换https://link.hhtjim.com/163/歌曲id.mp3

####  方法二

http://music.163.com/song/media/outer/url?id=歌曲id.mp3
例如J.Fla的Shape of You歌曲https://music.163.com/#/song?id=468882985  其中468882985就是id
只需要查看歌曲id，替换上面链接歌曲id即可…… 


###  _layout.swig

打开`themes\next\layout\_layout.swig`文件，将下面代码

``` swig
<link rel="stylesheet" href="/dist/APlayer.min.css">
<div id="aplayer"></div>
<script type="text/javascript" src="/dist/APlayer.min.js"></script>
<script type="text/javascript" src="/dist/music.js"></script>
```
添加到`<body itemscope...>`后面就行，即在`<body></body>`里面。

重新生成，访问页面，就能看到左下角的音乐播放器了。

[参考地址][3]


  [1]: https://github.com/MoePlayer/APlayer
  [2]: https://aplayer.js.org/#/zh-Hans/
  [3]: https://asdfv1929.github.io/2018/05/26/next-add-music/