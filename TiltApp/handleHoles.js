class HandleHoles{
    constructor(){
        this.canvas = document.querySelector('#gameArea')
        this.text = document.querySelector('#text')
        this.ctx = this.canvas.getContext("2d")
        this.text.innerHTML = ""
        this.gameStart = +new Date()
        this.holeCollection = []
        this.holeAmount = 5
        this.createHoles();
        this.goalHole = 0
    }

    createHoles(){
        for(let i = 0 ; this.holeCollection.length < this.holeAmount ; i++){
            const hole = {   
                id: this.holeCollection.length,
                x: Math.floor(Math.random() * 850) + 80,
                y: Math.floor(Math.random() * 650) + 80,
                isActive:false,
                        }
            if(this.holeCollection.length ==0){
                hole.isActive = true;
                this.holeCollection.push(hole)      
            }else{
                this.checkForOverlapping(hole)        
            }
            
        }
    }

    checkForOverlapping(hole){
        if (this.checkForOverlappingHoles(hole.x, hole.y))
        {
                    this.holeCollection.push(hole)
                }                
                  
    }
    checkForOverlappingHoles(holeX, holeY){      
        for(let i = 0; i < this.holeCollection.length; i++){
           let x = Math.abs(this.holeCollection[i].x - holeX)
           let y = Math.abs(this.holeCollection[i].y - holeY)
           if(x < 90 || y < 90){
               return false
           }else{
               return true
           }
        }
        
    }

    createHolesOnCanvas(){
        this.holeCollection.forEach((item) =>{
            this.ctx.beginPath()
            this.ctx.arc(item.x, item.y, 40, 0, 2 * Math.PI)
            if(item.isActive){
                this.ctx.fillStyle = "#66FF66"
                this.ctx.fill()
            }
            else {
                this.ctx.fillStyle = "#FFFFFF"
                this.ctx.fill()
            }
            this.ctx.stroke()
        })
        
    }

    scorePoint(X, Y){
        const centerX = this.holeCollection[this.goalHole].x+15
        const centerY = this.holeCollection[this.goalHole].y+15
        const edgeA = Math.abs(centerX-X)
        const edgeB = Math.abs(centerY-Y)
        const edgeC = Math.sqrt((edgeA*edgeA)+(edgeB*edgeB))
        if(edgeC<10){
            this.createNextActive()
        }
    }

    createNextActive(){
        const x = this.holeCollection[this.goalHole].x
        const y = this.holeCollection[this.goalHole].y
        this.holeCollection[this.goalHole].isActive = false
    
        this.disablePreviousActive(x,y)
        this.announceVictory()           
    }

    disablePreviousActive(x,y){
        this.ctx.beginPath()
        this.ctx.arc(x, y, 50, 0, 2 * Math.PI)
        this.ctx.fillStyle = "white"
        this.ctx.fill()
    }

    announceVictory(){
        this.goalHole += 1

        if (this.goalHole == this.holeAmount) {
            this.gameEnd = +new Date()
            this.timeTaken = (this.gameEnd - this.gameStart)/1000
            this.text.innerHTML = "grats, you won in " + this.timeTaken + " seconds!"
        }else{
            this.holeCollection[this.goalHole].isActive = true
        }
    }
}
