var height = 360
var width  = 640


let textureArray = [];

var texture;

for (let i=0; i < 48; i++)
{
    texture = PIXI.Texture.from("./image/background/frame_" + i + "_delay-0.02s.png");
    textureArray.push(texture)
}

var animatedSprite = new PIXI.AnimatedSprite(textureArray)

textureArray = []

for (let i=0; i < 64; i++)
{
    if (i >= 10 )
        texture = PIXI.Texture.from("./image/ultimateFX/tile0" + i + ".png");
    else
        texture = PIXI.Texture.from("./image/ultimateFX/tile00" + i + ".png");
    textureArray.push(texture)
}

var fx = new PIXI.AnimatedSprite(textureArray)

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

var styleChoix = new PIXI.TextStyle({
    "fill": [
        "red",
        "#ff8000"
    ],
    "fillGradientStops": [
        1
    ],
    "fontFamily": "Impact",
    "fontSize":90,
    "strokeThickness": 0.5
})

var styleTitle = new PIXI.TextStyle({
    "fill": [
        "red",
        "#ff8000"
    ],
    "fillGradientStops": [
        1
    ],
    "fontFamily": "Impact",
    "fontSize":150,
    "strokeThickness": 0.5
})

var jaune = PIXI.Sprite.from('./image/toupie_gentil.png')
var bleu  = PIXI.Sprite.from('./image/toupie_mechante.png')

var songChoix   = new Audio('./image/songchoix.mp4')
var songInGame  = new Audio('./image/songInGame.mp3')
var choix       = new Audio('./image/choix.mp4')
var sound1      = new Audio('./image/epee5.mp3')
var sound2      = new Audio('./image/epee6.mp3')
var sprite      = PIXI.Sprite.from('./image/toupie_gentil.png')

var mechant     = PIXI.Sprite.from("./image/toupie_mechante.png")
let background  = PIXI.Sprite.from('./image/arena.png')
let bouton      = PIXI.Sprite.from('./image/button.png')
let gentil      = PIXI.Sprite.from('./image/loick-removed.png')
var pointVie    = PIXI.Sprite.from("./image/point_de_vie.png")
var pointVie2   = PIXI.Sprite.from("./image/point_de_vie.png")
var titleText   = new PIXI.Text("BoulBleyde TM", styleTitle)
var souffleAir  = new Audio('./image/souffleair.mp3')

var epitaLogo    = PIXI.Sprite.from("./image/Epita.png")
var eArtSup      = PIXI.Sprite.from("./image/eartsup.png")
let bluebg      = PIXI.Sprite.from('./image/blue.png')

function choose(int) {
    if (int === 1) {
        sprite  = PIXI.Sprite.from('./image/toupie_gentil.png')
        mechant = PIXI.Sprite.from('./image/toupie_mechante.png')
    } else {
        sprite  = PIXI.Sprite.from('./image/toupie_mechante.png')
        mechant = PIXI.Sprite.from('./image/toupie_gentil.png')
    }
    app.stage.removeChild(bluebg)
    app.stage.removeChild(jaune)
    app.stage.removeChild(bleu)
    app.stage.removeChild(titleText)
    songChoix.pause()
    choix.play()
    songInGame.play()

    app.stage.addChild(sprite)
    app.stage.addChild(mechant)

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
}

var bgUlti = new PIXI.Graphics()
bgUlti.beginFill(0x000000)
bgUlti.drawRect(0, 0, app.view.width, app.view.height)
bgUlti.zIndex = -2
bgUlti.alpha  = 0.5

var countGentilVieTotal = app.view.width * 0.2
var countGentilVie      = 0

var countMechantTotal = app.view.width * 0.2
var countMechant      = 0

var stupidCountText = new PIXI.Text('', styleNumber)
var basicText       = new PIXI.Text('3', styleNumber)
var startText       = new PIXI.Text('Appuyez vite sur la toupie !!!', styleNumber)
var ultimateText    = new PIXI.Text('', styleNumber)
var FinalText       = new PIXI.Text('', styleNumber)
var credit          = new PIXI.Text('', styleNumber)

