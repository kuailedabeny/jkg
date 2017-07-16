
/*1、移动端导航栏滑动  4个参数
* 传入ul对象进行dom操作:ulObj
 每个li的长度:liLength
 li的数量:liCount
 长度类型：type*/
function ulSlide(ulObj, liLength, liCount, type) {
    ulObj = ulObj.get(0);///转换成dom元素去添加触摸监听事件，用jq监听报错
    var ulLength = liLength * liCount;
    $(ulObj).css(type, ulLength);//动态设置ul的长度,
    var startX, moveX, distanceX;
    var currentX = 0;
    ulObj.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;

    })
    ulObj.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        distanceX = moveX - startX;
        $(ulObj).css("transition", "none");
        $(ulObj).css("transform", "translate(" + (currentX + distanceX) + "px)");

    })
    ulObj.addEventListener("touchend", function (e) {
        if (currentX + distanceX > 30) {//说明左边已经漏出了空白没有更多菜单了，要弹回到左边
            $(ulObj).css("transition", "all 1s");
            $(ulObj).css("transform", "translate(" + 0 + "px)");
        }
        else if (currentX + distanceX < -(ulLength - $(window).width())) {//说明右面已经漏出了空白没有更多菜单了，要弹回到右边
            $(ulObj).css("transition", "all 1s");
            $(ulObj).css("transform", "translate(" + (-(ulLength - $(window).width())) + "px)");
        }
        else {
            currentX += distanceX;
        }
    })
}

/*2、获的url地址栏传入的参数值  1个参数
 * url地址栏参数的属性名：name,记得使用时候是传入字符串格式*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2])); return null;
}