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
    constructor(game, player) {
        super('bullet', game)
        this.setup(player)
    }

    setup(player) {
        this.player = player
        this.x = player.x + player.w * 0.1
        this.y = player.y
        this.player = player
        this.speed = config.bullet_speed
    }

    move() {
        this.y -= this.speed
    }

    update() {
        this.move()
    }

    debug() {
        this.speed = config.bullet_speed
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
    }

    move() {
        if (this.y > 400) {
            this.setup()
        }
        this.y += this.speed
    }

    update() {
        this.move()
        this.fire()
    }

    fire() {
        var b = new Bullet(this.game, this)
        b.x = this.x
        b.y = this.y

        this.scene.addElemet(b)
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
    }

    fire() {
        if (this.cooldwon == 0) {
            this.cooldwon = config.cooldown_time
            var b = new Bullet(this.game, this)
            this.scene.addElemet(b)
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

        this.addElemets([this.sky, this.player, this.cloud])
        this.addElemets(this.addEnemys())
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
        }
        this.enemys = es
        return this.enemys
    }
}
/*
class Scene extends BaseScene {
    constructor(game, blocks) {
        super(game)
        //
        this.paddle = Paddle(game)
        this.ball = Ball(game)

        this.blockList = this.loadLevel(blocks)
        this.canvas = game.canvas

        // event
        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fired = true
        })
        // debug
        game.debugCallback(() => {
            // 注册系统事件
            window.addEventListener('keydown', event => {
                var k = event.key
                if (k === 'p') {
                    game.pause ^= 1
                } else if ('123456789'.includes(k)) {
                    log('load level;')
                    this.blockList = loadLevels(Number(k), this.game)
                }
            })

            // dynamic speed
            var input = e('#id-speed-input')
            var span = e('#id-speed-span')
            input.value = game.fps
            span.innerHTML = game.fps

            input.addEventListener('change', event => {
                var v = input.value
                span.innerHTML = v
                game.fps = Number(v)
            })

            // drag ball
            var enableDrag = false
            this.canvas.addEventListener('mousedown', event => {
                var x = event.offsetX
                var y = event.offsetY

                // ball 点击检测
                if (this.ball.tapBall(x, y)) {
                    enableDrag = true
                }
            })

            this.canvas.addEventListener('mousemove', event => {
                var x = event.offsetX
                var y = event.offsetY
                if (enableDrag) {
                    this.ball.x = x
                    this.ball.y = y
                }
            })

            this.canvas.addEventListener('mouseup', event => {
                enableDrag = false
            })
        })
    }

    loadLevel(blocks) {
        if (blocks) {
            return blocks
        }
        return loadLevels(1, this.game)
    }

    draw() {
        this.game.drawBackground()
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)

        for (var i = 0; i < this.blockList.length; i++) {
            var b = this.blockList[i]
            if (b.alive) {
                this.game.drawImage(b)
            }
        }

        this.game.drawText()
    }

    update() {
        // 暂停检测
        if (this.game.pause) {
            return
        }

        this.ball.move()

        // 碰撞检测
        if (this.paddle.collide(this.ball)) {
            this.ball.bounce()
        }

        // 是否 paddle
        if (this.ball.isOver(this.paddle)) {
            var scene = new GameOverScene(this.game)
            this.game.replaceScene(scene)
        }

        for (var i = 0; i < this.blockList.length; i++) {
            var b = this.blockList[i]
            if (b.collide(this.ball)) {
                b.kill()
                this.ball.bounce()
                // update score
                if (!b.alive) {
                    this.game.score += 100
                }
            }
        }
    }
}
*/