var choixText       = new PIXI.Text('Choisis TA toupie', styleChoix)

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
app.stage.addChild(startText)
app.stage.addChild(basicText)
app.stage.addChild(ultimateText)
app.stage.addChild(bluebg)
app.stage.addChild(jaune)
app.stage.addChild(bleu)
app.stage.addChild(choixText)
app.stage.addChild(titleText)

let progressBar = new PIXI.Graphics()
progressBar.beginFill(0x20fc03)
progressBar.drawRect(0, app.view.height * 0.02, countGentilVieTotal, app.view.width * 0.02)
progressBar.zIndex = 20
app.stage.addChild(progressBar)

pointVie.width = countGentilVieTotal
pointVie.height = app.view.width * 0.02
pointVie.x = 0
pointVie.y = app.view.height * 0.02

pointVie2.angle = 180
pointVie2.width = countMechantTotal
pointVie2.height = app.view.width * 0.02
pointVie2.x = app.view.width
pointVie2.y = (app.view.height * 0.02) * 3

app.stage.addChild(pointVie)

let progressBar2 = new PIXI.Graphics()
progressBar2.beginFill(0x20fc03)
progressBar2.drawRect(app.view.width - countMechantTotal, app.view.height * 0.02, countMechantTotal, app.view.width * 0.02)
progressBar2.zIndex = 20
app.stage.addChild(progressBar2)
app.stage.addChild(pointVie2)

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

bluebg.zIndex = 40
bluebg.width  = app.view.width
bluebg.height = app.view.height

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

gentil.x      = app.view.width
gentil.y      = app.view.height * 0.2
gentil.height = app.view.height * 0.6
gentil.width  = app.view.width * 0.4

choixText.x = app.view.width / 2
choixText.y = app.view.height / 2
choixText.anchor.x = 0.5
choixText.anchor.y = 0.5
choixText.zIndex = 41
choixText.interactive = true
choixText.buttonMode  = true
choixText.on('pointerdown', () => {
    choix.play()
    playSong()
});

titleText.x = app.view.width / 2
titleText.y = app.view.height * 0.1
titleText.anchor.x = 0.5
titleText.anchor.y = 0.5
titleText.zIndex = 41

var turnToopie = false

function playSong() {
    turnToopie     = true
    jaune.zIndex   = 1
    jaune.anchor.x = 0.5
    jaune.anchor.y = 0.5
    jaune.width    = app.view.width * 0.25
    jaune.height   = app.view.width * 0.25
    jaune.x        = app.view.width * 0.25
    jaune.y        = app.view.height / 2
    jaune.interactive = true
    jaune.buttonMode  = true
    jaune.on('pointerdown', () => {
        choose(1)
    });

    bleu.zIndex   = 1
    bleu.anchor.x = 0.5
    bleu.anchor.y = 0.5
    bleu.width    = app.view.width * 0.25
    bleu.height   = app.view.width * 0.25
    bleu.x        = app.view.width * 0.75
    bleu.y        = app.view.height / 2
    bleu.interactive = true
    bleu.buttonMode  = true
    bleu.on('pointerdown', () => {
        choose(2)
    });
    songChoix.play()
    choixText.text = ''
}

jaune.mouseover = function() {
    setInterval(turnFastJaune, 0.1)
};

bleu.mouseover = function() {
    setInterval(turnFastBleu, 0.1)
};

setInterval(turn,0.1)

function turn() {
    if (turnToopie) {
        jaune.angle += 0.1
        bleu.angle  += 0.1
    }
}

function turnFastJaune() {
    jaune.angle += 10
}

function turnFastBleu() {
    bleu.angle += 10
}

var button1 = PIXI.Sprite.from('./image/button1.png')
var button2 = PIXI.Sprite.from('./image/button2.png')
var button3 = PIXI.Sprite.from('./image/button3.png')
var button4 = PIXI.Sprite.from('./image/button4.png')

