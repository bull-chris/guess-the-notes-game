serial.onDataReceived(serial.delimiters(Delimiters.Comma), function () {
    choiceTime = false
    choiceMade = false
    if (serial.readUntil(serial.delimiters(Delimiters.Comma)) == "s") {
        let guessTunes: number[] = []
        randomTones = [
        262,
        523,
        165,
        880,
        392,
        131,
        156,
        415,
        622,
        698,
        196
        ]
        randTune = randomTones[Math.floor(Math.random() * randomTones.length)]
        for (let index2 = 0; index2 < 3; index2++) {
            music.playTone(randTune, music.beat(BeatFraction.Whole))
            basic.pause(1000)
        }
        theTunes = randomTones
        index = theTunes.indexOf(randTune)
        theTunes.removeAt(index)
        basic.pause(5000)
        for (let index2 = 0; index2 < 3; index2++) {
            guessTunes.push(theTunes[Math.floor(Math.random() * theTunes.length)])
        }
        guessTunes.insertAt(Math.floor(Math.random() * guessTunes.length), randTune)
        correctTune = guessTunes.indexOf(randTune)
        serial.writeNumber(correctTune)
        for (let value of guessTunes) {
            music.playTone(value, music.beat(BeatFraction.Whole))
            basic.pause(1000)
        }
        theTunes.push(randTune)
        choiceTime = true
        while (choiceTime) {
            if (rotationChoice >= 0 && rotationChoice < 90) {
                serial.writeString("a")
                basic.pause(1000)
            } else if (rotationChoice >= 270 && rotationChoice < 359) {
                serial.writeString("b")
                basic.pause(1000)
            } else if (rotationChoice >= 90 && rotationChoice < 180) {
                serial.writeString("c")
                basic.pause(1000)
            } else if (rotationChoice >= 180 && rotationChoice <= 270) {
                serial.writeString("d")
                basic.pause(1000)
            }
            if (choiceMade && choiceTime) {
                choiceTime = false
                serial.writeString("#")
            }
        }
    }
})
let rotationChoice = 0
let correctTune = 0
let index = 0
let theTunes: number[] = []
let randTune = 0
let randomTones: number[] = []
let choiceMade = false
let choiceTime = false
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate115200
)
choiceTime = false
basic.forever(function () {
    rotationChoice = input.compassHeading()
    if (input.buttonIsPressed(Button.AB) && choiceTime == true) {
        choiceMade = true
    }
})
