class TitleLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    update() {
    }

    draw() {
        this.game.context.fillText(this.text, 70, 200)
    }
}

class Particle extends GuaImage {
    constructor(game, x, y) {
        super('fire', game)
        this.init(x, y)
        this.setup()
    }

    init(x, y) {
        this.x = x
        this.y = y
    }

    setup() {
        this.w *= 0.2
        this.h *= 0.2
        this.vx = random(-5, 5)
        this.vy = random(-5, 5)

        this.life = 5
    }

    update(){
        this.life--

        this.x += this.vx
        this.y += this.vy

        var factor = 0.01
        this.x += this.x * factor
        this.y += this.x * factor
    }
}

class ParticleSystem {
    constructor(game) {
        this.game = game
        this.particles = []
        this.numberOfParticels = 10
        this.duration = 50
    }

    addParticle() {
        var p = new Particle(this.game, this.x, this.y)
        this.particles.push(p)
    }

    update() {
        this.duration--
        if (this.particles.length < this.numberOfParticels) {
            this.addParticle()
        }
        for (var p of this.particles) {
            p.update()
        }
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        if (this.duration <= 0) {
            this.scene.removeElement(this)
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class SceneBegin extends BaseScene {
    constructor(game) {
        super(game)
        // event
        var l = new TitleLabel(game, '粒子系统')
        this.addElemet(l)

        var ps = new ParticleSystem(game)
        ps.x = 100
        ps.y = 100
        this.addElemet(ps)
    }
}