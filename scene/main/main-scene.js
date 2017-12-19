const kPlayerBulletType = "kPlayerBulletType"
const kEnemyBulletType = "kEnemyBulletType"

//[start, end]
var config = {
    player_speed: 10,
    bullet_speed: 20,
    enemy_speed: 2,
    cloud_speed: 1,
    cooldown_time: 5,
}

const random = function (start, end) {
    var n = Math.random() * (end - start + 1) + start
    return Math.floor(n)
}

class Bullet extends GuaImage {
    constructor(game, player, type) {
        super('bullet', game)

        this.player = player
        this.type = type

        this.setup(player)
    }

    setup(player) {
        this.x = player.x + player.w * 0.1
        this.y = player.y
        this.speed = config.bullet_speed
    }

    move() {
        if (this.type === kPlayerBulletType) {
            this.y -= this.speed
            this.collideEnemyBullet()
            this.collideEnemy()
        } else {
            this.y += this.speed
            this.collidePlayer()
        }

    }

    // 自己的子弹和敌方飞机相撞
    collideEnemy() {
        var s = this.scene;
        var enemys = s.getElements(kEnemyKey)
        for (var e of enemys) {
            if (hitRect(e, this)) {
                //
                e.kill()
                //
                var ps = new ParticleSystem(this.game)
                ps.init(this.x, this.y)
                s.addElemet(kPartcleSystemKey, ps)
            }
        }
    }

    // 自己的子弹和敌人的子弹相撞
    collideEnemyBullet() {
        var s = this.scene;
        var bullets = s.getElements(kEnemyBulletKey)
        for (var b of bullets) {
            if (hitRect(this, b)) {
                this.kill(kPlayerBulletKey)
                b.kill(kEnemyBulletKey)
            }
        }
    }

    // 敌人的子弹打中玩家
    collidePlayer() {
        var s = this.scene;
        var players = s.getElements(kPlayKey)
        for (var e of players) {
            if (hitRect(e, this)) {
                //
                e.kill()
                //
                var ps = new ParticleSystem(this.game)
                ps.init(this.x, this.y)
                s.addElemet(kPartcleSystemKey, ps)
            }
        }
    }

    update() {
        this.move()
    }

    debug() {
        this.speed = config.bullet_speed
    }

    kill(key) {
        this.scene.removeElement(key, this)
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var name = 'enemy' + String(random(0, 2))
        super(name, game)
        this.setup()
    }
    setup() {
        this.x = random(0, 400)
        this.y = -random(0, 250)
        this.speed = config.enemy_speed
        this.cooldown = 0
    }

    move() {
        if (this.y > 400) {
            this.setup()
        }
        this.y += this.speed
    }

    update() {
        this.move()
        this.cooldown--
        if (this.cooldown <= 0) {
            this.cooldown = config.cooldown_time
            this.fire()
        }
    }

    fire() {
        var b = new Bullet(this.game, this, kEnemyBulletType)
        b.x = this.x + 0.1 * this.w
        b.y = this.y

        this.scene.addElemet(kEnemyBulletKey, b)
    }

    kill() {
        this.scene.removeElement(kEnemyKey, this)
    }

    debug() {
        this.speed = config.enemy_speed
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super('cloud', game)
        this.w *= 0.5
        this.h *= 0.5
        this.setup()
    }

    setup() {
        this.speed = config.cloud_speed
        this.x = random(0, 100)
        this.y = -random(0, 100)
    }

    move() {
        if (this.y > 400) {
            this.setup()
        }
        this.y += this.speed
    }

    update() {
        this.move()
    }

    debug() {
        this.speed = config.cloud_speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super('player', game)
        this.setup()
    }
    setup() {
        this.w *= 0.4
        this.h *= 0.4
        this.x = 100
        this.y = 350
        this.speed = config.player_speed
        this.cooldwon = 0
        this.life = 1000
    }

    fire() {
        if (this.cooldwon == 0) {
            this.cooldwon = config.cooldown_time
            var b = new Bullet(this.game, this, kPlayerBulletType)
            this.scene.addElemet(kPlayerBulletKey, b)
        }
    }

    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }

    update() {
        if (this.cooldwon > 0) {
            this.cooldwon--;
        }

    }

    debug() {
        this.speed = config.player_speed
    }

    kill() {
        this.life--
        if (this.life <= 0) {
            this.destory()
        }
    }
    destory() {
        this.scene.removeElement(kPlayKey, this)

        var s = new GameOverScene(this.game)
        this.game.replaceScene(s)
    }
}

class Sky extends GuaImage {
    constructor(game) {
        super('sky', game)
        this.setup()
    }
    setup() {
        this.w = 400
        this.h = 400
    }
}

class Scene extends BaseScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupEvents()
    }

    setup() {
        this.numberOfEnemys = 10

        this.sky = new Sky(this.game)
        this.player = new Player(this.game)
        this.cloud = new Cloud(this.game)

        this.addElemet(kSkyKey, this.sky)
        this.addElemet(kPlayKey, this.player)
        this.addElemet(kCloudKey, this.cloud)

        this.addEnemys()
    }

    setupEvents() {
        var game = this.game
        game.registerAction('a', () => {
            this.player.moveLeft()
        })
        game.registerAction('d', () => {
            this.player.moveRight()
        })
        game.registerAction('s', () => {
            this.player.moveDown()
        })
        game.registerAction('w', () => {
            this.player.moveUp()
        })
        game.registerAction('f', () => {
            this.player.fire()
        })
    }

    addEnemys() {
        var es = []
        for (var i = 0; i < this.numberOfEnemys; i++) {
            var e = new Enemy(this.game)
            es.push(e)
            this.addElemet(kEnemyKey, e)
        }
    }
}