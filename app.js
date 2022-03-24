var height = 360
var width  = 640

let textureArray = [];

for (let i=0; i < 48; i++)
{
    let texture = PIXI.Texture.from("./image/background/frame_" + i + "_delay-0.02s.png");
    textureArray.push(texture)
}

var animatedSprite = new PIXI.AnimatedSprite(textureArray)

var order = [false,false,false,false]
//var app = new PIXI.Application({height: height, width: width})
var app = new PIXI.Application({resizeTo : window})
document.body.appendChild(app.view)

var styleNumber = new PIXI.TextStyle({
    "fill": [
        "red",
        "#ff8000"
    ],
    "fillGradientStops": [
        1
    ],
    "fontFamily": "Impact",
    "fontSize":48,
    "strokeThickness": 0.5
})

var songObj     = new Audio('./image/song2.mp4')
var sound1      = new Audio('./image/epee5.mp3')
var sound2      = new Audio('./image/epee6.mp3')
var teteGentil  = PIXI.Sprite.from('./image/tete_de_loick.png')
var teteMechant = PIXI.Sprite.from('./image/tete_de_mechant.png')
var sprite      = PIXI.Sprite.from('./image/toupie_gentil.png')
var mechant     = PIXI.Sprite.from("./image/toupie_mechante.png")
let background  = PIXI.Sprite.from('./image/arena.png')
let bouton      = PIXI.Sprite.from('./image/button.png')
let gentil      = PIXI.Sprite.from('./image/loick-removed.png')
var gr          = new PIXI.Graphics();
var br          = new PIXI.Graphics();



var countGentilVieTotal = app.view.width * 0.2
var countGentilVie      = 0

var countMechantTotal = app.view.width * 0.2
var countMechant      = 0

var stupidCountText = new PIXI.Text('', styleNumber)
var basicText       = new PIXI.Text('3', styleNumber)
var startText       = new PIXI.Text('Appuyez vite sur la toupie !!!', styleNumber)
var ultimateText    = new PIXI.Text('', styleNumber)

var speed       = 0
var countHp     = 0
var descCoef    = 0
var stupidCount = 0

var elapsed      = 0.0
var timer        = 0
var timerHp      = 0
var go           = false
var isUltiActive = false
var isContact    = null
var mechantTimer = 0
var countContact = 50

var isFirstTime = true

var mechantSpeed = 10
var boutonOn     = false
var vitesseChoc  = 5

app.stage.addChild(background)
app.stage.addChild(sprite)
app.stage.addChild(mechant)
app.stage.addChild(startText)
app.stage.addChild(basicText)
app.stage.addChild(teteGentil)
app.stage.addChild(teteMechant)
app.stage.addChild(ultimateText)

let progressBar = new PIXI.Graphics()
progressBar.beginFill(0x20fc03)
progressBar.drawRect(0, app.view.width * 0.02, countGentilVieTotal, app.view.width * 0.02)
progressBar.zIndex = 20
app.stage.addChild(progressBar)

let progressBar2 = new PIXI.Graphics()
progressBar2.beginFill(0x20fc03)
progressBar2.drawRect(app.view.width - countMechantTotal - 10, app.view.width * 0.02, countMechantTotal, app.view.width * 0.02)
progressBar2.zIndex = 20
app.stage.addChild(progressBar2)

stupidCountText.anchor.set(0.5)
stupidCountText.x = app.view.width / 2
stupidCountText.y = app.view.height * 0.05


basicText.anchor.set(0.5)
basicText.x      = app.view.width / 2
basicText.y      = app.view.height * 0.45
basicText.zIndex = 4

startText.anchor.set(0.5)
startText.x = app.view.width / 2
startText.y = app.view.height * 0.4

ultimateText.anchor.set(0.5)
ultimateText.x = app.view.width * 0.65
ultimateText.y = app.view.height * 0.8

background.zIndex = 0
background.height = app.view.height
background.width  = app.view.width

sprite.zIndex   = 1
sprite.anchor.x = 0.5
sprite.anchor.y = 0.5
sprite.width    = app.view.width * 0.25
sprite.height   = app.view.width * 0.25
sprite.x        = app.view.width / 2
sprite.y        = app.view.height / 2 + (sprite.height / 2)

sprite.interactive = true
sprite.buttonMode  = true
sprite.on('pointerdown', onClick)

mechant.width    = app.view.width * 0.15
mechant.height   = app.view.width * 0.15
mechant.x        = app.view.width / 2
mechant.y        = -mechant.width / 2
mechant.anchor.x = 0.5
mechant.anchor.y = 0.5

bouton.anchor.x = 0.5
bouton.anchor.y = 0.5
bouton.x           = app.view.width * 0.8
bouton.y           = app.view.height * 0.8
bouton.width       = 50
bouton.height      = 50
bouton.interactive = true
bouton.buttonMode  = true
bouton.on('pointerdown', onHold)

teteGentil.x      = progressBar.x
teteGentil.y      = progressBar.y + (app.view.width * 0.02) * 3
teteGentil.width  = app.view.width * 0.1
teteGentil.height = app.view.width * 0.1

