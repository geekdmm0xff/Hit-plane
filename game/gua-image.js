class GuaImage {
    constructor(name, game) {
        var texture = game.textureByName(name)

        this.game = game
        this.texture = texture
        this.x = 0
        this.y = 0
        this.w = texture.width
        this.h = texture.height
    }
    draw() {

    }

    update() {
    }
}