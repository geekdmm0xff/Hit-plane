class BaseScene {
    constructor(game) {
        this.game = game
        this.debugMode = true
        this.elems = []
    }

    draw() {
        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
            elem.draw()
        }
    }

    update() {
        this.debug()

        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
            elem.update()
        }
    }

    debug(){
        if (!this.debugMode) {
            return
        }
        for (var i = 0; i < this.elems.length; i++) {
            var elem = this.elems[i]
            elem.debug()
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