teteMechant.width  = app.view.width * 0.1
teteMechant.height = app.view.width * 0.1
teteMechant.x      = app.view.width - teteMechant.width - 10
teteMechant.y      = progressBar2.y + (app.view.width * 0.02) * 3

gentil.x      = app.view.width
gentil.y      = app.view.height * 0.2
gentil.height = app.view.height * 0.6
gentil.width  = app.view.width * 0.4

setInterval(ticker,0.8)
setInterval(reduceSize,0.1)
setInterval(arriveDuHero, 0.1)
setInterval(arrivePanneau,500)
/*
app.ticker.add((delta) => {
    elapsed += delta;
    if (elapsed > timer && speed >= 1) {
        go = true
        deplacementGentil()
        if (isContact) {
            if (countContact !== 0) {
                mechant.x    += 1
                sprite.x     -= 1
                countContact -= 1
                bonkObj.play()
            }
            else {
                isContact    = false
                countContact = 50
                if (!isUltiActive) {
                    if (countGentilVie < 160)
                    {
                        countGentilVie += app.view.width * 0.04
                        countMechant   += app.view.width * 0.01

                        progressBar.beginFill(0xfc0303)
                        progressBar.drawRect(0, app.view.width * 0.02, countGentilVie, app.view.width * 0.02)
                        progressBar2.beginFill(0xfc0303)
                        progressBar2.drawRect(app.view.width - countMechant - 10, app.view.width * 0.02, countMechant, app.view.width * 0.02)

                    }
                }
            }
        }
    }
    counter()
    if (mechant.transform != null) {
        mechant.angle += mechantSpeed
        if (go) {
            deplacementMechant()
        }
    }

    sprite.angle += speed
})*/

function arrivePanneau()
{
    if (boutonOn) {
        if (ultimateText.text !== "") {
            ultimateText.text = ""
        } else {
            console.log("Je suis dedans")
            ultimateText.text = "Appuyez sur ce bouton !"
        }
    }
}
function ticker()
{
    elapsed += 0.8;
    if (elapsed > timer && timer !== 0 && speed > 0 ) {
        go = true
        deplacementGentil()
        if (isContact) {
            if (countContact !== 0) {
                mechant.x    += 1
                sprite.x     -= 1
                countContact -= 1
                soundEffect()
            }
            else {
                isContact    = false
                countContact = 50
                if (!isUltiActive) {
                    if (countGentilVie < 160)
                    {
                        countGentilVie += app.view.width * 0.04
                        countMechant   += app.view.width * 0.01

                        progressBar.beginFill(0xfc0303)
                        progressBar.drawRect(0, app.view.width * 0.02, countGentilVie, app.view.width * 0.02)
                        progressBar2.beginFill(0xfc0303)
                        progressBar2.drawRect(app.view.width - countMechant - 10, app.view.width * 0.02, countMechant, app.view.width * 0.02)

                    }
                }
            }
        }
    }
    counter()
    if (mechant.transform != null) {
        mechant.angle += mechantSpeed
        if (go) {
            deplacementMechant()
        }
    }

    sprite.angle += speed
}

function soundEffect()
{
    randomInt = Math.floor(Math.random() * 2)
    if (randomInt === 0){
        sound1.play()
    } else {
        sound2.play()
    }
}

function isTouched()
{
    let margin = sprite.width * 0.50
    if ((mechant.x > sprite.x + ((sprite.width + margin) /2)
            || (mechant.x + mechant.width/2) < sprite.x
            || mechant.y > sprite.y + ((sprite.height + margin) /2)
            || (mechant.y + mechant.height/2) < sprite.y )
        && !isContact) {
        return true
    }
    else
        return false
}
function deplacementGentil()
{
    if(isTouched())
    {
        isContact = false
        if (mechant.x > sprite.x) {
            sprite.x += vitesseChoc
        }
        if (mechant.y > sprite.y) {
            sprite.y += vitesseChoc
        }
        if (mechant.y < sprite.y) {
            sprite.y -= vitesseChoc
        }
        if (mechant.x < sprite.x) {
            sprite.x -= vitesseChoc
        }
    }
    else
        isContact = true
}
function counter()
{
    if (elapsed >= timer - 300 && elapsed < timer - 200 && timer !== 0) {
        basicText.text = '2'
    }
    if (elapsed >= timer - 200 && elapsed < timer - 100 && timer !== 0) {
        basicText.text = '1'
    }
    if (elapsed >= timer - 100 && elapsed < timer && timer !== 0) {
        basicText.text = 'GO !!!'
        sprite.interactive = false
        sprite.buttonMode  = false
    }
    if (elapsed >= mechantTimer && mechantTimer !== 0 && mechant.transform != null) {
        //mechant.destroy()
    }
}
function reduceSize()
{
    if (elapsed >= timer - 100 && elapsed < timer && timer !== 0 && sprite.width > app.view.width *0.15) {
        sprite.width  -= 2
        sprite.height -= 2
    }
}
function arriveDuHero()
{
    if (isUltiActive) {
        if (isFirstTime) {
            isFirstTime           = false
            gentil.zIndex         = 1
            gr.zIndex             = 2
            animatedSprite.x      = 0
            animatedSprite.y      = 0
            animatedSprite.width  = app.view.width
            animatedSprite.height = app.view.height
            animatedSprite.play()
            animatedSprite.zIndex         = -1
            animatedSprite.animationSpeed = 3
            app.stage.addChild(animatedSprite)
            app.stage.addChild(gr)
            app.stage.addChild(gentil)

        }
        if (gentil.x > app.view.width*0.6)
            gentil.x -= 30
        else{
            gr.beginFill(0xffffff)
            gr.drawCircle(gentil.x+gentil.width/2,gentil.y+gentil.height/2, 200)
            gr.endFill()
            br.beginFill(0xffffff)
            br.drawCircle(gentil.x+gentil.width/2,gentil.y+gentil.height/2, 200)
            br.endFill()
        }
    }


}
function deplacementMechant()
{
    if (isTouched())
    {
        if (mechant.x > sprite.x) {
            mechant.x -=  vitesseChoc
        }
        if (mechant.y > sprite.y) {
            mechant.y -= vitesseChoc
        }
        if (mechant.y < sprite.y) {
            mechant.y += vitesseChoc
        }
        if (mechant.x < sprite.x) {
            mechant.x += vitesseChoc
        }
    }
    else {
        if (timerHp === 0) {
            timerHp = elapsed + 200
        }
        else if (elapsed >= timerHp && timerHp !== 0 && !boutonOn) {
            descCoef = 0
            app.stage.addChild(bouton)
            app.stage.addChild(basicText)
            boutonOn = true
            pause()
        }
        isContact = true
        speed     -= descCoef
    }
}

