var seting={apiUrl:"api/",ratio:0.618,types:'360new',downApi:'https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url='};var jigsaw={count:0,halfHtml:'',loadBig:false,ajaxing:false};window.onresize=function(){resizeHeight();};window.onload=function(){ajax360Tags();loadData(seting.types,true);resizeHeight();};$(function(){$(window).scroll(function(){if($(this).scrollTop()+$(window).height()+20>=$(document).height()&&$(this).scrollTop()>20){loadData(seting.types,false);}
if(seting.types!='bing'&&seting.types!='ciba'){if($(window).scrollTop()>=300){$('#toolBall').fadeIn(400);}else{$('#toolBall').fadeOut(200);}}});$("#toolBall").click(function(){if(seting.types=='bing'||seting.types=='ciba'){return true;}
$("html, body").animate({scrollTop:0},"normal");return false;});$("body").on("click","#full-img",function(){$("#full-img").remove();});$("#walBox").on("click","img",function(){showImg($(this).data('realurl'));});});function loadData(types,newload){if(types!=seting.types||newload===true)
{seting.types=types;jigsaw={count:0,halfHtml:'',loadBig:false,ajaxing:false};$("#walBox").html('');$(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');$(".onepage-pagination").remove();$("body").removeClass();$(".jigsaw").removeAttr("style");$("#toolBall").attr('href','javascript:void(0);');$("#toolBall").attr('class','uptoTop');$("#toolBall").attr('title','返回顶部');$("#toolBall").hide();}
switch(seting.types)
{case 'bing':ajaxBingWal(-1,8);ajaxBingWal(7,8);$("#toolBall").show();$("#toolBall").attr('class','downBing');$("#toolBall").attr('title','下载这张图片');break;case 'ciba':if(newload===false)return;ajaxCiba(1);$("#toolBall").show();$("#toolBall").attr('class','downBing');$("#toolBall").attr('title','下载这张图片');break;default:ajax360Wal(seting.types,jigsaw.count,30);}}
resizeHeight();function resizeHeight(){switch(seting.types)
{default:var newHeight=$("#walBox").width()*(seting.ratio/2);$(".jigsaw .item").css('height',newHeight);$(".jigsaw .Hhalf").css('height',newHeight/2);}
return true;}
function addJigsaw(img,alt){var newHtml;var imgWidth,imgHeight;jigsaw.count++;if(jigsaw.halfHtml!=='')
{imgWidth=parseInt(screen.width/4);imgHeight=parseInt(imgWidth*seting.ratio);newHtml='    <div class="Hhalf oneImg" onmouseover="hoverJigsaw(this)">'
+'        <img data-original="'+decode360Url(img,imgWidth,imgHeight,0)+'" alt="'+alt+'" title="关键字：'+alt+'" data-realurl="'+img+'">'
+'    </div>'
+'</div>';contAdd(jigsaw.halfHtml+newHtml);jigsaw.halfHtml='';return true;}
if(((jigsaw.count-1)%5)===0){jigsaw.loadBig=false;}
if((jigsaw.loadBig===false)&&((Math.floor(Math.random()*3)===0)||((jigsaw.count%5)===0)))
{imgWidth=parseInt(screen.width/2);imgHeight=parseInt(imgWidth*seting.ratio);newHtml='<div class="item half oneImg" onmouseover="hoverJigsaw(this)">'
+'    <img data-original="'+decode360Url(img,imgWidth,imgHeight,0)+'" alt="'+alt+'" title="关键字：'+alt+'" data-realurl="'+img+'">'
+'</div>';contAdd(newHtml);jigsaw.loadBig=true;return true;}
imgWidth=parseInt(screen.width/4);imgHeight=parseInt(imgWidth*seting.ratio);jigsaw.halfHtml='<div class="item quater">'
+'    <div class="Hhalf oneImg" onmouseover="hoverJigsaw(this)">'
+'        <img data-original="'+decode360Url(img,imgWidth,imgHeight,0)+'" alt="'+alt+'" title="关键字：'+alt+'" data-realurl="'+img+'">'
+'    </div>';return true;}
function contAdd(html)
{var myBox=$("#walBox");var $newHtml=$(html);myBox.append($newHtml);$("img",$newHtml).lazyload({effect:'fadeIn',threshold:200});}
function ajaxBingWal(start,count){$.ajax({type:"GET",url:seting.apiUrl,data:"cid=bing&start="+start+"&count="+count,dataType:"json",success:function(jsonData){var newHtml='<link rel="stylesheet" href="css/onepage-scroll.css">',downUrl='';$("#walBox").append(newHtml);for(var i=0;i<jsonData.images.length;i++){downUrl='https://cn.bing.com'+jsonData.images[i].url;newHtml+='<section data-url="'+downUrl+'" data-img="https://cn.bing.com'+jsonData.images[i].url+'"><p class="note">'+jsonData.images[i].copyright+'</p></section>';}
$("#walBox").append(newHtml);$('#walBox').onepage_scroll({loop:false,beforeMove:function(index){$("#toolBall").attr('href',$(".section").eq(index-1).attr('data-url'));$(".section").eq(index-1).attr('style','background-image: url('+$(".section").eq(index-1).attr('data-img')+')');},afterMove:function(index){$(".section").eq(index).attr('style','background-image: url('+$(".section").eq(index).attr('data-img')+')');$(".section").eq(index-2).attr('style','background-image: url('+$(".section").eq(index-2).attr('data-img')+')');}});$("#toolBall").attr('href',$(".section").eq(0).attr('data-url'));$(".section").eq(0).attr('style','background-image: url('+$(".section").eq(0).attr('data-img')+')');}});return true;}
function ajaxCiba(data){$.ajax({type:"GET",url:"https://open.iciba.com/dsapi/",dataType:"jsonp",success:function(jsonData){var newHtml='<style>#walBox .note{position: fixed;}body{background-image: url('+jsonData.picture2+');overflow: hidden;}</style>'+
'<p class="note" title="'+jsonData.translation+'"><span onclick="$(\'audio\')[0].play();" title="点击朗读" class="ciba-eng">'+jsonData.content+'</span><br>'+jsonData.note+
' <span title="'+jsonData.love+'人喜欢" class="ciba-love" onclick="$(\'.love-count\').html(parseInt($(\'.love-count\').html()) + 1)"><span style="color: red;">❤</span>+<span class="love-count">'+jsonData.love+'</span></span></p>'+
'<audio src="'+jsonData.tts+'" hidden></audio>';$("#walBox").append(newHtml);$("#toolBall").attr('href',seting.downApi+jsonData.picture2);}});return true;}
function ajax360Tags(){$.ajax({type:"GET",url:seting.apiUrl,data:"cid=360tags",dataType:"json",success:function(jsonData){var newHtml='';for(var i=0;i<jsonData.data.length;i++){newHtml+='<li data-id='+jsonData.data[i].id+' onclick="loadData('+jsonData.data[i].id+', true);changeTitle(this)">'+jsonData.data[i].name+'</li>';}
$("#tags").append(newHtml);}});return true;}
function ajax360Wal(cid,start,count){if(jigsaw.ajaxing===true)return false;$("#loadmore").html('努力加载中……');$("#loadmore").show();jigsaw.ajaxing=true;$.ajax({type:"GET",url:seting.apiUrl,data:"cid="+cid+"&start="+start+"&count="+count,dataType:"json",success:function(jsonData){for(var i=0;i<jsonData.data.length;i++){addJigsaw(jsonData.data[i].url,decode360Tag(jsonData.data[i].tag));}
resizeHeight();jigsaw.ajaxing=false;if(jsonData.data.length===0){$("#loadmore").html('所有的壁纸都已经加载完啦！');}else{$("#loadmore").hide();}}});return true;}
function decode360Tag(oldTag){return oldTag.match(/_category_[^_]+_/g).join(" ").replace(/_category_([^_]+)_/g,"$1");}
function decode360Url(oldUrl,width,height,quality){var newUrl=oldUrl.replace("r\/__85","m\/"+parseInt(width)+"_"+parseInt(height)+"_"+quality);newUrl=newUrl.replace(/http:\/\//g,"https://");return newUrl;}
function hoverJigsaw(obj){if($(obj).find('.down').length>0)return true;var realUrl=$(obj).find('img').attr("data-realurl");var downBox='';downBox='<ul class="down" title="下载壁纸">'
+'<li><a href="'+seting.downApi+decode360Url(realUrl,2560,1600,100)+'" target="_blank">2560x1600</a></li>'
+'<li><a href="'+seting.downApi+decode360Url(realUrl,1440,900,100)+'" target="_blank">1440x900</a></li>'
+'<li><a href="'+seting.downApi+decode360Url(realUrl,1024,768,100)+'" target="_blank">1024x768</a></li>'
+'<li><a href="'+seting.downApi+decode360Url(realUrl,800,600,100)+'" target="_blank">800x600</a></li>'
+'<li><a href="'+seting.downApi+decode360Url(realUrl,0,0,100)+'" target="_blank" title="下载原始尺寸图片">原始尺寸</a></li></ul>'
$(obj).append(downBox);}
function changeTitle(obj){$('title').html($(obj).html()+' - 在线壁纸');}
var imgDom;function showImg(img){imgDom=$('<img>').attr('id','full-img').attr('src',img).appendTo('body');}
console.info('作者：mengkun(https://mkblog.cn)\n壁纸来源于：360壁纸库、必应首页壁纸以及金山词霸开放平台\nGithub：https://github.com/mengkunsoft/wallpaper');