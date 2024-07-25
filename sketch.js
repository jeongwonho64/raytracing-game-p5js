let ray;
let walls = [];
let players = [];
let button;
let timer = 0;
let done = false;
let mapper;
let score = [0, 0];
let scored = 'null';
let scoreShower;
let screen = 'intro'
let fills = ['lightblue', 'navy', 'navy']
let endFill = ['beige', 'silver', 'blue']

function setup() {
    createCanvas(windowWidth, windowHeight);
    mapper = new Map(0)
    scoreShower = new scoreBox()
    walls.push(new Wall(windowWidth*5/40, 0, windowWidth*5/40, windowWidth*4/40));
    walls.push(new Wall(0, windowWidth*4/40, windowWidth*5/40, windowWidth*4/40));
  
    walls.push(new Wall(0, 0, 0, width));
    walls.push(new Wall(width, width, 0, width));
    walls.push(new Wall(width, width, width, 0));
    walls.push(new Wall(0, 0, width, 0));
  
    players.push(new Particle(100,200, [255, 0, 0], 0))
    players.push(new Particle(windowWidth - 100,windowHeight - 200, [0, 0, 255], 1))
  
  button = createButton('Change Map')
  button.position(windowWidth - 100, 25)
  
  
  
  button.mousePressed(() => {
    if (mapper.mode == 0) {
      mapper.changeMap(random([1, 2]))
      walls = []
      walls.push(new Wall(0, 0, 0, width));
      walls.push(new Wall(width, width, 0, width));
      walls.push(new Wall(width, width, width, 0));
      walls.push(new Wall(0, 0, width, 0));
    } else {
      mapper.changeMap(random([0, 1, 2]))
      walls = []
      walls.push(new Wall(0, 0, 0, width));
      walls.push(new Wall(width, width, 0, width));
      walls.push(new Wall(width, width, width, 0));
      walls.push(new Wall(0, 0, width, 0));
    }
  });

}



