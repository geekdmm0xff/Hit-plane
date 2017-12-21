class GuaAnimate {
    constructor(game) {
        this.game = game

        // loads
        this.frames = []
        for (var i = 1; i < 9; i++) {
            var name =
            var f = game.textureByName(name)
            this.frames.push(f)
        }

        this.texture = this.frames[0]
        this.frameInterval = 3
        this.frameIndex = 0

        this.w = this.texture.width
        this.h = this.texture.height
    }

    update() {
        this.frameInterval--
        if (this.frameInterval == 0) {
            this.frameInterval = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }

    draw() {
        this.game.drawImage(this)
    }

    move(x) {
        this.x += x
    }
}