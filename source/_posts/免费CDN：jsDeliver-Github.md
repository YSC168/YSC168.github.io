---
title: 免费CDN：jsDeliver+Github
date: 2019-03-09 22:26:41
tags:
---
CDN的全称是Content Delivery Network，即内容分发网络。CDN是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。——百度百科

放在Github的资源在国内加载速度比较慢，因此需要使用CDN加速来优化网站打开速度，jsDeliver + Github便是免费且好用的CDN，非常适合博客网站使用。

https://www.itrhx.com/2019/08/01/A27-image-hosting/
[升级版][10]
<!--more-->
####  第一步：新建Github仓库
![此处输入图片的描述][1]
####  第二步：上传文件
上传图片或者js、css文件。可以直接上传文件夹。
![此处输入图片的描述][2]
**或者这样上传**

复制文件到本地
```
cd 某个目录下
git clone git@github.com:你的用户名/cdn.git

```
or ( `github` 和 `coding`通用的 ）
```
git clone 一键复制的仓库地址

```
然后开始上传

```
cd 到git仓库目录下
// 查看状态
git status
// 添加所以改动
git add .
// 提交
git commit -m '第一次提交'
// 推送至远程仓库
git push
```
（注：jsDeliver不支持加载超过20M的资源，所以一些视频最好压缩到20M以下）

#### 第三步：发布仓库
![此处输入图片的描述][3]
点击release发布
![此处输入图片的描述][4]
#### 第四步：通过jsDeliver引用资源
使用方法：
https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@发布的版本号/文件路径
比如：
**加载js**

**加载图片**
https://cdn.jsdelivr.net/gh/ysc168/cdn@1.0/images/head.png

![head][5]



**GIF**

![GIF][6]


**TXT**

https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/txt/cgt.txt

**音频**


{% aplayer "过火" "欧芊" "https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/audio/gh.m4a"  "https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.6/ico/head.jpg" "autoplay=false" %}

**视频**

{% dplayer "url=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/videos/girlf.mp4"  "pic=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.5/wallpaper/mianhuat.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}

{% dplayer "url=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.5/videos/jkhhxj.mp4"  "pic=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.8/wallpaper/horizontal.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}

{% dplayer "url=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.9/videos/thmz.mp4"  "pic=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.8/wallpaper/horizontal.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}

{% dplayer "url=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.5/videos/nightcar.mp4"  "pic=https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.8/wallpaper/horizontal.jpg" "loop=yes" "theme=#FADFA3" "autoplay=false" "token=tokendemo" %}



**发现的问题**

上传一次更新release再发布
调用新版本的链接。比如：
https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0/images/release.png
用1.0就打不开
https://cdn.jsdelivr.net/gh/YSC168/cdn@1.0/images/release.png


  [1]: https://cdn.jsdelivr.net/gh/YSC168/cdn@1.0/images/newproject.png
  [2]: https://cdn.jsdelivr.net/gh/YSC168/cdn@1.0/images/upload.png
  [3]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0/images/release.png
  [4]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0/images/release1.png
  [5]: https://cdn.jsdelivr.net/gh/ysc168/cdn@1.0/images/head.png
  [6]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/pic/cute.gif
  [7]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/txt/cgt.txt
  [8]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/audio/gh.m4a
  [9]: https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.4/videos/girlf.mp4
  [10]: https://www.itrhx.com/2019/08/01/A27-image-hosting/