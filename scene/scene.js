const kSkyKey = "sky"
const kCloudKey = 'cloud'
const kPlayKey = 'player'
const kEnemyKey = 'enemy'
const kPlayerBulletKey = 'playerBullet'
const kEnemyBulletKey = 'enemyBullet'

class BaseScene {
    constructor(game) {
        this.game = game
        this.debugMode = true
        this.elemsMap = {
            kSkyKey: [],
            kCloudKey: [],
            kPlayKey: [],
            kEnemyKey: [],
            kPlayerBulletKey: [],
            kEnemyBulletKey: [],
        }
    }

    draw() {
        var keys = Object.keys(this.elemsMap)
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            var elem = this.elemsMap[k]
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
            elem.debug && elem.debug()
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

    removeElement(elem) {
        var arr = this.elems
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == elem) {
                arr.splice(i, 1)
                break
            }
        }
    }
}