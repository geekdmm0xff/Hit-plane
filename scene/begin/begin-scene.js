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
    constructor(game) {
        super('fire', game)
        this.init()
        this.setup()
    }

    init() {
        this.x = 100
        this.y = 100
        this.w *= 0.2
        this.h *= 0.2
        this.vx = random(-10, 10)
        this.vy = random(-10, 10)
    }

    setup() {
        this.life = 5
    }

    update(){
        this.life--

        this.x += this.vx
        this.y += this.vy

        var delta = 0.1
        this.vx += this.vx * delta
        this.vy += this.vy * delta
    }
}

class ParticleSystem {
    constructor(game) {
        this.game = game
        this.particles = []
        this.numberOfParticels = 100

        this.setup()
    }

    setup() {
        for (var i = 0; i < this.numberOfParticels; i++) {
            this.addParticle()
        }
    }

    addParticle() {
        var p = new Particle(this.game)
        this.particles.push(p)
    }

    update() {
        if (this.particles.length < this.numberOfParticels) {
            this.addParticle()
        }
        for (var p of this.particles) {
            p.update()
        }
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        for (var p of this.particles) {
            if (p.life > 0) {
                p.draw()
            }

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
        this.addElemet(ps)
    }
}