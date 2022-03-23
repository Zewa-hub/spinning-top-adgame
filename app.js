let app = new PIXI.Application({ width: 640, height: 360 })
document.body.appendChild(app.view)


const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#000000'], // gradient
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

var sprite          = PIXI.Sprite.from('./image/toupie_gentil.png')
var mechant         = PIXI.Sprite.from("./image/toupie_mechante.png")
let background      = PIXI.Sprite.from('./image/arena.jpg')
let bouton          = PIXI.Sprite.from('./image/dollar.jpg')
var basicText       = new PIXI.Text('3!!', style)
var startText       = new PIXI.Text('Appuyez vite sur la toupie !!!', style)

var speed       = 0
var countHp     = 0
var descCoef    = 0
var stupidCount = 0

var elapsed = 0.0
var timer   = 0
var timerHp = 0
var go      = false
var mechantTimer = 0

var mechantSpeed = 10
var boutonOn     = false

app.stage.addChild(background)
app.stage.addChild(sprite)
app.stage.addChild(mechant)
app.stage.addChild(startText)
app.stage.addChild(basicText)

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

function deplacementGentil()
{
    let margin = sprite.width * 0.50
    if(mechant.x > sprite.x + ((sprite.width + margin) /2) || (mechant.x + mechant.width/2) < sprite.x || mechant.y > sprite.y + ((sprite.height + margin) /2) || (mechant.y + mechant.height/2) < sprite.y ) {
        if (mechant.x > sprite.x) {
            sprite.x += 0.95
        }
        if (mechant.y > sprite.y) {
            sprite.y += 0.95
        }
        if (mechant.y < sprite.y) {
            sprite.y -= 0.95
        }
        if (mechant.x < sprite.x) {
            sprite.x -= 0.95
        }
    }
    else
    {
        for (let i = 0 ; i < 10; i++)
        {
            mechant.x += 10
            sprite.x -= 10
        }

    }
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
        mechant.destroy()
    }
}
function deplacementMechant()
{
    let margin = sprite.width * 0.50

    if(mechant.x > sprite.x + ((sprite.width + margin) /2) || (mechant.x + mechant.width/2) < sprite.x || mechant.y > sprite.y + ((sprite.height + margin) /2) || (mechant.y + mechant.height/2) < sprite.y ) {
        if (mechant.x > sprite.x) {
            mechant.x -=  0.95
        }
        if (mechant.y > sprite.y) {
            mechant.y -= 0.95
        }
        if (mechant.y < sprite.y) {
            mechant.y += 0.95
        }
        if (mechant.x < sprite.x) {
            mechant.x += 0.95
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
        speed -= descCoef
        console.log(speed)
    }
}

function onHold()
{
    var ultimateTimer = elapsed
    var ultVerif = false

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
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
    var fondNoir     = PIXI.Sprite.from('./image/fondNoir.jpg')
    var button1      = PIXI.Sprite.from('./image/toupie.webp')
    var button2      = PIXI.Sprite.from('./image/toupie.webp')
    var button3      = PIXI.Sprite.from('./image/toupie.webp')
    var button4      = PIXI.Sprite.from('./image/toupie.webp')
    var ultText      = new PIXI.Text('TEST ULTIME', style)


    fondNoir.zIndex      = 5
    fondNoir.x           = 0
    fondNoir.y           = 0
    fondNoir.width       = 1000
    fondNoir.height      = 1000

    basicText.anchor.set(0.5)
    basicText.x = 305
    basicText.y = 45
    basicText.zIndex = 4

    button1.zIndex      = 6
    button1.x           = 400
    button1.y           = 50
    button1.width       = 30
    button1.height      = 30
    button1.interactive = true
    button1.buttonMode  = true
    button1.on('pointerdown', onClick1)

    button2.zIndex      = 6
    button2.x           = 500
    button2.y           = 250
    button2.width       = 30
    button2.height      = 30
    button2.interactive = true
    button2.buttonMode  = true
    button2.on('pointerdown', onClick2)

    button3.zIndex      = 6
    button3.x           = 50
    button3.y           = 300
    button3.width       = 30
    button3.height      = 30
    button3.interactive = true
    button3.buttonMode  = true
    button3.on('pointerdown', onClick3)
        
    button4.zIndex      = 2
    button4.x           = 250
    button4.y           = 120
    button4.width       = 30
    button4.height      = 30
    button4.interactive = true
    button4.buttonMode  = true
    button4.on('pointerdown', onClick4)


    app.stage.addChild(button1)
    app.stage.addChild(button2)
    app.stage.addChild(button3)
    app.stage.addChild(button4)
    app.stage.addchild(fondNoir)



function onClick1(){
    button1.destroy()
    var clicked1 = 1
    return clicked1
}
function onClick2(){
    button2.destroy()
    var clicked2 = 1
    return clicked2
}
function onClick3(){
    button3.destroy()
    var clicked3 = 1
    return clicked3
}
function onClick4(){
    button4.destroy()
    var clicked4 = 1
    return clicked4
}


    while(elapsed <= ultimateTimer + 250 ){
        if(clicked1 == 1 && clicked2 == 1 && clicked3 == 1 && clicked4 == 1){
            ultVerif = true
        }

    if(ultVerif == true){
        app.stage.addChild(ultText)
        fondNoir.destroy()
        speed        = 57
        mechantTimer = elapsed + 100
        if (elapsed >= mechantTimer && mechant.transform != null) {
            mechant.destroy()
        }
    }
    else{
        fondNoir.destroy()
        speed        = 0
        mechantTimer = elapsed + 100
        if (elapsed >= mechantTimer && mechant.transform != null) {
            mechant.destroy()
        }
    }


    

}
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
        if (speed < 40) {
            speed=speed * 1.2
        }
        countHp += 1
        if (countHp <= 3) {
            stupidCount = Math.round(countHp * 14.21)
            stupidSize  = 10
        } else if (countHp <= 8) {
            stupidCount = Math.round(countHp * 88978.74)
            stupidSize  = 14
        } else if (countHp <= 15) {
            stupidCount = Math.round(countHp * 1457123.68)
            stupidSize  = 16
        } else if (countHp <= 20) {
            stupidCount = Math.round(countHp * 21544778.56)
            stupidSize = 20
        }

        var styleNumber = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: stupidSize,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#000000'], // gradient
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

        stupidCountText = new PIXI.Text('', styleNumber)

        stupidCountText.anchor.set(0.5)
        stupidCountText.x = 320
        stupidCountText.y = 10

        stupidCountText.text = 'X' + stupidCount
        app.stage.addChild(stupidCountText)
        descCoef = speed * 0.004
    }
}