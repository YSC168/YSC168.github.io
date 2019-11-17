---
title: ADB的使用
date: 2018-11-18 00:07:43
tags:
---

### **手机要进入设置->开发人员选项->打开USB调试**
在电脑上进入cmd输入 `adb services` 显示有一串数字就OK了
**打开`根目录/data/misc/wifi/wpa_supplicant.conf`的文件可以查看连过的WIFI密码**
#### 一、配置android的adb环境变量
> 建议百度


----------
<!--more-->

#### 二、常用的adb代码


> 1、重启有关


 - 关机
先输入`adb shell`,然后`reboot -p`

 - 重启设备

    `adb reboot`

 - 重启到bootloader界面

    `adb reboot bootloader`

 - 重启到Recovery界面

    `adb reboot recovery`
    

> 2、APK操作（手机应用不需要ROOT权限）

 - 卸载软件

    `adb shell pm uninstall -k 包名`
    
使用-k参数：保留安装包的数据和缓存目录。


----------


>  **常用包名（不要干坏事！！！）** 
QQ：`com.tencent.mobileqq` 
微信：`com.tencent.mm`
> 微博：`com.sina.weibo` 
支付宝：`com.eg.android.AlipayGphone`

 - 安装软件

 没有
 
####  三、其他
 **在命令行中先输入`adb shell`**
 在输入以下代码:
创建文件夹 `mkdir /sdcard/tmp`
删除文件 `rm -f /sdcard/test.txt`
移动文件  `mv /sdcard/tmp /sdcard/test`
锁屏 `input keyevent 223`
返回 `input keyevent 3`
已安装第三方应用  `pm list packages -3`
已安装应用 `pm list packages` 
手机电量 `dumpsys battery`
手机型号 `getprop ro.product.model`
清除apk数据 `pm clear com.test.abc`
截屏 `creencap /sdcard/screen.png`
DNS `etprop net.dns1`
IP地址 `fconfig`
或者 `ip -f inet addr show wlan0` 
 