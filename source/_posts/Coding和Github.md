---
title: Coding和Github
date: 2019-11-19 19:15:35
tags: hexo
---
<div class="note info"><p>部署到 Coding Pages 的好处：国内访问速度更快，可以提交百度收录（GitHub 禁止了百度的爬取）</p></div>


<div class="note info"><p>部署过程中常见的问题：无法实现全站 HTTPS，Coding 申请 SSL 证书失败，浏览器可能会提示不是安全链接</p></div>

<!--more-->

### 创建项目

进入 Coding 官网，点击个人版登陆，没有账号就注册一个并登录，由于 Coding 已经被腾讯收购了，所以登录就会来到腾讯云开发者平台，点击创建项目

项目名称建议和你的用户名一致，这样做的好处是：到时候可以直接通过 user_name.coding.me 访问你的博客，如果项目名与用户名不一致，则需要通过 user_name.coding.me/project_name 才能访问，项目描述可以随便写


### 配置公钥

配置 SSH 公钥方法与 GitHub Pages 的方式差不多，点击你的头像，依次选择【个人设置】-【SSH公钥】-【新增公钥】

前面部署到 GitHub Pages 的时候就已经有了一对公钥，我们直接将该公钥粘贴进去就行，公钥名称可以随便写，选中**永久有效**选项

PS：公钥储存位置一般在 C:\Users\用户名\.ssh 目录下的 id_rsa.pub 文件里（直接搜索），用记事本打开复制其内容即可

添加公钥后，我们可以右键在配置文件下 `Get Bash`，输入以下命令来检查是否配置成功：


``` 
ssh -T git@git.coding.net
```

若出现以下提示，则证明配置成功：

```
Coding 提示: Hello XXX, You've connected to Coding.net via SSH. This is a personal key.
XXX，你好，你已经通过 SSH 协议认证 Coding.net 服务，这是一个个人公钥
```

### 配置 _config.yml

进入你的项目，在右下角有选择连接方式，选择 SSH 方式（HTTPS 方式也可以，但是这种方式有时候可能连接不上，SSH 连接不容易出问题），一键复制，然后打开你本地博客根目录的`_config.yml` 文件，找到 deploy 关键字，添加 coding 地址：`coding: git@git.dev.tencent.com:user_name/user_name.git`，也就是刚刚复制的 SSH 地址

```yml
deploy:
  type: git
  repository: 
    github: git@github.com:YSC168/YSC168.github.io.git
    coding: git@git.dev.tencent.com:ysc168/ysc168.coding.me.git
  branch: master
```
 添加完成后先执行命令 hexo clean 清理一下缓存，然后执行命令 hexo g -d 将博客双线部署到 Coding Pages 和 GitHub Pages，如下图所示表示部署成功：

### 开启 Coding Pages

进入你的项目，在代码栏下选择 Pages 服务，一键开启 Coding Pages，等待几秒后刷新网页即可看到已经开启的 Coding Pages，到目前为止，你就可以通过 xxxx.coding.me（比如我的是 trhx.coding.me）访问你的 Coding Pages 页面了

### 绑定域名并开启 HPPTS

首先在你的域名 DNS 设置中添加一条 CNAME 记录指向 xxxx.coding.me，解析路线选择默认，将 GitHub 的解析路线改为境外，这样境外访问就会走 GitHub，境内就会走 Coding，也有人说阿里云是智能解析，自动分配路线，如果解析路线都是默认，境外访问同样会智能选择走 GitHub，境内走 Coding，我没有验证过，有兴趣的可以自己试试。一共有4个，2个站点的解析ping conding和ping github，2个站点的跳转

然后点击静态 Pages 应用右上角的设置，进入设置页面，这里要注意，如果你之前已经部署到了 GitHub Pages 并开启了 HTTPS，那么直接在设置页面绑定你自己的域名，SSL/TLS 安全证书就会显示申请错误，没有申请到 SSL 证书，当你访问你的网站时，浏览器就会提示不是安全连接

申请错误原因是：在验证域名所有权时会定位到 Github Pages 的主机上导致 SSL 证书申请失败

正确的做法是：**先去域名 DNS 把 GitHub 的解析暂停掉，然后再重新申请 SSL 证书**，把github的ping和跳转暂停，大约十秒左右就能申请成功，然后开启强制 HTTPS 访问

这里也建议同时绑定有 www 前缀后没有 www 前缀的，然后在域名 DNS 添加一个 CNAME 或者 A 记录，记录值为 @，这样不管用户是否输入 www 前缀都可以访问了

在博客资源引用的时候也要注意所有资源的 URL 必须是以 https:// 开头，不然浏览器依旧会提示不安全！

![ssl][2]

至此，我们的 Hexo 博客就成功双线部署到 Coding Pages 和 GitHub Pages 了，并且也实现了全站 HPPTS，访问速度会得到提升。


[2]: https://cdn.jsdelivr.net/gh/YSC168/ImgResource/Img/coding/ssl.png