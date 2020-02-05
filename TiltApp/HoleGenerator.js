import Hole from "./hole.js";

class HoleGenerator{
    constructor(){
        this.canvas = document.querySelector('#gameArea');
        this.ctx = this.canvas.getContext("2d");
        this.arrayOfHoles = [];
        this.numberOfHoles = 5;
        this.generateHoles();
        this.activeHole = 0;
    }

    generateHoles(){
        for(let i = 0; this.arrayOfHoles.length < this.numberOfHoles ;i++){
            const temporary = new Hole();
            const obj = {   
                x: temporary.x,
                y: temporary.y,
                postion: this.arrayOfHoles.length,
                status:false,
                        };
            if(this.arrayOfHoles.length ==0){
                obj.status = true;
                this.arrayOfHoles.push(obj);      
            }else{
                this.checkIfDontOverlap(obj);        
            }
            
        }
    }

    checkIfDontOverlap(obj){
        const xd = this.checkIfTheCirclesDontOverlap(obj.x, obj.y);
                if(xd === true){
                    this.arrayOfHoles.push(obj);
                }else{
                    const temporary = new Hole();
                    const obj2 = {   
                        x: temporary.x,
                        y: temporary.y,
                        postion: this.arrayOfHoles.length,
                        status:false,
                            };
                    this.checkIfDontOverlap(obj2);
                }  
    }
    checkIfTheCirclesDontOverlap(objX, objY){      
        for(let i = 0; i < this.arrayOfHoles.length; i++){
           let x = Math.abs(this.arrayOfHoles[i].x - objX);
           let y = Math.abs(this.arrayOfHoles[i].y - objY);
           if(x < 50 || y < 50){
               return false;
           }else{
               return true;
           }
        }
        
    }

    drawAllHoles(x,y){
        this.arrayOfHoles.forEach((item,i) =>{
            this.ctx.beginPath();
            this.ctx.arc(item.x, item.y, 30, 0, 2 * Math.PI);
            if(item.status){
                this.ctx.fillStyle = "blue";
                this.ctx.fill();
            }
            this.ctx.stroke();
        })
        
    }

    checkIfBallIsHole(X,Y,){
        const centerX = this.arrayOfHoles[this.activeHole].x+15;
        const centerY = this.arrayOfHoles[this.activeHole].y+15;
        const edgeA = Math.abs(centerX-X);
        const edgeB = Math.abs(centerY-Y);
        const edgeC = Math.sqrt((edgeA*edgeA)+(edgeB*edgeB));
        if(edgeC<10){
            this.activeNextHole();
        }
    }

    activeNextHole(){
        const x =this.arrayOfHoles[this.activeHole].x;
        const y =this.arrayOfHoles[this.activeHole].y;
        this.arrayOfHoles[this.activeHole].status = false;
    
        this.disactivateHole(x,y);
        this.checkIfUserWon();     
        
    }

    disactivateHole(x,y){
        this.ctx.beginPath();
        this.ctx.arc(x, y, 50, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
    }

    checkIfUserWon(){
        this.activeHole += 1;

        if(this.activeHole == 5){
            alert();
        }else{
            this.arrayOfHoles[this.activeHole].status =true;
        }
    }
}

export default HoleGenerator;