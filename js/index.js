window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var prev = focus.querySelector('.prev');
    var next = focus.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过显示左右箭头start
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    });
    // 鼠标经过显示左右箭头end
    // 鼠标经过隐藏左右箭头start
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件click()
            next.click();
        }, 2000)
    });
    // 鼠标经过隐藏左右箭头end
    //  动态生成小圆圈,有几张照片生成几个小圆圈start

    var img_list = focus.querySelector('.img-list');
    var promo_nav = focus.querySelector('.promo-nav');
    // 生成和img_list照片中相同的li
    for (var i = 0; i < img_list.children.length; i++) {
        // 创建li
        var li = this.document.createElement('li');
        // 通过自定义属性记录小圆圈的索引号
        li.setAttribute('index', i);
        // 把li插入到promo_nav里去;
        // appendChild()向结点最后添加一个子节点
        promo_nav.appendChild(li);
        // 点击小圆圈变色功能start
        li.addEventListener('click', function () {
            // 排他思想
            for (var i = 0; i < promo_nav.children.length; i++) {
                promo_nav.children[i].className = '';
            }
            // 当前选中li变色
            this.className = 'selected';
            // 点击小圆圈移动图片功能start
            var index = this.getAttribute('index');
            // 当我们点击li把li的索引号给num
            num = index;
            // 当我们点击li把li的索引号给circle
            circle = index;
            animate(img_list, -index * focusWidth);
            // 点击小圆圈移动图片功能end
        })
        // 点击小圆圈变色功能end
    }

    // 把promo_nav第一个li设置类名为selected
    promo_nav.children[0].className = 'selected';
    // 克隆第一个照片li
    var first = img_list.children[0].cloneNode(true);
    img_list.appendChild(first);
    //  动态生成小圆圈,有几张照片生成几个小圆圈end
    // 点击图片右侧按钮,图片滚动一张start
    var num = 0;
    var circle = 0;
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 无缝滚动图走到了负值的最后一张图片,立刻ul复原left:0
            if (num == img_list.children.length - 1) {
                img_list.style.left = 0 + 'px';
                num = 0;
            }
            num++;
            animate(img_list, -num * focusWidth, function () {
                flag = true;
            });
            // 点击右侧按钮,小圆圈跟着一起变化start   
            circle++;
            // 如果circle到了图片最后一张要清0
            if (circle == promo_nav.children.length) {
                circle = 0;
            }
            circleChange();
            // 点击图片右侧按钮,图片滚动一张end
        }
    })
    // 点击右侧按钮,小圆圈跟着一起变化end
    // 左侧按钮做法start
    prev.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果图片是第一张就要往回移
            if (num == 0) {
                num = img_list.children.length - 1;
                img_list.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(img_list, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? promo_nav.children.length - 1 : circle;
            circleChange();
        }
    })
    // 左侧按钮做法end
    function circleChange() {
        for (var i = 0; i < promo_nav.children.length; i++) {
            promo_nav.children[i].className = '';
        }
        promo_nav.children[circle].className = 'selected';
    }
    // 自动播放轮播图start
    var timer = this.setInterval(function () {
        // 手动调用点击事件click()
        next.click();
    }, 2000)
    // 自动播放轮播图end
    // 电梯导航显示与隐藏start
    var rboxTop = $(".recom").offset().top;
    // 设置互斥锁
    var flag = true;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= rboxTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
        if (flag) {
            //页面滚动到某个内容区域，电梯导航栏相应li添加和删除current类名
            $("body .f").each(function (index, domEle) {
                if ($(document).scrollTop() >= $(domEle).offset().top) {
                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass();
                }
            })
        }
    })
    // 电梯导航显示与隐藏end
    // 点击电梯导航跳转到相应位置start
    $(".fixedtool li").click(function () {
        flag = false;
        console.log($(this).index());
        // 选出索引号对应盒子,计算他的offset().top值
        var current = $("body .f").eq($(this).index()).offset().top;
        // 点击电梯导航跳转到相应位置end
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        })
        // 点击之后就让当前的li添加current,其他的li移出current
        $(this).addClass("current").siblings().removeClass();
    })

})