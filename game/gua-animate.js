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

        this.w = this.texture.width * 0.1
        this.h = this.texture.height * 0.1

        this.flipX = false
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
        if (this.flipX) {
            var ctx = this.game.context
            ctx.save()

            var x = this.x + this.w / 2
            ctx.translate(x, 0)
            ctx.scale(-1, 1)
            ctx.translate(-x, 0)

            ctx.drawImage(this.texture, this.x, this.y, this.w, this.h)

            ctx.restore()
        } else {
            this.game.drawImage(this)
        }
    }

    changeAnimate(name) {
        this.animationName = name
    }

    move(state, x) {
        this.flipX = x < 0

        this.x += x

        var animationNames = {
            'down': 'walk',
            'up': 'idle',
        }
        var name = animationNames[state]
        this.changeAnimate(name)
    }
}