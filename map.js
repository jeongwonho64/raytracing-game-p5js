class Map {
    constructor(mode) {
      this.mode = mode
    }
    
    mapping(walls) {
      if (this.mode == 0) {
        walls.push(new Wall(windowWidth*1/8, windowHeight*1/8, windowWidth*3/16, windowHeight*5/16));
        walls.push(new Wall(windowWidth*6/8, windowHeight*2/8, windowWidth, windowHeight*5/8));
        walls.push(new Wall(windowWidth*4/8, windowHeight*7/8, windowWidth*1/16, windowHeight*5/8));
        walls.push(new Wall(windowWidth*4/8, windowHeight*4/8, windowWidth*9/16, windowHeight*6/8));
        
      } else if (this.mode == 1) {
      
        
        walls.push(new Wall(windowWidth*random([0, 1, 2])/8, windowHeight*random([0, 1, 2])/8, windowWidth*random([0, 1, 2])/8, windowHeight*random([0, 1, 2])/8));
        walls.push(new Wall(windowWidth*random([6, 7, 8])/8, windowHeight*random([0, 1, 2])/8, windowWidth*random([6, 7, 8])/8, windowHeight*random([0, 1, 2])/8));
        walls.push(new Wall(windowWidth*random([0, 1, 2])/8, windowHeight*random([4, 5, 6])/8, windowWidth*random([0, 1, 2])/8, windowHeight*random([4, 5, 6])/8));
        walls.push(new Wall(windowWidth*random([4, 5, 6])/8, windowHeight*random([4, 5, 6, 7, 8])/8, windowWidth*random([4, 5, 6])/8, windowHeight*random([4, 5, 6])/8));
      }
    }
    
    changeMap(mode) {
      this.mode = mode
    }
  }