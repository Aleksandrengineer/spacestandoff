@namespace
class SpriteKind:
    PowerUp = SpriteKind.create()
    PowerUpWeapon = SpriteKind.create()
# this the projectile function

def on_a_pressed():
    global myProjectile1
    myProjectile1 = sprites.create_projectile_from_sprite(img("""
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
        """),
        myPlayer,
        0,
        -70)
    myProjectile1.start_effect(effects.warm_radial, 500)
    music.pew_pew.play()
    myProjectile1.set_kind(SpriteKind.projectile)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    if info.life() < 3:
        info.change_life_by(1)
        otherSprite.destroy()
    else:
        otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.PowerUp, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    global powerUpActive
    powerUpActive = True
sprites.on_overlap(SpriteKind.player, SpriteKind.PowerUpWeapon, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    otherSprite3.destroy(effects.disintegrate, 100)
    sprite3.destroy(effects.cool_radial, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap3)

def on_on_overlap4(sprite4, otherSprite4):
    info.change_life_by(-1)
    otherSprite4.destroy(effects.disintegrate, 200)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap4)

myEnemy: Sprite = None
enemyToSpawn = 0
powerUpWeapon: Sprite = None
powerUpActive = False
myProjectile1: Sprite = None
myPlayer: Sprite = None
effects.star_field.start_screen_effect()
game.splash("** Space Stand Off **", "To Start a Game press A")
myPlayer = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(myPlayer)
myPlayer.set_stay_in_screen(True)
info.set_life(3)
music.set_volume(10)
info.set_score(0)

def on_update_interval():
    global powerUpWeapon
    if info.score() % 10 == 0 and info.score() != 0:
        powerUpWeapon = sprites.create_projectile_from_side(img("""
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
            """),
            0,
            50)
        powerUpWeapon.x = randint(5, 155)
        powerUpWeapon.set_kind(SpriteKind.PowerUp)
    if info.score() % 20 == 0 and info.score() != 0:
        powerUpWeapon = sprites.create_projectile_from_side(img("""
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
            """),
            0,
            50)
        powerUpWeapon.x = randint(5, 155)
        powerUpWeapon.set_kind(SpriteKind.PowerUpWeapon)
game.on_update_interval(1000, on_update_interval)

def on_forever():
    music.play_melody("A F E F D G E F ", 140)
forever(on_forever)

def on_update_interval2():
    global enemyToSpawn, myEnemy
    enemyToSpawn = randint(1, 3)
    if enemyToSpawn == 1:
        myEnemy = sprites.create_projectile_from_side(img("""
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
            """),
            0,
            30)
    elif enemyToSpawn == 2:
        myEnemy = sprites.create_projectile_from_side(img("""
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
            """),
            0,
            70)
    else:
        myEnemy = sprites.create_projectile_from_side(img("""
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
            """),
            0,
            50)
    myEnemy.x = randint(5, 155)
    myEnemy.set_kind(SpriteKind.enemy)
game.on_update_interval(500, on_update_interval2)
