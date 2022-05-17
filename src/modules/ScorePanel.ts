// 记分牌类
class ScorePanel {
    score = 0;
    level = 1;
    maxLevel: number; // 最大等级
    upScore: number; // 多少分升一级
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 分数增加
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + ''; // 拼串，innerHTML需要的是一个字符串
        // 升级
        if (this.score % this.upScore === 0) {
            this.addLevel();
        }
    }
    // 等级增加
    addLevel() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + '';
        }

    }
}

export default ScorePanel;