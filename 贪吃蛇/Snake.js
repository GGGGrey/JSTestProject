//自调用函数---小蛇
(function () {
    var elements = [];

    //小蛇构造函数
    function Snake(width, height, direction) {
        this.width = width || 30;
        this.height = height || 30;
        //小蛇身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ];
        this.direction = direction || "right";
    }

    //为原型添加方法---小蛇初始化
    Snake.prototype.init = function (map) {
        //先删除小蛇
        remove();
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            //div加入map
            map.appendChild(div);
            //设置div样式
            div.style.position = "absolute";
            div.style.height = this.height + "px";
            div.style.width = this.width + "px";
            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            //把div加入elements数组中
            elements.push(div);
        }
    };

    //原型添加方法---小蛇移动
    Snake.prototype.move = function (food, map) {
        //不包含蛇头
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            //后一个格子，运动到前一个格子
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断运动方向
        switch (this.direction) {
            case "right":
                this.body[i].x++;
                break;
            case "left":
                this.body[i].x--;
                break;
            case "up":
                this.body[i].y--;
                break;
            case "down":
                this.body[i].y++;
                break;
        }

        //蛇头横纵坐标值
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        //判断食物和蛇头坐标是否一致
        if (headX == food.x && headY == food.y) {
            //获取小蛇尾巴
            var tail = this.body[this.body.length - 1];
            //往尾巴加一个食物大小
            this.body.push({
                x: tail.x,
                y: tail.y,
                color: tail.color
            });
            food.init(map);
        }
    };

    //删除操作
    function remove() {
        //获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            //从map上删除
            ele.parentNode.removeChild(ele);
            //删除数组中
            elements.splice(i, 1);
        }

    }

    //把snake暴露给window，外部可以访问
    window.Snake = Snake;
}());