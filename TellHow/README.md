# TellHow

泰豪首页   原网页：http://www.tellhow.cn/

### 轮播图

1. 引入swiper.min.js文件和css文件

```html
<link rel="stylesheet" href="css/swiper.min.css">
<script src="js/swiper.min.js"></script>
```

2. 添加html

```html
<!--轮播图-->
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="img/kv01.jpg">
            <div class="img-word-1"></div>
        </div>
        <div class="swiper-slide">
            <img src="img/kv02.jpg">
            <div class="img-word-2"></div>
            <div class="img-word-3"></div>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
```

3. 初始化swiper

```javascript
		//初始化轮播图
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
        });
```



### 鼠标滚动滑进动画

1. 引入js和css文件

```html
<link rel="stylesheet" href="css/animate.css" type="text/css"/>
<script type="text/javascript" src="js/plugins.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
```

2. 添加data属性

```html
<div class="box1">
        <div class="main-center">
            <div class="box1-1" data-animate="fadeInLeft">
                <h1>智能电力</h1>
                <p>
                    以能源互联网技术的研究与应用为基础，围绕能源互联网、电力信息化、智能应急电源产品的研制与服务，已成为国家电网、南方电网电力调度信息化业务主流供应商，并积极围绕国家“一带一路”战略，拓展国际电力工程总包业务。</p>
                <a href="">了解更多</a>
            </div>
        </div>
</div>
```

> data-animate="fadeInLeft"

属性列表：

| 属性值      | 含义             |
| ----------- | ---------------- |
| fadeInLeft  | 从左滑进（淡入） |
| fadeInRight | 从右滑进（淡入） |
|             |                  |

