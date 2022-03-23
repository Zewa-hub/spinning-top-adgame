let app = new PIXI.Application({ width: 640, height: 90 })
document.body.appendChild(app.view)

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
function ultimateButtonCreation(){
    var button1      = PIXI.Sprite.from('./image/toupie.webp')
    var button2     = PIXI.Sprite.from('./image/toupie.webp')
    var button3      = PIXI.Sprite.from('./image/toupie.webp')
    var button4      = PIXI.Sprite.from('./image/toupie.webp')
    var ultText       = new PIXI.Text('TEST ULTIME', style)
    var nbButton    = 0

}

function ultimateButtonParameters(){
    basicText.anchor.set(0.5)
    basicText.x = 305
    basicText.y = 45
    basicText.zIndex = 4

    button1.zIndex      = 2
    button1.x           = Math.random(30, 610)
    button1.y           = Math.random(45)
    button1.width       = 30
    button1.height      = 30
    button1.interactive = true
    button1.buttonMode  = true
    button1.on('pointerdown', onClick1)

    button2.zIndex      = 2
    button2.x           = Math.random(30, 610)
    button2.y           = Math.random(45)
    button2.width       = 30
    button2.height      = 30
    button2.interactive = true
    button2.buttonMode  = true
    button2.on('pointerdown', onClick2)

    button3.zIndex      = 2
    button3.x           = Math.random(30, 610)
    button3y           = Math.random(45)
    button3.width       = 30
    button3.height      = 30
    button3.interactive = true
    button3.buttonMode  = true
    button3.on('pointerdown', onClick3)
        
    button4.zIndex      = 2
    button4.x           = Math.random(30, 610)
    button4.y           = Math.random(45)
    button4.width       = 30
    button4.height      = 30
    button4.interactive = true
    button4.buttonMode  = true
    button4.on('pointerdown', onClick4)
}

function ultimateButtonCast(){
    app.stage.addChild(button1)
    app.stage.addChild(button2)
    app.stage.addChild(button3)
    app.stage.addChild(button4)
}


function onClick1(){
    button1.destroy()
    return true
}
function onClick2(){
    button2.destroy()
    return true
}
function onClick3(){
    button3.destroy()
    return true
}
function onClick4(){
    button4.destroy()
    return true
}

function ultimateCapacityTestDone(){
if(onClick1 == true && onClick2 == true && onClick3 == true && onClick4 == true){
    app.stage.addChild(ultText)
}
}