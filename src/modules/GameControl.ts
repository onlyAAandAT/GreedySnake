// 游戏控制，控制其他所有类
import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";

class GameControl {
    // 定义三个属性
    snake: Snake;
    Food: Food;
    ScorePanel: ScorePanel;
    // 蛇死了没
    isLive = true;

    // 存储蛇的移动方向（按键的方向
    direction: string = "";

    constructor() {
        this.snake = new Snake();
        this.Food = new Food();
        this.ScorePanel = new ScorePanel(10,1);
        this.init();
    }
    // 初始化
    init() {
        // 绑定键盘按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));

        this.run();
    }
    // 键盘按下响应函数
    keydownHandler(event: KeyboardEvent) {
        /* 
            ArrowUp  Up
            ArrowDown  Down
            ArrowLeft Left
            ArrowRight Right
        */
        // event.key返回的是字符串 不同的浏览器可能产出不同的key
        // 由于给document绑定的事件，因此这里的this是#document,上面用bind改变
        this.direction = event.key;

    }
    // 蛇移动
    run() {
        // this.direction
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 按键方向修改XY
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
            case "w":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
            case "s":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
            case "a":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
            case "d":
                X += 10;
                break;
        }
        // 蛇吃了吗
        this.checkEat(X,Y);
        // 修改蛇位置
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            alert((error as any).message + "游戏结束")
            this.isLive = false;
        }


        // 定时器
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.ScorePanel.level - 1) * 30);
    }

    // 检查蛇吃了吗方法
    checkEat(X:number,Y:number){ // 传入的是蛇头的新坐标
        if(X===this.Food.X && Y === this.Food.Y){
            this.Food.change(this.snake.body);
            this.ScorePanel.addScore();
            this.snake.addBody();
        }
    }


}
export default GameControl