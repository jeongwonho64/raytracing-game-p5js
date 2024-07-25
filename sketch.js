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