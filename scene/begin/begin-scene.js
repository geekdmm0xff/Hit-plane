class BeginScene extends BaseScene {
    constructor(game) {
        super(game)

        var bg = new GuaImage('background', game)
        bg.type = 'sky'
        this.addElemet(bg)

        var w = new GuaAnimate(game)
        w.type = 'animate'
        w.x = 100
        w.y = 300
        this.addElemet(w)
        this.w = w

        this.setupInputs()
    }

    setupInputs() {
        this.game.registerAction('a', (state)=>{
            log('left')
            this.w.move(state, -5)
        })
        this.game.registerAction('d', (state)=>{
            log('right')
            this.w.move(state, 5)
        })
    }
}