function draw() {
    background(0);
    mapper.mapping(walls)
  if (screen == 'game') {
    for (let wall of walls) {
        wall.show();
    }

    for (let player of players) {
      player.show(walls);

      player.move()

      player.display()

    }

    scoreShower.update(score)
  }
  
  
  if (screen == 'game') {
    timer++
    button.show()
  }
  
  if (timer >= 200 && scored == 'null') {
    let total = width * height;

    loadPixels();
    let pixelsPerSquare = pixelDensity() * pixelDensity();

    let redSquaresCount = 0;
    let blueSquaresCount = 0

    for (let i = 3; i <= pixels.length; i += 4) {
      if (
        pixels[i] == 255 &&
        pixels[i - 1] == 0 &&
        pixels[i - 2] == 0 &&
        pixels[i - 3] == 255
      ) {
        redSquaresCount += 1;
      }
    }
    
    for (let i = 3; i <= pixels.length; i += 4) {
      if (
        pixels[i] == 255 &&
        pixels[i - 1] == 255 &&
        pixels[i - 2] == 0 &&
        pixels[i - 3] == 0
      ) {
        blueSquaresCount += 1;
      }
    }
    if (redSquaresCount > blueSquaresCount) {
      background('red')
      score[0]++
      scored = 'red'
    } else if (blueSquaresCount > redSquaresCount) {
      background('blue')
      score[1]++
      scored = 'blue'
    }
    
    done = true

  } else if (timer >= 200) {
    if (scored == 'blue') {
      background('blue')
    } else if (scored == 'red') {
      background('red')
    }
  }
  
  if (screen == 'game') {
    scoreShower.display(timer)
  }
  
  if (screen == 'intro') {
    button.hide()
    background('beige')
    push()
    textAlign(CENTER)
    fill('navy')
    stroke('lightblue')
    strokeWeight(windowWidth/160)
    textSize(windowWidth/10)
    text('Raytracing', windowWidth/2, windowWidth/5)
    
    if (mouseX > windowWidth*33/80 && mouseX < windowWidth*47/80 && mouseY > (windowHeight*59/80 - windowWidth/20) && mouseY < (windowHeight*59/80 + windowWidth/20)) {
      fills = ['navy', 'beige', 'lightblue']
    } else {
      fills = ['lightblue', 'navy', 'navy']
    }
    
    fill(fills[0])
    stroke(fills[1])
    strokeWeight(windowWidth/160)
    rectMode(CENTER)
    rect(windowWidth/2, windowHeight*3/4 - windowHeight*1/80, windowWidth*7/40, windowWidth/10)
    
    fill(fills[2])
    noStroke()
    textSize(windowWidth/20)
    text('Start', windowWidth/2, windowHeight*3/4)
    pop()
  } else if (screen == 'instructions') {
    background('lightblue')
    push()
    fill('navy')
    textSize(windowHeight/40)
    textAlign(CENTER)
    noStroke()
    text('This is game sponsored by RayCasting TM', windowWidth/2, windowHeight*3/80)
    textSize(windowHeight/20)
    text('Use the arrow keys to move the red particle (1P)', windowWidth/2, windowHeight*7/80)
    text('Use the WASD keys to move the blue particle (2P)', windowWidth/2, windowHeight*12/80)
    text('Each player radiates out light', windowWidth/2, windowHeight*17/80)
    text('There are hidden walls in the map', windowWidth/2, windowHeight*22/80)
    text('Shine on a bigger area than your opponent to win points', windowWidth/2, windowHeight*27/80)
    text('After a point is won, click the screen to reset from the win screen', windowWidth/2, windowHeight*32/80)
    text('You can change the map at your own risk', windowWidth/2, windowHeight*37/80)
    text('First to 10 wins', windowWidth/2, windowHeight*42/80)
    
    if (mouseX > windowWidth*33/80 && mouseX < windowWidth*47/80 && mouseY > (windowHeight*59/80 - windowWidth/20) && mouseY < (windowHeight*59/80 + windowWidth/20)) {
      fills = ['navy', 'lightblue', 'beige']
    } else {
      fills = ['beige', 'navy', 'navy']
    }
    
    fill(fills[0])
    stroke(fills[1])
    strokeWeight(windowWidth/160)
    rectMode(CENTER)
    rect(windowWidth/2, windowHeight*3/4 - windowHeight*1/80, windowWidth*7/40, windowWidth/10)
    
    fill(fills[2])
    noStroke()
    textSize(windowWidth/20)
    text('Ok! ;)', windowWidth/2, windowHeight*3/4)
    pop()
  } else if (screen == 'game over') {
    
    fills = ['lightblue', 'beige', 'navy']
    button.hide()
    push()
    background('gray')
    textSize(windowHeight/8)
    if (score[0] > score[1]) {
      stroke('red')
    } else {
      stroke('blue')
    }
    textAlign(CENTER)
    strokeWeight(windowHeight/160)
    fill('beige')
    text('GAME OVER!!', windowWidth/2, windowHeight/8)
    noStroke()
    textSize(windowHeight/20)
    if (abs(score[0] - score[1]) > 2) {
      text('In a rapid and dominant fashion,', windowWidth/2, windowHeight*9/40)
    } else {
      text('After much trial and tribulation,', windowWidth/2, windowHeight*9/40)
    }
    
    strokeWeight(windowHeight/320)
    stroke('beige')
    if (score[0] - score[1] > 0) {
      endFill[2] = 'red'
      fill('blue')
      text('Blue has emerged with a score of ' + score[1], windowWidth/2, windowHeight*12/40)
      fill('red')
      text('Red has emerged with a score of ' + score[0], windowWidth/2, windowHeight*15/40)
      
      noStroke()
      fill('beige')
      text('Hence, Red has emerged VICTORIOUS!!', windowWidth/2, windowHeight*18/40)
    } else {
      endFill[2] = 'blue'
      fill('blue')
      text('Blue has emerged with a score of ' + score[1], windowWidth/2, windowHeight*15/40)
      fill('red')
      text('Red has emerged with a score of ' + score[0], windowWidth/2, windowHeight*12/40)
      
      noStroke()
      fill('beige')
      text('Hence, Blue has emerged VICTORIOUS!!', windowWidth/2, windowHeight*18/40)
    }
    rectMode(CENTER)
    strokeWeight(windowWidth/160)
    
    if (mouseX > windowWidth/8 && mouseX < windowWidth*3/8 && mouseY > windowHeight*7/10 && mouseY < windowHeight*31/40) {
      fills = ['navy', 'lightblue', 'beige']
    } else {
      fills = ['lightblue', 'beige', 'navy']
    }
    
    if (mouseX > windowWidth*5/8 && mouseX < windowWidth*7/8 && mouseY > windowHeight*7/10 && mouseY < windowHeight*31/40) {
      if (score[0] > score[1]) {
        endFill = ['silver', 'beige', 'blue']
      } else {
        endFill = ['silver', 'beige', 'red']
      }
    } else {
      if (score[0] > score[1]) {
        endFill = ['beige', 'silver', 'red']
      } else {
        endFill = ['beige', 'silver', 'blue']
      }
    }
    
    fill(fills[0])
    stroke(fills[1])
    rect(windowWidth/4, windowHeight*3/4 - windowHeight/80, windowWidth/4, windowHeight*3/40)
    
    fill(endFill[0])
    stroke(endFill[1])
    rect(windowWidth*3/4, windowHeight*3/4 - windowHeight/80, windowWidth/4, windowHeight*3/40)
    
    noStroke()
    
    fill(fills[2])
    text('Play Again', windowWidth/4, windowHeight*3/4)
    
    fill(endFill[2])
    text('Restart', windowWidth*3/4, windowHeight*3/4)
    
    pop()
  }
  
  for (let scores of score) {
    if (scores == 10) {
      screen = 'game over'
    }
  }
}

function mouseClicked() {

  if (screen == 'intro' && fills[0] == 'navy') {
    screen = 'instructions'
  } else if (screen == 'instructions' && fills[0] == 'navy') {
    screen = 'game'
    timer = 0
  } else if (screen == 'game over') {
    if (fills[0] == 'navy') {
      score = [0, 0]
      screen = 'game'
    } else if (endFill[0] == 'silver') {
      score = [0, 0]
      screen = 'intro'
    }
  } 
  if (done == true) {
    timer = 0
    done = false
    scored = 'null'
  }
}