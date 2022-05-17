class Snake {
    // 蛇头
    head: HTMLElement;
    // 蛇身，包括蛇头
    body: HTMLCollectionOf<HTMLElement>;

    element: HTMLElement;


    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div')!; // querySelector只会选择一个，所以只取到了头部
        // this.body = document.querySelectorAll('#snake<div')!; // querySelectorAll返回一个NodeList，是不会变的
        this.body = this.element.getElementsByTagName('div'); // ByTagName返回的是一个collection，是可变的
    }

    // 蛇的坐标（蛇头
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    // 简单设置蛇头坐标
    set X(value: number) {
        if (this.X === value) return;

        // 不能调头移动
        if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {// 蛇在向右走发生调头
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        if (value < 0 || value > 290) {// 蛇撞墙
            throw new Error("蛇撞墙了！")
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();

    }
    set Y(value: number) {
        if (this.Y === value) return;
        if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {// 蛇在向右走发生调头
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        if (value < 0 || value > 290) {// 蛇撞墙
            throw new Error("蛇撞墙了！")
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();

    }
    // 蛇增加身体
    addBody() {
        // 向element中添加div
        this.element.insertAdjacentHTML("beforeend", "<div></div>"); // 在element的结束标志前插入一个div
    }
    // 蛇身体移动
    moveBody() {
        // 从后往前改蛇的位置，后边的身体设置为前边身体的位置
        // 遍历所有的身体div
        for (let i = this.body.length - 1; i > 0; i--) {
            // 获取前面身体的位置
            // 断言
            let X = (this.body[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.body[i - 1] as HTMLElement).offsetTop;

            // 当前身体的赋值
            (this.body[i] as HTMLElement).style.left = X + "px";
            (this.body[i] as HTMLElement).style.top = Y + "px";
        }
    }
    // 检查头与身体碰撞
    checkHeadBody() {
        for (let i = 1; i < this.body.length; i++) {
            let bd = this.body[i];
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到身体
                throw new Error("蛇撞自己了!");
            }
        }
    }
}
export default Snake;