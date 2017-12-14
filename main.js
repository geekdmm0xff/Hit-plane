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
    }

    var game = Game.instance(30, paths, function () { // image 加载完回调
        // var scene = new Scene(game)
        var scene = new SceneBegin(game)
        game.runWithScene(scene)
    })

}