//自调用函数--食物方块
(function () {
    var elements = [];

    //小方块是食物，有横纵坐标，宽，高，颜色
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 30;
        this.height = height || 30;
        this.color = color || "green";
    }

    //为原型添加初始化方法,传入map地图作为参数
    Food.prototype.init = function (map) {
        //创建新的之前，先删除，保证食物有且只有一个
        remove();
        //创建div标签
        var div = document.createElement("div");
        //把div标签加入map中
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //脱标，随机产生div的横纵坐标
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div加入数组elements中
        elements.push(div);
    };

    //私有函数，删除操作
    function remove() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到子元素的父级元素，然后删除子元素---从map中删除=删除div
            ele.parentNode.removeChild(ele);
            //删除数组中的元素
            elements.splice(i, 1);
        }
    }

    window.Food = Food;
}());
