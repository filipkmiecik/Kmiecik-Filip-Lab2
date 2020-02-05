import Canvas from './canvas.js';

document.addEventListener("DOMContentLoaded",appStart);


function appStart() {
    document.querySelector('#StartBtn').addEventListener('click',(e)=>{
        new Canvas();
    })
    
}



