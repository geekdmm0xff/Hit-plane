class BaseScene {
    constructor(game) {
        this.game = game
        this.elems = []
    }
    draw() {
        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
            this.game.drawImage(elem)
        }
    }
    update() {

    }

    addElemet(elem) {
        this.elems.push(elem)
    }

    addElemets(list) {
        this.elems = this.elems.concat(list)
    }
}