class Draw{
    constructor(canvas) {

        this.canvas = document.querySelector(`#${canvas}`)
        this.context = this.canvas.getContext('2d')
        this.colors = document.getElementsByClassName('colors')[0];
        this.isDrawing = false
    }

        setMouseCoordinates(event) {

            let scaleX = this.canvas.width / bounds.width
            let scaleY = this.canvas.height / bounds.height

            mouseX = (event.clientX - bounds.left) * scaleX
            mouseY = (event.clientY - bounds.top) * scaleY
        }
    
    drawOnCanvas() {

        this.colors.addEventListener('click', function (event) {
            this.context.strokeStyle = event.target.value
        })

        this.canvas.addEventListener('mousedown', function (event) {
            setMouseCoordinates(event)
            this.isDrawing = true
            this.context.beginPath()
        })

        this.canvas.addEventListener('mousemove', function (event) {
            setMouseCoordinates(event)

            if (this.isDrawing) {
                switch (strokeShape) {
                    case 'square': {
                        this.context.rect(mouseX, mouseY, 10, 10);
                        this.context.fillStyle = context.strokeStyle;
                        this.context.fill()
                        break
                    }
                    case 'triangle': {
                        this.context.moveTo(mouseX, mouseY);
                        this.context.lineTo(mouseX + 10, mouseY);
                        this.context.lineTo(mouseX + (5), mouseY - 5);
                        this.context.fillStyle = context.strokeStyle;
                        this.context.fill()
                        break
                    }

                }
            }
        })

        this.canvas.addEventListener('mouseup', function (event) {
            setMouseCoordinates(event)
            this.isDrawing = false
        })
    }
}