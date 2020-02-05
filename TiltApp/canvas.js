import Generator from './generator.js';
import HoleGenerator from './HoleGenerator.js';

class Canvas{
    constructor(){
        this.canvas = document.querySelector('#gameArea');
        this.ctx = this.canvas.getContext("2d");
        this.x = 296; 
        this.y = 296;
        this.time = Date.now();
        this.HoleGenerator = new HoleGenerator(this.time);
        this.drawCircle();
        this.HoleGenerator.drawAllHoles();
        this.updateCenterXandY();
        this.startEventListeners();
    }
    
    drawCircle(x=296,y=296){
        this.ctx.clearRect(0, 0, 600, 600);
        this.ctx.beginPath();
        this.ctx.arc(x,y, 25, 0, 2*Math.PI);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
        this.ctx.stroke();
    }

    updateCenterXandY(){
        this.centerX = this.x + 12.5;
        this.centerY = this.y + 12.5;

    }

    startEventListeners(){
        window.addEventListener('deviceorientation',(e) => this.handleOrientation(e));
    }

    handleOrientation(e){
        this.y = this.moveVerticalY(e.beta);
        this.x = this.moveHorizontalX(e.alpha);
        this.drawCircle(this.x, this.y);
        this.updateCenterXandY(); 
        this.HoleGenerator.drawAllHoles();  
        this.HoleGenerator.checkIfBallIsHole(this.centerX, this.centerY, this.time);  
    }

    moveVerticalY(beta){
        if(beta < 0){
            return 26;
        }else if(beta > 90){
            return 566;
        }else{
            return (beta*6)+26;
        }  
    }
    
    moveHorizontalX(alpha){
        if(alpha < -45){
            return 26;
        }else if(alpha <0 && alpha >= -45){
            return  (270 - ((alpha*-1)*6))+26;
        }else if(alpha < 45){
            return  ((alpha*6)+270)+26;
        }else if(alpha > 70){
            return 566;
        }
    }
}




export default Canvas;
