define(() => {
    "use strict";
    // 定义事件函数:
    function onScroll(lazyImgs) {
        // 获取页面滚动的高度:  scrollTop()获取匹配元素相对滚动条顶部的偏移。
        // console.log(lazyImgs,1)
        // lazyImgs = lazyImgs.slice(0);

        // console.log(lazyImgs);

        var wtop = $(document).scrollTop();//页面滚动的高度就是窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
        // 判断是否还有未加载的img:
        if (lazyImgs.length > 0) {
            // 获取可视区域高度:
            var wheight = $(window).height();
            // 存放待删除的索引:
            var loadedIndex = [];
            // console.log(lazyImgs)
            // 循环处理数组的每个img元素:
            $.each(lazyImgs, function (index, $i) {
                if ($i.offset().top < wheight + wtop) {  //$.offset().top获取匹配元素距离文本文档顶的距离。
                    // 设置src属性:
                    //关键看$i的内容
                    $i.context.tagName === "IMG" ? $i.attr('src', $i.attr('data-src')) : $i.css('background-image', `url(${$i.attr('data-src')})`);
                    // 添加到待删除数组:
                    // $i.attr('index', index);
                    loadedIndex.unshift(index);//从大到小排序，保证下边删除操作能顺利进行
                }
            });
            // 删除已处理的对象:
            $.each(loadedIndex, function (index) {
                if (lazyImgs.length > index) {
                    if (lazyImgs[index].attr('src') === lazyImgs[index].attr('data-src') || lazyImgs[index].css('background-image') === `url(${lazyImgs[index].attr('data-src')})`) {
                        lazyImgs.splice(index, 1);
                    }
                }
            });
        }
    };
    return {
        onScroll
    }
})