function pause()
{
    speed = -1
    go = false
}

function onHold()
{
    isUltiActive = true
    speed        = 57
    mechantTimer = elapsed + 100
    ultimate()
    /*
    if (elapsed >= mechantTimer) {
        mechant.destroy()
    }
     */
}

function ultimate()
{
    var loick = PIXI.Sprite.from('./image/loick.png')
    var button1 = PIXI.Sprite.from('./image/button1.jpg')
    var button2 = PIXI.Sprite.from('./image/button2.jpg')
    var button3 = PIXI.Sprite.from('./image/button3.webp')
    var button4 = PIXI.Sprite.from('./image/button4.webp')


    button1.on('pointerdown', function(e) { onHit(e,0); })
    button2.on('pointerdown', function(e) { onHit(e,1); })
    button3.on('pointerdown', function(e) { onHit(e,2); })
    button4.on('pointerdown', function(e) { onHit(e,3); })

    button1.zIndex      = 2
    button1.x           = 0
    button1.y           = 0
    button1.width       = 30
    button1.height      = 30
    button1.interactive = true
    button1.buttonMode  = true


    button2.zIndex      = 2
    button2.x           = width - 50
    button2.y           = 10
    button2.width       = 30
    button2.height      = 30
    button2.interactive = true
    button2.buttonMode  = true

    button3.zIndex      = 2
    button3.x           = width / 2
    button3.y           = width /3
    button3.width       = 30
    button3.height      = 30
    button3.interactive = true
    button3.buttonMode  = true

    button4.zIndex      = 2
    button4.x           = 0
    button4.y           = 180
    button4.width       = 30
    button4.height      = 30
    button4.interactive = true
    button4.buttonMode  = true

    app.stage.addChild(button1)
    app.stage.addChild(button2)
    app.stage.addChild(button3)
    app.stage.addChild(button4)
/*
    loick.x = 0
    loick.y = height*0.1
    loick.height = height * 0.8
    loick.width = width
    loick.zIndex = 150
    app.stage.addChild(loick)
    */
}

function onHit(e,number)
{
    e.target.destroy()
    order[number] = true
    var bool      = true
    for (let i = 0; i < number; i++) {
        if (order[i] === true) {
            bool = true
        }
        else {
            bool = false
            break
        }
    }
    if (bool && number === order.length - 1) {
        win()
    }
    else if (!bool) {
        loose()
    }
}
function win()
{
    console.log("gagné !")

}
function loose()
{
    console.log("perdu !")
}
function onClick()
{
    if (speed === 0) {
        app.stage.removeChild(startText)
        speed = 1
        timer = elapsed + 300
        stupidCount = speed
    }
    if (elapsed <= timer) {
        songObj.play()
        if (speed < 40) {
            speed=speed * 1.2
        }
        countHp += 1
        if (countHp <= 3) {
            stupidCount = Math.round(countHp * 141.21)
            stupidSize  = 20
        } else if (countHp <= 8) {
            stupidCount = Math.round(countHp * 8894.74)
            stupidSize  = 24
        } else if (countHp <= 15) {
            stupidCount = Math.round(countHp * 14577.68)
            stupidSize  = 30
        } else if (countHp >= 15) {
            stupidCount = Math.round(countHp * 81544.56)
            stupidSize = 50
        }
        stupidCountText.text = ""
        stupidCountText.text = stupidCount + 'KM/H'
        app.stage.addChild(stupidCountText)
        descCoef = speed * 0.004
    }
}