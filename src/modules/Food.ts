


// 食物类
class Food {
    // 定义属性表示食物对应的元素
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!;
    }

    // 获取食物X轴坐标
    get X() {
        return this.element.offsetLeft;
    }
    // 获取食物Y坐标
    get Y() {
        return this.element.offsetTop;
    }
    // 修改食物位置
    change(snakeBody: HTMLCollectionOf<HTMLElement>) {
        // 随机
        // 范围0<x<290 0<y<290
        // 蛇移动一次是一格10*10，要求食物的坐标必须是整十
        let top;
        let left;
        let bodyList = [];
        for (let i = 0; i < snakeBody.length; i++) {
            bodyList.push(snakeBody[i].offsetLeft + '' + snakeBody[i].offsetTop)
        }
        console.log(bodyList)
        while (true) {
            top = Math.round(Math.random() * 29) * 10; // Math.random()包括0，不包括1，加上round四舍五入，就可以全部包括
            left = Math.round(Math.random() * 29) * 10;
            let foodLocate = left + '' + top + '';
            if (bodyList.indexOf(foodLocate) === -1) {// 食物位置与身体位置重合
                break;
            }
        }


        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

export default Food;