let tabPositionButton = [app.view.width *0.10, app.view.width *0.30,app.view.width *0.50, app.view.width *0.70]
shuffle(tabPositionButton)

button1.on('pointerdown', function(e) { onHit(e,0); })
button2.on('pointerdown', function(e) { onHit(e,1); })
button3.on('pointerdown', function(e) { onHit(e,2); })
button4.on('pointerdown', function(e) { onHit(e,3); })

button1.anchor.x = 0.5
button1.anchor.y = 0.5

button2.anchor.x = 0.5
button2.anchor.y = 0.5

button3.anchor.x = 0.5
button3.anchor.y = 0.5

button4.anchor.x = 0.5
button4.anchor.y = 0.5

button1.zIndex      = 2
button1.x           = tabPositionButton[0]
button1.y           = gentil.y + gentil.width/2
button1.width       = app.view.width*0.1
button1.height      = app.view.width*0.1
button1.interactive = true
button1.buttonMode  = true

button2.zIndex      = 2
button2.x           = tabPositionButton[1]
button2.y           = gentil.y + gentil.width/2
button2.width       = app.view.width*0.1
button2.height      = app.view.width*0.1
button2.interactive = true
button2.buttonMode  = true

button3.zIndex      = 2
button3.x           = tabPositionButton[2]
button3.y           = gentil.y + gentil.width/2
button3.width       = app.view.width*0.1
button3.height      = app.view.width*0.1
button3.interactive = true
button3.buttonMode  = true

button4.zIndex      = 2
button4.x           = tabPositionButton[3]
button4.y           = gentil.y + gentil.width/2
button4.width       = app.view.width*0.1
button4.height      = app.view.width*0.1
button4.interactive = true
button4.buttonMode  = true

setInterval(ticker,0.8)
setInterval(reduceSize,0.1)
setInterval(arriveDuHero, 0.1)
setInterval(arrivePanneau,500)

