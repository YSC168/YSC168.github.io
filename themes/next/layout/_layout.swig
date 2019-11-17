<!DOCTYPE html>

{% set html_class = 'theme-next ' + theme.scheme %}
{% if theme.motion.enable %}
  {% set html_class = html_class + ' use-motion' %}
{% endif %}

<html class="{{ html_class | lower }}" lang="{{ config.language }}">
<!--
                                                        
            -. .                                        
       _____   ',' ,                                    
     ,'     ,'   ', ',                                  
   ,'     ,'      |  |                                  
  \       \       |  |                                  
    \ /^\   \    ,' ,'                                  
          \   \ ,' ,'        党的光辉照耀着我         
    / ~-.___\.-'  ,'               
  /   .______.- ~ \                                     
/   /'          \   \                                   
\./               \/'                                   

    美丽，温柔可爱的芊芊，一直爱你！
-->
<head>
  {% include '_partials/head.swig' %}
  <title>{% block title %}{% endblock %}</title>
  {% include '_third-party/analytics/index.swig' %}
  <!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/clicklove.js"></script>
<style>
  canvas { position: fixed;  
              top: 0;  
              left: 0;  
              z-index: 0;  
              width: 100%;  
              height: 100%;  
              pointer-events: none; 
              } 

::-webkit-scrollbar {width: 8px;height:5px;}
::-webkit-scrollbar-track {-webkit-border-radius: 2em;-moz-border-radius: 2em;border-radius:2em;}
::-webkit-scrollbar-thumb {background-color: #ffc266;background-image: -webkit-linear-gradient(45deg,  rgba(255, 153, 0, 1) 25%,  transparent 25%,  transparent 50%,  rgba(255, 153, 0, 1) 50%,  rgba(255, 153, 0, 1) 75%,  transparent 75%,  transparent);-webkit-border-radius: 2em;-moz-border-radius: 2em;border-radius:2em;

</style>
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ page.lang || page.language || config.language }}">
   <canvas ></canvas> 
  <script src="./bg.js"></script>
  <link rel="stylesheet" href="/dist/APlayer.min.css">
<div id="aplayer"></div>
<script type="text/javascript" src="/dist/APlayer.min.js"></script>
<script type="text/javascript" src="/dist/music.js"></script>
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/clicklove.js"></script>
 
  {% set container_class = "container " %}
  {% if theme.sidebar.position %}
    {% set container_class = container_class + 'sidebar-position-' + theme.sidebar.position %}
  {% endif %}
  
  <div class="{{ container_class }} {% block page_class %}{% endblock %}">
    <div class="headband"></div>
<div  background: url(https://SKIN.gs/content/templates/FLY/img/1.gif);
    height:4px;
    top:0px;
    position: fixed;
    width:100%;
    Z-index:9999;></div> 
    <header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="header-inner"> {%- include '_partials/header.swig' %} </div>


    </header>

    <main id="main" class="main">
      <div class="main-inner">
        <div class="content-wrap">
          <div id="content" class="content">
            
            {% block content %}{% endblock %}
          </div>
          {% include '_third-party/duoshuo-hot-articles.swig' %}
          {% include '_partials/comments.swig' %}
        </div>
        {% if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {% endif %}
      </div>
    </main>

    <footer id="footer" class="footer">
      <div class="footer-inner">
        {% include '_partials/footer.swig' %}
        {% include '_third-party/analytics/analytics-with-widget.swig' %}
        {% block footer %}{% endblock %}
      </div>
    </footer>

    {% if not theme.sidebar.b2t %}
      <div class="back-to-top">
        <i class="fa fa-arrow-up"></i>
        {% if theme.sidebar.scrollpercent %}
          <span id="scrollpercent"><span>0</span>%</span>
        {% endif %}
      </div>
    {% endif %}

    {% if theme.needmoreshare2.enable and theme.needmoreshare2.float.enable %}
      <div id="needsharebutton-float">
        <span class="btn">
          <i class="fa fa-share-alt" aria-hidden="true"></i>
        </span>

      </div>
    {% endif %}

  </div>

  {% include '_scripts/vendors.swig' %}
  {% include '_scripts/commons.swig' %}

  {% set scheme_script = '_scripts/schemes/' + theme.scheme | lower + '.swig' %}
  {% include scheme_script %}

  {% block script_extra %}{% endblock %}

  {% include '_scripts/boostrap.swig' %}

  {% include '_third-party/comments/index.swig' %}
  {% include '_third-party/search/index.swig' %}
  {% include '_third-party/analytics/lean-analytics.swig' %}
  {% include '_third-party/analytics/firestore.swig' %}
  {% include '_third-party/seo/baidu-push.swig' %}
  {% include '_third-party/needsharebutton.swig' %}
  {% include '_third-party/rating.swig' %}
  {% include '_third-party/mathjax.swig' %}
  {% include '_third-party/scroll-cookie.swig' %}
  {% include '_third-party/exturl.swig' %}



</body>
</html>
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
<!--崩溃欺骗-->
<script type="text/javascript" src="/js/src/crash_cheat.js"></script>

<script type="text/javascript" src="/js/src/bg.js"></script>
<script type="text/javascript" src="/js/src/instantclick-1.2.2.js.js"></script>
<!--动态线条背景-->
<script type="text/javascript"
color="220,220,220" opacity='0.7' zIndex="-2" count="200" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js">
</script>