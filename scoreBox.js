class scoreBox {
    constructor() {
      this.red = 0
      this.blue = 0
    }
    
    display(timer) {
      push()
      fill('beige')
      noStroke()
      rect(0, 0, windowWidth*5/40, windowWidth*4/40)
      rect(0, windowWidth*4/40, windowWidth*5/40, windowWidth*3/80)
      textAlign(LEFT)
      textSize(windowWidth/40)
      fill('navy')
      text('Red: ' + this.red, windowWidth/40, windowWidth/40)
      text('Blue: ' + this.blue, windowWidth/40, windowWidth* 3/40)
      if (timer < 200) {
        text(200 - timer, windowWidth/40, windowWidth*5/40)
      } else {
        text(0, windowWidth/40, windowWidth*5/40)
      }
      
      pop()
    }
    
    update(score){
      this.red = score[0]
      this.blue = score[1]
    }
  }