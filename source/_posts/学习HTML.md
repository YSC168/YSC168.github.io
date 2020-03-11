---
title: 学习HTML
date: 2019-01-16 11:51:15
tags: 
---
<html>
<head>


<script>
function clickCounter()
{
	if(typeof(Storage)!=="undefined")
	{
		if (localStorage.clickcount)
		{
			localStorage.clickcount=Number(localStorage.clickcount)+1;
		}
		else
		{
			localStorage.clickcount=1;
		}
		document.getElementById("result").innerHTML=" 你已经点击了按钮 " + localStorage.clickcount + " 次 ";
	}
	else
	{
		document.getElementById("result").innerHTML="对不起，您的浏览器不支持 web 存储。";
	}
}
</script>
<script>
document.write("Hello World!")
</script>
</head>
<body>
<p>
W3C_school随时随地学编程
学习阶段
</p>


<a style="float:left;"  href="#">HTML</a> 
<a  style="float:left;" href="#">CSS</a> 
<a  style="float:left;" href="#">Javascript</a> 
<a style="float:left;"  href="#">jQuery</a>

	
<p><s>我的车是红色的。</s></p>

<!--more-->

<canvas id="myCanvas" style="float:left;">你的浏览器不支持 HTML5 canvas 标签。</canvas>

<script>
var c=document.getElementById('myCanvas');
var ctx=c.getContext('2d');
ctx.fillStyle='#000000';
ctx.fillRect(0,0,100,100);
</script>

<canvas id="myCanva" width="200" height="200" style="border:1px solid #000;float:left;">
您的浏览器不支持 HTML5 canvas 标签。</canvas>

<script>
var c=document.getElementById("myCanva");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(100,100,50,0,10*Math.PI);
ctx.stroke();
</script> 

<form>
 <fieldset>
  <legend>个人信息:</legend>
  姓名: <input type="text"><br>
  邮箱: <input type="text"><br>
  生日: <input type="text">
 </fieldset>
</form>
<br>

<div id="resul"></div>
<script>
if(typeof(Storage)!=="undefined")
{
  localStorage.sitename="微博客";
  document.getElementById("resul").innerHTML="网站名：" + localStorage.sitename;
}
else
{
  document.getElementById("resul").innerHTML="对不起，您的浏览器不支持 web 存储。";
}
</script>


<button onclick="clickCounter()" type="button">点我！</button>
<div id="result"></div>
点击该按钮查看计数器的增加。
关闭浏览器选项卡(或窗口),重新打开此页面,计数器将继续计数(不是重置)。


<ol start="520">
  <li>咖啡</li>
  <li>茶</li>
  <li>牛奶</li>
</ol>

<form>
<input list="flowers" name="flower">
<datalist id="flowers">
  <option value="玫瑰">
  <option value="月季">
  <option value="牡丹">
  <option value="紫罗兰">
  <option value="向日葵">
</datalist>

</form>
<form >
  选择你喜欢的颜色: <input type="color" name="favcolor"><br>

</form>

<p id="demo">点击按钮获取您当前坐标（可能需要比较长的时间获取）：</p>
<button onclick="getLocation()">点我</button>
<div id="mapholder"></div>
<script>
var x=document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="该浏览器不支持获取地理位置。";}
  }

function showPosition(position)
  {
  var latlon=position.coords.latitude+","+position.coords.longitude;

  var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
  +latlon+"&zoom=14&size=400x300&sensor=false";
  document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
  }

function showError(error)
  {
    switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="用户拒绝对获取地理位置的请求。"
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="位置信息是不可用的。"
      break;
    case error.TIMEOUT:
      x.innerHTML="请求用户地理位置超时。"
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="未知错误。"
      break;
    }
  }
</script>



<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
   <polygon points="100,10 40,180 190,60 10,60 160,180"
   style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;">
</svg>

<center>
<figure>
<img src="https://api.uixsj.cn/bing/bing.php" alt="bing" width="304" height="228">
<figcaption>Pic.1 - 必应每日一图</figcaption>
</figure>
</center>
今天别忘了买<mark>牛奶</mark>。
展示给定的数据范围:
<meter value="2" min="0" max="10">2 out of 10</meter>
<meter value="0.6">60%</meter>
<meter value="1.0">100%</meter>

<hr>
<details>
<summary>Copyright 1997-2020-查看详细信息</summary>
男，96后摩羯座，不追热点，不关时政，不要喧哗，不惹纷争。
爱好：代码如诗，热爱生活以及喜欢思考有意义的东西。
</details>

我在每天早上<time>8:30</time>开始上班。

<textarea rows="10" cols="30" width="100%">
我是一个文本框。


<audio controls>
<source src="https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.6/mp3/tonghuaz.mp3" type="audio/ogg">
<source src="https://cdn.jsdelivr.net/gh/YSC168/cdn@2.0.6/mp3/tonghuaz.mp3" type="audio/mpeg">
浏览器不支持 audio 元素。
</audio>
<footer>
Posted by: Yan Shengchao
<time pubdate datetime="2020-03-11"></time>
</footer>
<iframe src="http://blxin.coding.me/" width="100%" height="800">

</body>