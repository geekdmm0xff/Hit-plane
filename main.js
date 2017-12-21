/**
 * Created by geekduan on 2017/12/7.
 */

var __main = function() {
    var paths = {
        player: 'img/player.png',
        sky: 'img/sky.png',
        cloud: 'img/cloud.png',
        bullet: 'img/bullet.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        fire: 'img/fire.png',
        w1: 'img/walking/w1.png',
        w2: 'img/walking/w2.png',
        w3: 'img/walking/w3.png',
        w4: 'img/walking/w4.png',
        w5: 'img/walking/w5.png',
        w6: 'img/walking/w6.png',
        w7: 'img/walking/w7.png',
        w8: 'img/walking/w8.png',
    }

    var game = Game.instance(30, paths, function () { // image 加载完回调
         // var scene = new Scene(game)
        var scene = new BeginScene(game)
        game.runWithScene(scene)
    })

}