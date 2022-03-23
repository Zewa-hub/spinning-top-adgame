var height = 360
var width = 640

var order = [false,false,false,false]
var app = new PIXI.Application({ width: 640, height: 360 })
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
    "strokeThickness": 0.5
})

var audioObj   = new Audio('./image/tg.mp3')
var bonkObj    = new Audio('./image/bonk.mp3')
var songObj    = new Audio('./image/song2.mp4')
var sprite     = PIXI.Sprite.from('./image/toupie_gentil.png')
var mechant    = PIXI.Sprite.from("./image/toupie_mechante.png")
let background = PIXI.Sprite.from('./image/arena.jpg')
let bouton     = PIXI.Sprite.from('./image/button.png')
var countGentilVieTotal = 200
var countGentilVie = 0

var countMechantTotal = 200
var countMechant      = 0

var stupidCountText = new PIXI.Text('', styleNumber)

var basicText  = new PIXI.Text('3!!', styleNumber)
var startText  = new PIXI.Text('Appuyez vite sur la toupie !!!', styleNumber)


var speed       = 0
var countHp     = 0
var descCoef    = 0
var stupidCount = 0

var elapsed = 0.0
var timer  = 0
var timerHp      = 0
var go           = false
var isUltiActive = false
var isContact    = null
var mechantTimer = 0
var countContact = 50

var mechantSpeed = 10
var boutonOn     = false
var vitesseChoc  = 5

app.stage.addChild(background)
app.stage.addChild(sprite)
app.stage.addChild(mechant)
app.stage.addChild(startText)
app.stage.addChild(basicText)

let progressBar = new PIXI.Graphics()
progressBar.beginFill(0x20fc03)
progressBar.drawRect(0, 10, countGentilVieTotal, 20)
progressBar.zIndex = 20
app.stage.addChild(progressBar)

let progressBar2 = new PIXI.Graphics()
progressBar2.beginFill(0x20fc03)
progressBar2.drawRect(width - countMechantTotal - 10, 10, countMechantTotal, 20)
progressBar2.zIndex = 20
app.stage.addChild(progressBar2)


stupidCountText.anchor.set(0.5)
stupidCountText.x = 320
stupidCountText.y = 10

basicText.anchor.set(0.5)
basicText.x = 320
basicText.y = 300
basicText.zIndex = 4

startText.anchor.set(0.5)
startText.x = 320
startText.y = 10

background.zIndex = 0
background.height = 360
background.width  = 640

sprite.zIndex      = 1
sprite.anchor.x    = 0.5
sprite.anchor.y    = 0.5
sprite.x           = 320
sprite.y           = 180
sprite.width       = 150
sprite.height      = 150
sprite.y           = 150
sprite.interactive = true
sprite.buttonMode  = true
sprite.on('pointerdown', onClick)

mechant.x        = 650
mechant.y        = 0
mechant.width    = 150
mechant.height   = 150
mechant.anchor.x = 0.5
mechant.anchor.y = 0.5

bouton.x           = 540
bouton.y           = 275
bouton.width       = 50
bouton.height      = 50
bouton.interactive = true
bouton.buttonMode  = true
bouton.on('pointerdown', onHold)

app.ticker.add((delta) => {
    elapsed += delta;
    if (elapsed > timer && speed >= 1) {
        go = true
        deplacementGentil()
        if (isContact) {
            if (countContact !== 0) {
                mechant.x += 1
                sprite.x  -= 1
                countContact -= 1
                bonkObj.play()
            }
            else {
                isContact = false
                countContact = 50
                if (!isUltiActive) {
                    if (countGentilVie < 160)
                    {
                        countGentilVie += 40
                        countMechant   += 10

                        progressBar.beginFill(0xfc0303)
                        progressBar.drawRect(0, 10, countGentilVie, 20)
                        progressBar2.beginFill(0xfc0303)
                        progressBar2.drawRect(width - countMechant - 10, 10, countMechant, 20)

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
})

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
        basicText.text = '2 !!!'
    }
    if (elapsed >= timer - 200 && elapsed < timer - 100 && timer !== 0) {
        basicText.text = '1 !!!'
    }
    if (elapsed >= timer - 100 && elapsed < timer && timer !== 0) {
        basicText.text = 'GO !!!'
    }
    if (elapsed >= mechantTimer && mechantTimer !== 0 && mechant.transform != null) {
        //mechant.destroy()
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
        }
        isContact = true
        speed -= descCoef
        console.log(speed)
    }
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
    var bool = true
    for (let i = 0; i < number; i++)
    {
        if (order[i] === true)
        {
            bool = true
        }
        else
        {
            bool = false
            break
        }
    }
    if (bool && number === order.length - 1)
    {
        win()
    }
    else if (!bool)
    {
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
            stupidCount = Math.round(countHp * 14.21)
            stupidSize  = 20
        } else if (countHp <= 8) {
            stupidCount = Math.round(countHp * 889.74)
            stupidSize  = 24
        } else if (countHp <= 15) {
            stupidCount = Math.round(countHp * 1457.68)
            stupidSize  = 30
        } else if (countHp <= 20) {
            stupidCount = Math.round(countHp * 21544.56)
            stupidSize = 50
        }
        /*
        var styleNumber = new PIXI.TextStyle({
            fontFamily: 'Bungee',
            fontSize: stupidSize,
            fontWeight: 'bold',
            fill: ['#ffffff', '#000000'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        })
         */
        stupidCountText.text = ""
        stupidCountText.text = 'x' + stupidCount
        app.stage.addChild(stupidCountText)
        descCoef = speed * 0.004
    }

}