class GuaImage {
    constructor(name, game) {
        this.game = game
        this.type = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    draw() {
        this.game.drawImage(this)
    }

    update() {
    }

    debug() {

    }
}