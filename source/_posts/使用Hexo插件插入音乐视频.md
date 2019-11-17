---
title: 使用Hexo插件插入音乐视频
date: 2019-03-10 21:43:50
tags:
---

### NexT主题添加音乐
在Hexo博客中添加音乐，有三种方式可以插入音乐
<!--more-->
#### 一、使用html标签
写法如下：
``` html
<audio src="" style="max-height :100%; max-width: 100%; display: block; margin-left: auto; margin-right: auto;" controls="controls" loop="loop" preload="meta">Your browser does not support the audio tag.</audio>
```
#### 二、使用网易云外链
网易云音乐的外链很好用，不仅有可以单曲，还能有歌单，有兴趣的自己去网易云音乐找首歌尝试。但是有一些音乐因为版权原因放不了，还有就是不完全支持 https，导致小绿锁不见了。
网易云歌曲外链接获取方法
首先 找到你要下载的歌曲 用网页版打开 复制链接中的歌曲ID 如：
`SHAUN - Way` `Back Home`
`https://music.163.com/#/song?id=863046037`
ID就是`863046037`
然后将ID替换到下面的链接中
`http://music.163.com/song/media/outer/url?id=863046037.mp3`
#### 三、安装插件

添加音乐当然可以用其他网站的外链，但是一般外链是`<iframe>`，这个影响网站的SEO，逼格也不够高。
安装插件可以完美的解决上面的问题，并且用插件，有显示歌词功能，也美观，建议使用这种方法。
两个好用的hexo插件：

**hexo-tag-aplayer：**https://github.com/grzhan/hexo-tag-aplayer

在博客目录下Git Bush Here 输入
`npm install hexo-tag-aplayer`
**是不行的**
直接输入

`npm install hexo-tag-aplayer@2.0.1`
```
{% aplayer title author url [picture_url, narrow, autoplay, width:xxx, lrc:xxx] %}
```

**标签参数**

- title : 曲目标题
- author: 曲目作者
- url: 音乐文件 URL 地址
- picture_url: (可选) 音乐对应的图片地址
- narrow: （可选）播放器袖珍风格
- autoplay: (可选) 自动播放，移动端浏览器暂时不支持此功能
- width:xxx:(可选) 播放器宽度(默认: 100%)
- lrc:xxx: (可选）歌词文件 URL 地址

博客使用
```
{% aplayer "See You Again" "Wiz Khalifa / Charlie Puth" "http://music.163.com/song/media/outer/url?id=30953009.mp3"  "http://p2.music.126.net/JIc9X91OSH-7fUZqVfQXAQ==/7731765766799133.jpg?param=130y130" "autoplay=false" %}
```


{% aplayer "See You Again" "Wiz Khalifa / Charlie Puth" "http://music.163.com/song/media/outer/url?id=30953009.mp3"  "http://p2.music.126.net/JIc9X91OSH-7fUZqVfQXAQ==/7731765766799133.jpg?param=130y130" "autoplay=false" %}
除了使用标签 `lrc` 选项来设定歌词，你也可以直接使用 `aplayerlrc` 标签来直接插入歌词文本在博客中：
```
{% aplayerlrc "title" "author" "url" "封面(选填)" "autoplay" %}
[00:00.00]lrc here
{% endaplayerlrc %}
```



{% aplayerlrc "title" "author" "url" "autoplay" %}
[00:00.00]lrc here
{% endaplayerlrc %}

{% aplayerlist %}
{
    "narrow": false,                        
    "autoplay": false,                         
    "mode": "random",                         
    "showlrc": 3,                             
    "mutex": true,                            
    "theme": "#e6d0b2",                       
    "preload": "metadata",                    
    "listmaxheight": "513px",                
    "music": [
        {
            "title": "アイロニ",
            "author": "鹿乃",
            "url": "http://music.163.com/song/media/outer/url?id=31421442.mp3",
            "pic": "http://p1.music.126.net/4Zpn57gnArtV3F5xiNBK0g==/109951163598414321.jpg?param=130y130"        
        },  
           {
            "title": "Fade",
            "author": "Alan Walker",
            "url": "http://music.163.com/song/media/outer/url?id=29947420.mp3",
            "pic": "http://p1.music.126.net/6Skxbgl8cfIjFGV-MzGi0Q==/109951163787691327.jpg?param=130y130"

        }
    ]
}
{% endaplayerlist %}

更多详细使用方法参考文档：[hexo-tag-aplayer][1]
歌词的获取，可以直接找到各层次文件，或者可以直接在网易云上通过以下方法获取
`http://music.163.com/api/song/media?id=863046037`
其中id为网易云歌曲的id，打开链接之后，可以把”lyric”字段的值复制下来，再删除\n就可以直接放到aplayerlrc标签中了，这样就可以有歌词出现


同理
`npm install hexo-tag-dplayer`
```
{% dplayer "url=https://raw.githubusercontent.com/YSC168/eee/master/yu.mp4"  "pic=http://home.ustc.edu.cn/~mmmwhy/GEM.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}
```
{% dplayer "url=https://raw.githubusercontent.com/YSC168/eee/master/yu.mp4"  "pic=http://home.ustc.edu.cn/~mmmwhy/GEM.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}



[1]: https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md