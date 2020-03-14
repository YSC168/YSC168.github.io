---
title: Github+Hexo制作个人博客
date: 2018-05-08 20:38:42
tags:  [ hexo, github]
categories: 学习
---
## 步骤一<!-- more -->
[github+hexo 搭建属于自己的博客网站](https://www.jianshu.com/p/e6662ca7e283)
## 高大上
[让 GITHUB 的链接跳向自己设置的域名](https://www.zybuluo.com/ysc168/note/1130772)
## 步骤二
[GITHUB+HEXO博客轻松更换主题外观](https://www.jianshu.com/p/469e985288b3)
## 步骤三
[32种主题个性化教程](https://blog.csdn.net/qq_33699981/article/details/72716951)


更换sidebar颜色
打开`themes/next/source/css/_custom/custom.styl`在里面新增如下代码：
```
// 修改网站头部颜色
.headband {
    height: 3px;
    background: #ff9999;
}
.site-meta {
    padding: 20px 0;
    color: #fff;
    background: #ff9999;
}
.site-subtitle {
    margin-top: 10px;
    font-size: 13px;
    color: #ffffff;
}
```
在next下打开`Git Bush` 输入`git pull`进行next的版本更新



## 其他

**如果提示 ERROR Deployer not found: git**

则输入 `npm install --save hexo-deployer-git`

**Next样式无法加载**
在`.\themes\next\layout\_partials\head.swig`中添加

    <meta http-equiv=”Content-Security-Policy” content=”upgrade-insecure-requests”/>


**修改博客字体大小**

打开`hexo\themes\next\source\css\ _variables\custom.styl`文件，将`$font-size-base`改成15px，如下所示：


    
                 $font-size-base            =15px
   

看到FATAL、error就表明呵呵了。建议关掉本地预览页面(http://localhost:4000/) （我也不懂为什么，但是这样做有时候确实有效），然后hexo clean一下，重新生成静态文件，再次部署。
部署成功之后，打开yourusername.github.io看看是否已经有blog了？


**最后 hexo的英文冒号后要空格，不然会出错！**