class BaseScene {
    constructor(game) {
        this.game = game
        this.elems = []
    }

    draw() {
        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
             // this.game.drawImage(elem)
            elem.draw()
        }
    }

    update() {
        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
            elem.update()
        }
    }

    addElemet(elem) {
        // bind scene
        elem.scene = this
        this.elems.push(elem)
    }

    addElemets(list) {
        for (var i = 0; i < list.length; i++) {
            var e = list[i]
            this.addElemet(e)
        }
    }
}