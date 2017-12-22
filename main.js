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
        // walk
        w1: 'img/walking/Walk (1).png',
        w2: 'img/walking/Walk (2).png',
        w3: 'img/walking/Walk (3).png',
        w4: 'img/walking/Walk (4).png',
        w5: 'img/walking/Walk (5).png',
        w6: 'img/walking/Walk (6).png',
        w7: 'img/walking/Walk (7).png',
        w8: 'img/walking/Walk (8).png',
        w9: 'img/walking/Walk (9).png',
        w10: 'img/walking/Walk (10).png',
        w11: 'img/walking/Walk (11).png',
        w12: 'img/walking/Walk (12).png',
        w13: 'img/walking/Walk (13).png',
        w14: 'img/walking/Walk (14).png',
        w15: 'img/walking/Walk (15).png',
        w16: 'img/walking/Walk (16).png',
        w17: 'img/walking/Walk (17).png',
        w18: 'img/walking/Walk (18).png',
        w19: 'img/walking/Walk (19).png',
        w20: 'img/walking/Walk (20).png',
        // idle
        s1: 'img/idle/Idle (1).png',
        s2: 'img/idle/Idle (2).png',
        s3: 'img/idle/Idle (3).png',
        s4: 'img/idle/Idle (4).png',
        s5: 'img/idle/Idle (5).png',
        s6: 'img/idle/Idle (6).png',
        s7: 'img/idle/Idle (7).png',
        s8: 'img/idle/Idle (8).png',
        s9: 'img/idle/Idle (9).png',
        s10: 'img/idle/Idle (10).png',
        s11: 'img/idle/Idle (11).png',
        s12: 'img/idle/Idle (12).png',
        s13: 'img/idle/Idle (13).png',
        s14: 'img/idle/Idle (14).png',
        s15: 'img/idle/Idle (15).png',
        s16: 'img/idle/Idle (16).png',
    }

    var game = Game.instance(30, paths, function () { // image 加载完回调
         // var scene = new Scene(game)
        var scene = new BeginScene(game)
        game.runWithScene(scene)
    })

}