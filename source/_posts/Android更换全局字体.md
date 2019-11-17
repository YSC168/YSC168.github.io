---
title: Android更换全局字体
date: 2018-09-20 15:38:03
tags: Android  
categories: 安卓
---
Android O 推出了一项新的功能 Fonts in XML，借助这项功能，我们能比较方便地实现App全局字体的替换。
<!--more-->
Android Studio操作

1. 右键单击项目的 `app / res` 文件夹，然后选择 `New > Android resource directory`。

2. 打开下拉菜单并选择 `font`，输入 `font` 作为File name，点击`OK`。

3. 将字体文件拖放到新的 `res / font` 文件夹中。Android O支持 `.otf（OpenType）` 和 `.ttf（TrueType）` 两种格式的字体文件。

### 创建Font family

在Android Studio中创建Font family

1. 右键单击项目的 `res / font` 文件夹，然后选择 `New > Font resource file` 。

2. 输入文件名，然后点击 `OK` .

3. 打开此XML文件并定义该字体的所有不同版本，以及其样式和权重属性，例如：

```xml
  <?xml version="1.0" encoding="utf-8"?>
  <font-family xmlns:android="http://schemas.android.com/apk/res/android">
      <font
          android:fontStyle="normal"
          android:fontWeight="400"
          android:font="@font/lobster_regular" />
      <font
          android:fontStyle="italic"
          android:fontWeight="400"
          android:font="@font/lobster_italic" />
  </font-family>
  ```




**添加字体至style**

打开 `style.xml` 文件，将fontFamily属性设置为你想要访问的字体文件。

```xml
<style name="customfontstyle" parent="@android:style/TextAppearance.Small">
    <item name="android:fontFamily">@font/lobster</item>
</style>
```

### 在XML布局中使用字体资源



**给TextView添加字体**

+ 在XML布局文件中，将fontFamily设置为你想要的访问的字体文件：

  ```xml
  <TextView
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:fontFamily="@font/lobster"/>
  ```


在你的App的Theme中配置此属性即可实现整个App的字体替换。

### 使用代码控制字体

``` java
Typeface typeface = getResources().getFont(R.font.myfont);
textView.setTypeface(typeface);
```

内容来自Android Developer官网，做了简单的翻译
https://developer.android.com/preview/features/fonts-in-xml.html

[DEMO下载][1]

  [1]: https://raw.githubusercontent.com/YSC168/eee/master/demo.apk