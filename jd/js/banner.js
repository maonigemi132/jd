window.onload = function () {
    var imgArr = document.querySelectorAll("#img-lunUl img")
    var ul = document.getElementById("img-lunUl");
    var aLi = document.querySelectorAll("#img-lunUl li")


    /* ul的宽度根据li的个数增加而增加 */
    ul.style.width = ul.children.length * 590 + "px";
    var lefts = document.querySelector(".prev-left");
    var rights = document.querySelector(".prev-right");

    //默认显示图片的索引
    var index = 0;
    /* 下一页轮播 */
    lefts.onclick = function () {
        index--;
        publics()
        backColors();
    }
    /* 上一页轮播 */
    rights.onclick = function () {
        index++;
        publics();
        backColors();
    }


    /* 根据图片情况生成响应的原点数量 */
    var dot = document.getElementById("create-dot");


    /* 根据图片数量创建圆点 */
    function showDot() {
        for (var i = 0; i < imgArr.length; i++) {
            // 创建圆点         
            var dotlist = document.createElement("span");
            dot.appendChild(dotlist);
        }

    }
    showDot();

    var spanAll = document.querySelectorAll("#create-dot span")
    /* 设置轮播图加载一开始背景颜色 */
    spanAll[index].style.background = "white"


    function backColors() {
        for (var i = 0; i < spanAll.length; i++) {
            spanAll[i].style.background = "";
        }
        spanAll[index].style.background = "white"
    }


    for (var i = 0; i < spanAll.length; i++) {
        spanAll[i].num = i
        spanAll[i].onmouseenter = function () {
            /*  clearInterval(time); */
            index = this.num
            ul.style.left = -590 * index + "px";
            opacitys();
            backColors();
        }
    }

    var times = {};
    /* 自动轮播 */
    function autoPlay() {
        clearInterval(times);
        times.num = setInterval(function () {
            index++;
            publics();
            backColors();
        }, 3500)
    }
    autoPlay();

    /* 轮播鼠标移入阻止轮播 */
    var container = document.querySelector(".img-lun");
    /* 鼠标悬停清除定时器 */
    StopTimePublic(container, times, autoPlay)




    /* 公共部分分离出来 */
    function publics() {
        if (index < 0) {
            index = ul.children.length - 1
        } else {
            index %= imgArr.length;
        }
        ul.style.left = -590 * index + "px";
        opacitys();
    }

    /* 使用过渡搭配opacity方式使得轮播图方式没那么痴呆 */
    function opacitys() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].style.opacity = 0;
        }
        aLi[index].style.opacity = 1;
    }




    /* 轮播图旁边的轮播商品 */
    var sliderLeft = document.getElementById("sliderLeft")
    var sliderRight = document.getElementById("sliderRight")
    var slider = document.getElementById("sliderRecommendWrapper");
    slider.onmousemove = function () {
        sliderLeft.style.display = 'block'
        sliderRight.style.display = 'block'
    }
    slider.onmouseout = function () {
        sliderLeft.style.display = ''
        sliderRight.style.display = ''
    }

    var imgs = document.querySelectorAll("#slide1 img")
    var imgs2 = document.querySelectorAll("#slide2 img")
    var imgs3 = document.querySelectorAll("#slide3 img")
    var nextIndex = 0

    function sliberPublic() {
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.opacity = 0;
            imgs2[i].style.opacity = 0;
            imgs3[i].style.opacity = 0;
        }
        imgs[nextIndex].style.opacity = 1;
        imgs2[nextIndex].style.opacity = 1;
        imgs3[nextIndex].style.opacity = 1;
    }



    sliderRight.onclick = function () {
        nextIndex++;
        nextIndex %= imgs.length
        sliberPublic();
    }


    sliderLeft.onclick = function () {
        nextIndex--;
        if (nextIndex < 0) {
            nextIndex = imgs.length - 1
        }
        sliberPublic();
    }

    var sliderTime = {};
    function sliderAutoPlay() {
        clearInterval(sliderTime);
        sliderTime.num = setInterval(function () {
            nextIndex++;
            nextIndex %= imgs.length
            sliberPublic();
        }, 4500)


    }
    sliderAutoPlay();
    /* 轮播鼠标移入阻止轮播 */
    var sliderContainer = document.getElementById("sliderRecommendWrapper");
    /* 移入暂停 */
    StopTimePublic(sliderContainer, sliderTime, sliderAutoPlay)


    /* 封装公共定时器暂停 
        第一个参数是要暂停对象
        第二个参数是定时器的钥匙，传过来的值要对象的
        第三个参数是移开后继续轮播的函数
    */
    /*    function StopTimePublic(obj, stopTimeName, methodFunction) {
           obj.onmouseenter = function () {
               clearInterval(stopTimeName.num);
           }
           obj.onmouseleave = function () {
               methodFunction();
           }
       } */



    /* 秒杀模块 */
    var hours = document.getElementById("time-hour");
    var minutes = document.getElementById("time-minute")
    var seconds = document.getElementById("time-second")

    var setTime = new Date("2021-8-29  24:00:00");
    countDown();


    var downTime;
    downTime = setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date();

        /* 返回毫秒数 */
        var downsTime = (setTime - nowTime) / 1000;

        var downsHours = (downsTime / 60 / 60 % 24); //3600秒取模24代表24小时
        /* 取整显示小时 */
        var hoursInteger = parseInt(downsHours)

        if (hoursInteger < 1) {
            hoursInteger = 0
        } else if (hoursInteger <= 0) {
            window.clearInterval(downTime)
            return;
        }

        /* 小时 */
        hoursInteger = hoursInteger < 10 ? '0' + hoursInteger : hoursInteger;
        hours.innerHTML = hoursInteger
        /* 分钟 */
        var reMinutes = parseInt(downsTime / 60 % 60);
        reMinutes = reMinutes < 10 ? "0" + reMinutes : reMinutes;
        minutes.innerHTML = reMinutes;

        /* 显示秒 */
        var reseconds = parseInt(downsTime % 60);
        reseconds = reseconds < 10 ? "0" + reseconds : reseconds;
        seconds.innerHTML = reseconds;
    }



    /* 搜索框下拉固定在顶部 */
    var search = document.getElementById("flexs");
    var icoadd = document.getElementById("ico-add")
    var shoppingcar = document.querySelector(".shopping-car")




    onscroll = function () {
        var lT = document.documentElement.scrollTop;
        if (lT > 400) {
            search.className = "search-shopping clearfix fixed";
            shoppingcar.className = "shopping-car shopping-caradd"
            icoadd.className = "phone   iconfont ico-add"
        } else {
            search.className = "search-shopping clearfix"
            shoppingcar.className = "shopping-car clearfix"
            icoadd.className = "phone   iconfont"
        }
        /* search.style.height=50+"px" */
    }




    /* 秒杀模块 */
    var seckillLun = document.getElementById("seckill-lun")
    var seckillA = document.querySelectorAll(".seckill-a")
    var seckillLeft = document.getElementById("seckillLeft")
    var seckillRight = document.getElementById("seckillRight")
    seckillLun.style.width = seckillA.length * 200 + "px"

    var seckillindex = 0;


    seckillRight.onclick = function () {
        seckillindex += 4;
        seckillPublic();
    }

    seckillLeft.onclick = function () {
        seckillindex -= 4;
        if (seckillindex < 0) {
            seckillindex = seckillA.length - 8;
            seckillLun.style.left = -2400 + "px";
        }
        seckillPublic();
    }

    /* 公开的 */
    function seckillPublic() {

        if (seckillindex % 4 === 0) {
            if (seckillindex === seckillA.length) {
                seckillindex = 4
                seckillLun.style.left = 0;
            }
            move(seckillLun, "left", -200 * seckillindex, 10, function () {

            })
        }
    }

    /* 秒杀滚动栏定时器 */
    var seckiltime = {};
    function seckillPlay() {
        clearInterval(seckiltime);
        seckiltime.num = setInterval(function () {
            seckillindex += 4;
            seckillPublic();
        }, 10000)
    }
    seckillPlay();

    StopTimePublic(seckillLun, seckiltime, seckillPlay);
    StopTimePublic(seckillLeft, seckiltime, seckillPlay);
    StopTimePublic(seckillRight, seckiltime, seckillPlay);


    /* 发现好货滚动模块 */
    var slideImgs = document.getElementById("slide-imgs")
    var jdGood = document.getElementById("J_niceGoods-shopping")
    var slideaImgsList = document.querySelectorAll("#slide-imgs img");
    slideImgs.style.width = slideaImgsList.length * 200 + "px";



    var slideaIndex = 0;
    var slideaTimes = {};
    function slideaPlay() {
        clearInterval(slideaTimes)
        slideaTimes.num = setInterval(function () {
            slideaIndex++
            if (slideaIndex >= 2000) {
                slideaIndex = 0;
            }
            slideImgs.style.left = -1 * slideaIndex + "px"

        }, 10)
    }
    slideaPlay();

    StopTimePublic(slideImgs, slideaTimes, slideaPlay);
    StopTimePublic(jdGood, slideaTimes, slideaPlay);
    

}