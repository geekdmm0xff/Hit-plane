class BeginScene extends BaseScene {
    constructor(game) {
        super(game)
        var w = new GuaAnimate(game)
        w.type = 'animate'
        w.x = 100
        w.y = 100
        this.addElemet(w)
        this.w = w

        this.setupInputs()
    }

    setupInputs() {
        this.game.registerAction('a', ()=>{
            this.w.move(-5)
        })
        this.game.registerAction('d', ()=>{
            this.w.move(5)
        })
    }
}