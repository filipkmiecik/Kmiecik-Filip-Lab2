const canvas = document.getElementById("gameArea")
const context = canvas.getContext('2d')
const counter = document.getElementById('timer')
holeAmount = 5
holeCollection = []
let gameTime = 0

drawBall(300, 560)
//populateHoleCollection()

updateTimer()

function drawBall(x, y) {
    context.clearRect(0, 0, 1000, 800)
    context.beginPath()
    context.arc(x, y, 35, 0, 2 * Math.PI)
    context.fillStyle = "#0095DD"
    context.fill()
    context.closePath()
}

function handleOrientation(event) {
    let x = handlePositionX(event.alpha)
    let y = handlePositionY(event.beta)
    
    function handlePositionX(a){
        if (a < -45) {
            return 35
        } else if (a < 0 && a >= -45) {
            return (270 - ((a * -1) * 6)) + 35
        } else if (a < 110) {
            return ((a * 6) + 270) + 35
        } else if (a > 110) {
            return 965
        }
    }
    function handlePositionY(b){
        if (b < 0) {
            return 35;
        } else if (b > 120) {
            return 765;
        } else {
            return (b * 6) + 35;
        }
    }
    drawBall(x, y)
    drawHoles()
    //scorePoint(x, y)
}

window.addEventListener('deviceorientation', handleOrientation)

function populateHoleCollection() {
    for (let i = 0; holeCollection.length < holeAmount; i++) {
 
        const xRandom = Math.floor(Math.random() * 850) + 80
        const yRandom = Math.floor(Math.random() * 650) + 80

        const hole = {
            id: holeCollection.length,
            posX: xRandom,
            posY: yRandom,
            active: false
        }
        if (holeCollection.length == 0) {
            hole.active = true
            holeCollection.push(hole)
        }
    }
}

function drawHoles(x, y) {
    holeCollection.forEach((el, e) => {
        context.beginPath()
        context.arc(el.x, el.y, 50, 0, 2 * Math.PI)
        if (el.active) {
            context.fillStyle = "#66FF66"
            context.fill()
        }
        else{
            context.fillStyle = "#FFFFFF"
            context.fill()         
        }
        context.closePath()
    })

function scorePoint(x, y) {
    
}

}

function gameTimer() {
    gameTime++
    let time = gameTime
    let minutes = Math.floor(time / 60)
    time -= minutes * 60
    let seconds = time

    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    counter.innerHTML = `${minutes}:${seconds}`
}

function updateTimer() {
    setInterval(gameTimer, 1000)
}