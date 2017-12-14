class TitleLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    update() {
    }

    draw() {
        this.game.context.fillStyle = 'red';
        this.game.context.font = "20px Georgia"
        this.game.context.fillText(this.text, 70, 200)
    }
}

class SceneBegin extends BaseScene {
    constructor(game) {
        super(game)
        // event
        var l = new TitleLabel(game, '粒子系统')
        this.addElemet(l)
    }
}