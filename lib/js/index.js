$(function(){
//文字轮播
//    autoPlay();
    function autoPlay() {
                /*无缝原理：让整个ul向左不断移动，为了开头和结尾处连接比较顺畅，
         要在开头加上最后的一张图片，在结尾处加上第一张图片，障眼法实现无缝连接
         * */
        /*获取放图片的ul元素*/
        var index = 1;
        var bannerUlImg = document.querySelector(".jd_bannerImg");
        /*分别获取第一张和最后一张图片用来复制一份进行插入*/
        var firstLiImg = bannerUlImg.querySelector("li:first-of-type");
        var lastLiImg = bannerUlImg.querySelector("li:last-of-type");
        /*都是用ul来调用方法进行插入*/
        bannerUlImg.insertBefore(lastLiImg.cloneNode(true), firstLiImg);
        bannerUlImg.appendChild(firstLiImg.cloneNode(true));
        /*加入两张图片后，那么ul的宽度要变大，同时每个li的宽度百分比也要修改一下*/
        var lis = bannerUlImg.querySelectorAll("li");
        //这里是获取盛放文字所在ul的整个容器的高度，注意修改类名
        var bannerWidth = document.querySelector(".kg_prodis").offsetWidth;
        /* console.log(lis);首尾加过两张图片之后这里lis的长度已经是10了
         * 此时ul的长度=li的数量*每个图片的宽度  每个li的长度等于容纳整个轮播图的容器的宽度*/
        bannerUlImg.style.width = lis.length * 120 + "px";
        //for (var i = 0; i < lis.length; i++) {
        //    lis[i].style.height = bannerHeight + "px";
        //}
        //
        /*实现触摸滑动*/
    /*1、需要三个事件,触摸开始，触摸滑动，滑动结束 touchstart touchmove touchend
     * 2、定义变量记录过程中的数据，移动结束位置的坐标减去开始触摸坐标，让ul移动差值的距离*/
    var startX, moveX, transX;
    var  isEnd=true;
    bannerUlImg.addEventListener("touchstart", function (event) {

        startX = event.targetTouches[0].clientX;
        clearInterval(timer);

    });
    bannerUlImg.addEventListener("touchmove", function (event) {
        if (isEnd==true) {
            moveX = event.targetTouches[0].clientX;
            transX = moveX - startX;
            bannerUlImg.style.transform = "translate(" + (-index * 100 + transX) + "px)";
            /*当触摸滑动时候反应有个延迟，是过度产生的，这里当滑动改变位移时候要把过度去掉*/
            bannerUlImg.style.transition = "none";
        }
    });
    /*3、在触摸结束事件里面判断滑动的距离，如果距离大于100px就翻页，如果距离小于100px包括0px也就是用户没有滑动那么就回弹不用翻页*/
    bannerUlImg.addEventListener("touchend", function (event) {
        /*实现翻页*/
        if (Math.abs(transX) > 100) {
            /*向左翻页*/
            if (transX < 0) {
                index++;
                bannerUlImg.style.transform = "translate(" + (-index * 100) + "px)";
                bannerUlImg.style.transition = "all 0.5s";
            }
            /*向右翻页*/
            else if (transX > 0) {
                index--;
                bannerUlImg.style.transform = "translate(" + (-index * 100) + "px)";
                bannerUlImg.style.transition = "all 0.5s";
            }

        }
        else if(Math.abs(transX)>0){
            bannerUlImg.style.transform = "translate(" + (-index * 100) + "px)";
            bannerUlImg.style.transition = "all 0.5s";

        }
        //setTimer();
        isEnd=false;
        transX=0;
    });
    

    /*4、监听当过度完成后判断当前索引是否是最后一张和第一张，
     * 最后一张：index=1，瞬间位移到第二张，去除过度
     * 第一张：index=count-2,瞬间位移到倒数第二张，去除过度
     *
     * */
    bannerUlImg.addEventListener("transitionend", function () {
        if (index == lis.length - 1) {
            index = 1;
            bannerUlImg.style.transform = "translate(" + (-index * 100) + "px)";
            bannerUlImg.style.transition = "none";
        }
        if (index == 0) {
            index = lis.length - 2;
            bannerUlImg.style.transform = "translate(" + (-index * 100) + "px)";
            bannerUlImg.style.transition = "none";

        }
        isEnd = true;
        //moveFlag(index);
    });
    /*5、添加节流阀，防止用户触摸过快造成翻页会翻出空白,
     /5.1、出现这种情况原因：由于用户触摸过快可能超过了过渡需要的总时间，ul位移还没有过度完成，就又继续执行下一个触摸操作，这时候松开点到原始点是有一个差值的，这时候松开触摸事件的条件符合就会触发里面的逻辑，不断的翻页，由于防止出现空白判断是否是第一张还是最后一张是在过度完成时候触发，不符合条件所以此逻辑不会被触发执行，所以touchend事件里面不断翻页失去判断是否是第一或者最后一张，所以最后就会翻出空白

     5.2、 这里核心是要阻止用户操作过快，那么就人为限定只有当一个触摸操作完成时候，用户的下一个操作才能生效。
     2.1 每次执行触摸移动move事件时候判断isEnd的状态，是true才会开始执行逻辑
     2.2 一张图片切换过渡transitionend完成之后说明前一次滑动操作完成了此时isEnd=true;*/
    /* var isEnd=true;表示上一个操作已经完成了当前操作可以执行*/

    /*6、当图片过渡完成后标志移动*/
    //function moveFlag(index){
    //    var ulFlag=document.querySelector(".jd_banner").querySelector("ul:last-of-type");
    //    var liFlag=ulFlag.querySelectorAll("li");
    //    for (var i = 0; i < liFlag.length; i++) {
    //        liFlag[i].classList.remove("current");
    //    }
    //    liFlag[index-1].classList.add("current");
    //}

//
//
//        /*自动播放原理：1、加定时器2、让ul移动li的宽度,索引不断改变，设置移动位移*/
//        var index = 1;
//        /*记录当前播放图片索引，默认是第二张图片*/
//        var timer;
//        bannerUlImg.style.transform = "translateY(-" + index * bannerHeight + "px)";
//        setTimer();
//        function setTimer() {
//            timer = setInterval(function () {
//                index++;
//                bannerUlImg.style.transform = "translateY(-" + index * bannerHeight + "px)";
//                bannerUlImg.style.transition = "all 1s";
//            }, 2000);
//
//        }
//
//        /*当播放到最后一张图片后，让其瞬间跳到第二张，添加过度完成事件来判断*/
//        bannerUlImg.addEventListener("transitionend", function () {
//            if (index == lis.length - 1) {
//                index = 1;
//                bannerUlImg.style.transform = "translateY(-" + index * bannerHeight + "px)";
//                /*这里记得要清除过度，不然的话有一个过度从后滑到左边的效果*/
//                bannerUlImg.style.transition = "none";
//            }
//        })
//
//
}

});