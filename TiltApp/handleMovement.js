class HandleMovement {
    constructor() {
        this.canvas = document.querySelector('#gameArea')
        this.context = this.canvas.getContext("2d")
        this.x = 500
        this.y = 400
        this.HoleGenerator = new HandleHoles(this.time)
        this.createBall()
        this.HoleGenerator.createHolesOnCanvas()
        this.handlePositionCenter()
        this.startEventListeners()
    }

    createBall(x = 500, y = 400) {
        this.context.clearRect(0, 0, 1000, 800)
        this.context.beginPath()
        this.context.arc(x, y, 35, 0, 2 * Math.PI)
        this.context.fillStyle = 'red'
        this.context.fill()
        this.context.stroke()
    }

    handlePositionCenter() {
        this.centerX = this.x + 17.5
        this.centerY = this.y + 17.5
    }

    startEventListeners() {
        window.addEventListener('deviceorientation', (e) => this.handleOrientation(e))
    }

    handleOrientation(e) {
        this.y = this.handlePositionY(e.beta)
        this.x = this.handlePositionX(e.alpha)
        this.createBall(this.x, this.y)
        this.handlePositionCenter()
        this.HoleGenerator.createHolesOnCanvas()
        this.HoleGenerator.scorePoint(this.centerX, this.centerY, this.time)
    }

    handlePositionX(a) {
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
    handlePositionY(b) {
        if (b < 0) {
            return 35;
        } else if (b > 120) {
            return 765;
        } else {
            return (b * 6) + 35;
        }
    }

}