function arrivePanneau()
{
    if (boutonOn) {
        bgUlti.zIndex = 80
        app.stage.addChild(bgUlti)
        app.stage.addChild(ultimateText)
        app.stage.addChild(bouton)
        if (ultimateText.text !== "") {
            ultimateText.text = ""
        } else {
            ultimateText.text = "Ton ultime est pret !"
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
                        progressBar.drawRect(0, app.view.height * 0.02,  countGentilVie, app.view.width * 0.02)
                        progressBar2.beginFill(0xfc0303)
                        progressBar2.drawRect(app.view.width - countMechant, app.view.height * 0.02, countMechant, app.view.width * 0.02)

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
function rectIntersect(a,b)
{
    let aBox = a.getBounds()
    let bBox = b.getBounds()

    return aBox.x + aBox.width > bBox.x
        && aBox.x < bBox.x + bBox.width
        && aBox.y + aBox.height > bBox.y
        && aBox.y < bBox.y + bBox.height

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
    //return (!rectIntersect(sprite, mechant) && !isContact)
    return (mechant.x > sprite.x + ((sprite.width + margin) / 2)
            || (mechant.x + mechant.width / 2) < sprite.x
            || mechant.y > sprite.y + ((sprite.height + margin) / 2)
            || (mechant.y + mechant.height / 2) < sprite.y)
        && !isContact;
}
function deplacementGentil()
{
    if(isTouched())
    {
        isContact = false
        basicText.text = ""
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
            animatedSprite.x      = 0
            animatedSprite.y      = gentil.y
            animatedSprite.width  = app.view.width
            animatedSprite.height = gentil.height
            animatedSprite.play()
            animatedSprite.zIndex         = -1
            animatedSprite.animationSpeed = 3
            app.stage.addChild(bgUlti)
            app.stage.addChild(animatedSprite)
            app.stage.addChild(gentil)
            app.stage.addChild(button1)
            app.stage.addChild(button2)
            app.stage.addChild(button3)
            app.stage.addChild(button4)

        }
        if (gentil.x > app.view.width*0.6)
            gentil.x -= 30
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
        else if (elapsed >= timerHp && timerHp !== 0 && !boutonOn && isFirstTime) {
            descCoef = 0
            app.stage.addChild(basicText)
            boutonOn = true
            pause()
        }
        isContact = true
        speed     -= descCoef
    }
}

function pause() {
    speed = -1
    go = false
}

function onHold()
{
    app.stage.removeChild(bgUlti)
    app.stage.removeChild(bouton)
    app.stage.removeChild(ultimateText)
    boutonOn = false
    isUltiActive = true
    mechantTimer = elapsed + 100
    /*
    if (elapsed >= mechantTimer) {
        mechant.destroy()
    }
     */
}

function desactivateUlti() {
    app.stage.removeChild(bgUlti)
    app.stage.removeChild(animatedSprite)
    app.stage.removeChild(gentil)
    app.stage.removeChild(button1)
    app.stage.removeChild(button2)
    app.stage.removeChild(button3)
    app.stage.removeChild(button4)
}

function onHit(e,number)
{
    soundEffect()
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
        isUltiActive = false
        desactivateUlti()
        win()
    }
    else if (!bool) {
        isUltiActive = false
        desactivateUlti()
        loose()
    }
}
function win()
{
    bgUlti.zIndex = 80
    loadingMessage("You win !")
    updateVie(1)
    fx.anchor.set(0.5)
    fx.x      = sprite.x
    fx.y      = sprite.y
    fx.width  = sprite.width * 2
    fx.height = sprite.height * 2
    fx.play()
    fx.zIndex         = -1
    fx.animationSpeed = 1
    app.stage.addChild(fx)
    afficheMessage()


    mechantSpeed = 1
    speed        = 57

}
function loose()
{
    bgUlti.zIndex = 80
    loadingMessage("You loose !")
    updateVie(2)
    afficheMessage()
    mechantSpeed = 57
    speed        = 1
}
function afficheMessage()
{
    app.stage.addChild(bgUlti)
    app.stage.addChild(FinalText)
    app.stage.addChild(credit)
    app.stage.addChild(epitaLogo)
    app.stage.addChild(eArtSup)
}
function loadingMessage(text) {
    FinalText.anchor.set(0.5)
    //credit.anchor.set(0.5)
    FinalText.x = app.view.width * 0.5
    FinalText.y = app.view.height * 0.5
    FinalText.text = text
    credit.x = 0
    credit.y = 0
    credit.text = "Developpeur: Abdelaziz Mansouri, Paul Granger, Valentin Dumousset \nDesigner: Alicia Maurice \nGame Designer: Alexandre Fraoili"

    epitaLogo.width = app.view.width * 0.2
    epitaLogo.height = app.view.height * 0.2
    epitaLogo.x = 0
    epitaLogo.y = app.view.height - epitaLogo.height

    eArtSup.width = app.view.width * 0.2
    eArtSup.height = app.view.height * 0.2
    eArtSup.x = app.view.width - eArtSup.width
    eArtSup.y = app.view.height - eArtSup.height

}
function updateVie(number)
{
    if (number == 1)
    {
        app.stage.removeChild(progressBar2)
        app.stage.removeChild(pointVie2)
        progressBar2.beginFill(0xfc0303)
        progressBar2.drawRect(app.view.width - countMechantTotal, app.view.height * 0.02, countMechantTotal, app.view.width * 0.02)
        app.stage.addChild(progressBar2)
        app.stage.addChild(pointVie2)
    }
    else
    {
        app.stage.removeChild(progressBar)
        app.stage.removeChild(pointVie)
        progressBar.beginFill(0xfc0303)
        progressBar.drawRect(0, app.view.height * 0.02, countGentilVieTotal, app.view.width * 0.02)
        app.stage.addChild(progressBar)
        app.stage.addChild(pointVie)
    }

}
function onClick()
{
    souffleAir.play()
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
function shuffle(array) {
    let currentIndex = array.length,  randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
    return array
}