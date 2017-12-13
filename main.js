/**
 * Created by geekduan on 2017/12/7.
 */

var __main = function() {
    var paths = {
        player: 'img/player.png',
        sky: 'img/sky.png',
        cloud: 'img/cloud.png',
    }

    var game = Game.instance(30, paths, function () { // image 加载完回调
        var scene = new Scene(game)
        game.runWithScene(scene)
    })

}