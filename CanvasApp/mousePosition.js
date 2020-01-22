class mousePosition{
    constructor(){
        function setMouseCoordinates(event) {
            let bounds = canvas.getBoundingClientRect()
            let scaleX = canvas.width / bounds.width
            let scaleY = canvas.height / bounds.height
  
            mouseX = (event.clientX - bounds.left) * scaleX
            mouseY = (event.clientY - bounds.top) * scaleY
        }
}
}