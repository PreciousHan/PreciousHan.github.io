// 当页面加载完之后执行js代码要写load事件
// 第一步鼠标移入和移出显示和消失
window.addEventListener('load', function () {
    // 放大镜模块start
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    // 第二步遮挡层跟着鼠标移动
    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2
        var Xmax = this.offsetWidth - mask.offsetWidth;
        var Ymax = this.offsetHeight - mask.offsetHeight;
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX > Xmax) {
            maskX = Xmax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY > Ymax) {
            maskY = Ymax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //第三步设置大图的移动
        // 大图
        var bigImg = document.querySelector('.bigImg');
        // 大图最大的移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图的移动距离X Y
        var bigX = maskX * bigMax / Xmax;
        var bigY = maskY * bigMax / Ymax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
    // 放大镜模块end
    // ETab模块点击切换模块start
    var ETab = this.document.querySelector('.ETab');
    var Elis = ETab.querySelector('.tab_main').querySelectorAll('li');
    var Econs = ETab.querySelector('.tab_con').querySelectorAll('.item');
    for (var i = 0; i < Elis.length; i++) {
        Elis[i].setAttribute('indexe', i);
        Elis[i].onclick = function () {
            // 给选项卡设置
            for (var j = 0; j < Elis.length; j++) {
                Elis[j].className = '';
            }
            this.className = 'current';
            //  给相应的内容设置
            var indexe = this.getAttribute('indexe');
            for (var i = 0; i < Econs.length; i++) {
                Econs[i].style.display = 'none';
            }
            Econs[indexe].style.display = 'block';
        }
    }
    // ETab模块点击切换模块end
    //  detail模块点击切换模块start
    var tab_main = this.document.querySelector('.detail').querySelector('.tab_main');
    var lis = tab_main.querySelectorAll('li');
    var p_boxs = this.document.querySelector('.detail').querySelectorAll('.p_box');
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            // 给选项卡设置
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = '';
            }
            this.className = 'current';
            // 给相应的内容设置
            var index = this.getAttribute('index');
            console.log(index);
            for (var i = 0; i < p_boxs.length; i++) {
                p_boxs[i].style.display = 'none';
            }

            p_boxs[index].style.display = 'block';
        }
    }
    //  detail模块点击切换模块end

})
