class HoleGenerator{
    constructor(){
        this.canvas = document.querySelector('#gameArea')
        this.ctx = this.canvas.getContext("2d")
        this.holeCollection = []
        this.holeAmount = 5
        this.createHoles();
        this.activeHole = 0
    }

    createHoles(){
        for(let i = 0; this.holeCollection.length < this.holeAmount ;i++){
            const obj = {   
                x: Math.floor(Math.random() * 850) + 80,
                y: Math.floor(Math.random() * 650) + 80,
                postion: this.holeCollection.length,
                isActive:false,
                        }
            if(this.holeCollection.length ==0){
                obj.isActive = true;
                this.holeCollection.push(obj)      
            }else{
                this.checkIfDontOverlap(obj)        
            }
            
        }
    }

    checkIfDontOverlap(obj){
        if (this.checkIfTheCirclesDontOverlap(obj.x, obj.y))
        {
                    this.holeCollection.push(obj)
                }else{
                    const obj2 = {   
                        x: Math.floor(Math.random() * 850) + 80,
                        y: Math.floor(Math.random() * 650) + 80,
                        postion: this.holeCollection.length,
                        isActive:false,
                            };
                    this.checkIfDontOverlap(obj2)
                }  
    }
    checkIfTheCirclesDontOverlap(objX, objY){      
        for(let i = 0; i < this.holeCollection.length; i++){
           let x = Math.abs(this.holeCollection[i].x - objX)
           let y = Math.abs(this.holeCollection[i].y - objY)
           if(x < 90 || y < 90){
               return false
           }else{
               return true
           }
        }
        
    }

    drawAllHoles(){
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

    checkIfBallIsHole(X,Y,){
        const centerX = this.holeCollection[this.activeHole].x+15
        const centerY = this.holeCollection[this.activeHole].y+15
        const edgeA = Math.abs(centerX-X)
        const edgeB = Math.abs(centerY-Y)
        const edgeC = Math.sqrt((edgeA*edgeA)+(edgeB*edgeB))
        if(edgeC<10){
            this.activeNextHole()
        }
    }

    activeNextHole(){
        const x =this.holeCollection[this.activeHole].x
        const y =this.holeCollection[this.activeHole].y
        this.holeCollection[this.activeHole].isActive = false
    
        this.disactivateHole(x,y)
        this.checkIfUserWon()     
        
    }

    disactivateHole(x,y){
        this.ctx.beginPath()
        this.ctx.arc(x, y, 50, 0, 2 * Math.PI)
        this.ctx.fillStyle = "white"
        this.ctx.fill()
    }

    checkIfUserWon(){
        this.activeHole += 1

        if(this.activeHole == 5){
            alert()
        }else{
            this.holeCollection[this.activeHole].isActive = true
        }
    }
}
