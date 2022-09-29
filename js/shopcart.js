$(function () {
    $(".itxt").each(function (index, domEle) {
        $(domEle).val("1");
    })
    // 点击选中背景变色start

    check();
    function check() {
        $(".j-checkbox").change(function () {
            if ($(this).prop("checked")) {
                $(this).parents(".cart-item").addClass("check-cart-item");
            } else {
                $(this).parents(".cart-item").removeClass("check-cart-item");
            }
        })
    }
    // 点击选中背景变色end
    // 按钮全选start
    $(".checkall").change(function () {
        $(".j-checkbox ,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 如果全选按钮选中就把所有选项卡的背景变色
            $(".cart-item").addClass("check-cart-item");
        }else{
             // 如果全选按钮不是选中就把所有选项卡的取消背景颜色
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    })
    // 按钮全选end
    //商品数量增加减start
    // 商品数量加
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".decrement").css({
            color: "#232326",
            cursor: "pointer"
        })
        $(this).siblings(".itxt").val(n);
        // 修改商品小计
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").find("strong").text("￥" + (p * n).toFixed(2));
        getSum();
    })
    // 商品数量减
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            $(this).css({
                cursor: "not-allowed",
                color: "#ccc"
            })
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 修改商品小计
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").find("strong").text("￥" + (p * n).toFixed(2));
        getSum();
    })
    //商品数量增加减end
    // 用户修改文本框的值,商品小计的改变start
    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").text();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").find("strong").text("￥" + (p * n).toFixed(2));
        getSum();
    })
    // 第一次打开页面或刷新页面默认计算一边总计和总额
    getSum();
    // 用户修改文本框的值,商品小计的改变end
    // 计算总计和总额模块start
    function getSum() {
        var count = 0;//计算总件数
        var money = 0;//计算总额
        $(".itxt").each(function (index, domEle) {
            count += parseInt($(domEle).val());
            money += parseFloat($(domEle).parents(".p-num").siblings(".p-sum").find("strong").text().substr(1));
        });
        $(".amount-sum em").text(count);
        $(".price-sum").find("em").text("￥" + money.toFixed(2));
    }
    // 计算总计和总额模块end
    //   删除商品模块
    // (1)商品后边的删除按钮
    $(".p-ops a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // (2)删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // (3)清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    })

})