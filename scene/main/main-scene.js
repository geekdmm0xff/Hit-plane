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
        this.speed = 10
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

    draw() {

    }

    update() {

    }
}

class Scene extends BaseScene {
    constructor(game, blocks) {
        super(game)
        this.setup()
        this.setupEvents()
    }

    setup() {
        this.sky = new GuaImage('sky', this.game)
        this.sky.w = 400
        this.sky.h = 400

        this.player = new Player(this.game)

        this.cloud = new GuaImage('cloud', this.game)
        this.cloud.w *= 0.5
        this.cloud.h *= 0.5

        this.addElemets([this.sky, this.player, this.cloud])
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
    }

    update() {
        this.cloud.y += 1
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