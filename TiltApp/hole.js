import Generator from "./generator.js"

class Hole{
    constructor(){
        this.x = new Generator().generateBetween26and574();
        this.y = new Generator().generateBetween26and574();
    }
}

export default Hole;