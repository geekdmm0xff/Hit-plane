class Particle extends GuaImage {
    constructor(game) {
        super('fire', game)
        this.setup()
    }

    init(x, y) {
        this.x = x
        this.y = y
        var speed = 5
        this.vx = random(-speed, speed)
        this.vy = random(-speed, speed)
    }

    setup() {
        this.w *= 0.2
        this.h *= 0.2
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
        this.x = 100
        this.y = 100
    }

    addParticle() {
        var p = new Particle(this.game)
        p.init(this.x, this.y)
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