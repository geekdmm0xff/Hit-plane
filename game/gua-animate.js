class GuaAnimate {
    constructor(game) {
        this.game = game


        // loads
        this.images = []
        for (var i = 1; i < 9; i++) {
            var name = `w${i}`
            var img = new GuaImage(name, game)
            img.x = 100
            img.y = 100
            this.images.push(img)
        }

        this.texture = this.images[0]
        this.imageInterval = 0
        this.index = 0
    }

    update() {
        if (this.imageInterval == 0) {
            this.imageInterval = 5
            this.index = (this.index + 1) % this.images.length
            this.texture = this.images[this.index]
        } else {
            this.imageInterval--
        }
    }

    draw() {
        this.texture.draw()
    }
}