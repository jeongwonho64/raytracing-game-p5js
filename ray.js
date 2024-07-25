class Ray {
    constructor(x, y, angle) {
        this.pos = createVector(x, y); // Starting position
        this.dir = p5.Vector.fromAngle(radians(angle)); // Direction vector
    }

    // Display the ray
    show() {
        stroke(0); // Set stroke color to black
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10); // Adjust line length as needed
        pop();
    }
  
  // Check for intersection with a wall
    cast(wall) {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        // Use the formula for line-line intersection
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) return; // The lines are parallel or overlapping

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const intersectionX = x1 + t * (x2 - x1);
            const intersectionY = y1 + t * (y2 - y1);
            return createVector(intersectionX, intersectionY);
        } else {
            return; // No intersection
        }
    }
}