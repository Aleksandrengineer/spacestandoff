namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const PowerUpWeapon = SpriteKind.create()
}
// this the projectile function
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (powerUpActive) {
        myProjectile1 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, myPlayer, 0, -70)
        myProjectile1 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, myPlayer, 40, -70)
        myProjectile1 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, myPlayer, 70, -70)
        music.pewPew.play()
        myProjectile1.setKind(SpriteKind.Projectile)
    } else {
        myProjectile1 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, myPlayer, 0, -70)
        myProjectile1.startEffect(effects.warmRadial, 500)
        music.pewPew.play()
        myProjectile1.setKind(SpriteKind.Projectile)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    if (info.life() < 3) {
        info.changeLifeBy(1)
        otherSprite.destroy()
    } else {
        otherSprite.destroy()
    }
    music.magicWand.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUpWeapon, function (sprite, otherSprite) {
    powerUpActive = true
    otherSprite.destroy()
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
    sprite.destroy(effects.coolRadial, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
    powerUpActive = false
    music.bigCrash.play()
})
let myEnemy: Sprite = null
let enemyToSpawn = 0
let powerUpWeapon: Sprite = null
let myProjectile1: Sprite = null
let powerUpActive = false
let myPlayer: Sprite = null
effects.starField.startScreenEffect()
game.splash("** Space Stand Off **", "To Start a Game press A")
myPlayer = sprites.create(img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ........dd55........
    ........5555........
    .........44.........
    ........dddd........
    ........dddd........
    .......dddddd.......
    .......dddddd.......
    .......dddddd.......
    .......555555.......
    .......555555.......
    .......555555.......
    ........5555........
    ........4444........
    ....................
    `, SpriteKind.Player)
controller.moveSprite(myPlayer)
myPlayer.setStayInScreen(true)
info.setLife(3)
music.setVolume(10)
info.setScore(0)
powerUpActive = false
game.onUpdateInterval(5000, function () {
    if (info.score() > 100) {
        game.over(true, effects.confetti)
    }
})
game.onUpdateInterval(1000, function () {
    if (info.score() % 10 == 0 && info.score() != 0) {
        powerUpWeapon = sprites.createProjectileFromSide(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `, 0, 50)
        powerUpWeapon.x = randint(5, 155)
        powerUpWeapon.setKind(SpriteKind.PowerUp)
    }
    if (info.score() % 20 == 0 && info.score() != 0) {
        powerUpWeapon = sprites.createProjectileFromSide(img`
            . . . . . . 3 3 . . . . . . . . 
            . . . . . . 3 1 3 . . . . . . . 
            . . 3 3 . . 3 1 3 . . 3 3 . . . 
            . . 3 1 3 . 3 1 3 2 3 1 3 . . . 
            . . . 3 1 3 3 1 3 2 1 3 . . . . 
            3 3 3 3 2 1 3 1 1 1 3 . . . . . 
            3 1 1 1 1 1 1 1 1 2 3 3 3 3 3 3 
            . 3 3 3 2 3 1 1 1 1 1 1 1 1 1 3 
            . . . . . 2 1 1 1 3 3 2 3 3 3 . 
            . . . . 3 1 3 1 3 1 2 . . . . . 
            . . . 3 1 3 2 1 3 3 1 3 . . . . 
            . . 3 1 3 . 2 1 3 . 3 1 3 . . . 
            . . 3 3 . . 3 1 3 . . 3 3 . . . 
            . . . . . . 3 1 3 . . . . . . . 
            . . . . . . 3 1 3 . . . . . . . 
            . . . . . . 3 3 . . . . . . . . 
            `, 0, 50)
        powerUpWeapon.x = randint(5, 155)
        powerUpWeapon.setKind(SpriteKind.PowerUpWeapon)
    }
})
forever(function () {
    music.playMelody("A F E F D G E F ", 140)
})
game.onUpdateInterval(500, function () {
    enemyToSpawn = randint(1, 3)
    if (enemyToSpawn == 1) {
        myEnemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . c c c c . . 
            . c c c c c . c c c c c f c c . 
            c c a c c c c c 8 f f c f f c c 
            c a f a a c c a f f c a a f f c 
            c a 8 f a a c a c c c a a a a c 
            c b c f a a a a a c c c c c c c 
            c b b a a c f 8 a c c c 8 c c c 
            . c b b a b c f a a a 8 8 c c . 
            . . . . a a b b b a a 8 a c . . 
            . . . . c b c a a c c b . . . . 
            . . . . b b c c a b b a . . . . 
            . . . . b b a b a 6 a . . . . . 
            . . . . c b b b 6 6 c . . . . . 
            . . . . . c a 6 6 b c . . . . . 
            . . . . . . . c c c . . . . . . 
            `, 0, 30)
    } else if (enemyToSpawn == 2) {
        myEnemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . c b a c . . . . . . 
            . . . . c c b c f a c . . . . . 
            . . . . a f b b b a c . . . . . 
            . . . . a f f b a f c c . . . . 
            . . . . c b b a f f c . . . . . 
            . . . . . b b a f a . . . . . . 
            . . . . . . c b b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 70)
    } else {
        myEnemy = sprites.createProjectileFromSide(img`
            . . . . . . . . c c c c . . . . 
            . . . . c c c c c c c c c . . . 
            . . . c f c c a a a a c a c . . 
            . . c c f f f f 2 2 2 c a a c . 
            . . c c a f f 2 2 2 2 f f a a c 
            . . c c a a a a 8 8 8 f f a a c 
            . c c c c a 8 8 8 8 8 8 8 a c c 
            c a f f c 8 8 a 8 8 8 8 8 b c c 
            c a f f f f c c 8 8 b b b a a c 
            c a a c f f c a 2 2 2 b b a a c 
            c c b a a a a b 2 2 2 a b b a . 
            . c c b b 2 2 2 2 2 a c c b a . 
            . . c c c 2 2 2 2 2 a a b c . . 
            . . . . c b a c c b b b c . . . 
            . . . . c b b a a 6 b c . . . . 
            . . . . . . b 6 6 c c . . . . . 
            `, 0, 50)
    }
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
