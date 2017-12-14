class TitleLabel {
    constructor(game) {
        this.game = game
    }

    update() {
    }

    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.font = "20px Georgia"
        this.game.context.fillText('按 r 开始游戏, 按 v 关卡编辑', 70, 200)
    }
}

class SceneBegin extends BaseScene {
    constructor(game) {
        super(game)
        // event
        var l = new TitleLabel(game)
        this.addElemet(l)
    }
}