class BeginScene extends BaseScene {
    constructor(game) {
        super(game)
        var a = new GuaAnimate(game)
        a.type = 'animate'
        this.addElemet(a)
    }
}