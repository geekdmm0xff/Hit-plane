const kSkyKey = 'sky'
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
            'sky': [],
            'cloud': [],
            'player': [],
            'enemy': [],
            'playerBullet': [],
            'enemyBullet': [],
        }
    }

    /// Helper
    forEachAll(callback) {
        var keys = Object.keys(this.elemsMap)
        log('key', keys)
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            var elems = this.elemsMap[k]
            for (var e of elems) {
                callback(e)
            }
        }
    }

    //
    draw() {
        this.forEachAll(function (elem) {
            elem.draw()
        })
    }

    update() {
        this.debug()

        this.forEachAll(function (elem) {
            elem.update()
        })
    }

    debug(){
        if (!this.debugMode) {
            return
        }
        this.forEachAll(function (elem) {
            elem.debug && elem.debug()
        })
    }

    addElemet(key, elem) {
        // bind scene
        elem.scene = this
        var elems = this.elemsMap[key]
        elems.push(elem)
    }

    removeElement(key, elem) {
        var arr = this.elemsMap[key]
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == elem) {
                arr.splice(i, 1)
                break
            }
        }
    }
}