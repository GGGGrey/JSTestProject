//自调用函数---游戏对象
(function () {

    //用于存放指向自己的this指针
    var that = null;

    //游戏的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    //游戏初始化函数
    Game.prototype.init = function () {
        //初始化游戏
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food, this.map);
        this.bindkey();
    };

    //小蛇移动函数
    Game.prototype.runSnake = function (food, map) {
        time = setInterval(function () {
            //此时this是window，添加bing(that)后,this为Game的实例对象：gm
            this.snake.move(food, map);
            this.snake.init(map);
            //横坐标最大值
            var maxX = map.offsetWidth / this.snake.width;
            //纵坐标最大值
            var maxY = map.offsetHeight / this.snake.height;
            //小蛇头坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //横坐标判断
            if (headX < 0 || headX >= maxX) {
                clearInterval(time);
                alert("GameOver");
            }
            //纵坐标判断
            if (headY < 0 || headY >= maxY) {
                clearInterval(time);
                alert("GameOver");
            }
        }.bind(that), 150);
    };

    //设置用户按键，改变小蛇移动方向
    Game.prototype.bindkey = function () {
        document.addEventListener("keydown", function (e) {
            //这里this为document，添加bing(that)后,this为Game的实例对象：gm
            switch (e.keyCode) {
                case 37:
                    if (this.snake.direction != "right") {
                        this.snake.direction = "left"
                    }
                    break;
                case 38:
                    if (this.snake.direction != "down") {
                        this.snake.direction = "up"
                    }
                    break;
                case 39:
                    if (this.snake.direction != "left") {
                        this.snake.direction = "right"
                    }
                    break;
                case 40:
                    if (this.snake.direction != "up") {
                        this.snake.direction = "down"
                    }
                    break;
            }
        }.bind(that), false)
    };

    window.Game = Game;
}());