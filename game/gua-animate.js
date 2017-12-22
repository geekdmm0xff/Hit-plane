class GuaAnimate {
    constructor(game) {
        this.game = game

        // loads
        this.animations = {
            walk:[],
            idle:[],
        }
        // hard code
        for (var i = 1; i < 21; i++) {
            var name = `w${i}`
            var f = game.textureByName(name)
            this.animations['walk'].push(f)
        }

        for (var i = 1; i < 17; i++) {
            var name = `s${i}`
            var f = game.textureByName(name)
            this.animations['idle'].push(f)
        }

        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.frameInterval = 3
        this.frameIndex = 0

        this.w = this.texture.width * 0.2
        this.h = this.texture.height * 0.2
    }

    frames() {
        return this.animations[this.animationName]
    }

    update() {
        this.frameInterval--
        if (this.frameInterval == 0) {
            var frames = this.frames()
            this.frameInterval = 3
            this.frameIndex = (this.frameIndex + 1) % frames.length
            this.texture = frames[this.frameIndex]
        }
    }

    draw() {
        this.game.drawImage(this)
    }

    move(state, x) {
        var map = {
            'down': 'walk',
            'up': 'idle',
        }
        this.animationName = map[state]
        this.x += x
    }
}