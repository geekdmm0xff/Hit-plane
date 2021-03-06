const kSkyKey = 'sky'
const kCloudKey = 'cloud'
const kPlayKey = 'player'
const kEnemyKey = 'enemy'
const kPlayerBulletKey = 'playerBullet'
const kEnemyBulletKey = 'enemyBullet'
const kPartcleSystemKey = 'partcleSystem'
const kLabel = 'label'
const kAnimate = 'animate'

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
            'partcleSystem': [],
            'label': [],
            'animate': [],
            'background': [],
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

    /// Helper
    forEachAll(callback) {
        var keys = Object.keys(this.elemsMap)
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            var elems = this.elemsMap[k]
            for (var e of elems) {
                callback(e)
            }
        }
    }

    addElemet(elem) {
        // bind scene
        elem.scene = this

        var elems = this.elemsMap[elem.type]
        log(elems)
        elems.push(elem)
        log(elems)
    }

    removeElement(elem) {
        var arr = this.elemsMap[elem.type]
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == elem) {
                log('remove elem', elem)
                arr.splice(i, 1)
                break
            }
        }
    }

    getElements(type) {
        return this.elemsMap[type]
    }
}