class Particle {
    constructor(x, y, [r, g, b], z) {
      this.pos = createVector(x, y);
      this.col = [r, g, b];
      this.mover = z;
      this.rad = windowWidth / 60
    }
  
    lookAt(walls) {
      const rays = [];
      for (let a = 0; a <= 360; a += 10) {
        const ray = new Ray(this.pos.x, this.pos.y, a);
        let closest = null;
        let record = Infinity;
        for (let wall of walls) {
          const pt = ray.cast(wall);
          if (pt) {
            const d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
            if (d < record) {
              record = d;
              closest = pt;
            }
          }
        }
        if (closest) {
          line(this.pos.x, this.pos.y, closest.x, closest.y);
        }
        rays.push(ray);
      }
      return rays;
    }
  
    show(walls) {
      stroke(this.col[0], this.col[1], this.col[2]);
      for (let ray of this.lookAt(walls)) {
        line(this.pos.x, this.pos.y, ray.pos.x, ray.pos.y);
      }
    }
  
    move() {
      if (keyIsPressed) {
        if (this.mover == 0) {
          if (keyCode == UP_ARROW) {
            this.pos.y -= windowHeight/120;
          } else if (keyCode == RIGHT_ARROW) {
            this.pos.x += windowWidth/120;
          } else if (keyCode == DOWN_ARROW) {
            this.pos.y += windowHeight/120;
          } else if (keyCode == LEFT_ARROW) {
            this.pos.x -= windowWidth/120;
          }
        } else if (this.mover == 1) {
          if (keyCode == 87) {
            this.pos.y -= windowHeight/120;
          } else if (keyCode == 68) {
            this.pos.x += windowWidth/120;
          } else if (keyCode == 83) {
            this.pos.y += windowHeight/120;
          } else if (keyCode == 65) {
            this.pos.x -= windowWidth/120;
          }
        }
      }
      
      if (this.pos.x > windowWidth - this.rad/2) {
        this.pos.x = windowWidth - this.rad/2
      } 
      
      if (this.pos.y > windowHeight - this.rad/2) {
        this.pos.y = windowHeight - this.rad/2
      }
      
      if (this.pos.x < this.rad/2) {
        this.pos.x = this.rad/2
      }
      
      if (this.pos.y < this.rad/2) {
        this.pos.y = this.rad/2
      } 
    }
  
    display() {
      push();
      noStroke();
      fill("white");
      circle(this.pos.x, this.pos.y, this.rad);
      pop();
    }
  }
  
  
  