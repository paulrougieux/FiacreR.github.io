// Particle class
class Particle {
  constructor(xinit,yinit) {
    this.x = xinit;
    this.y = yinit;
    this.diameter = 10;
    this.speed = 2;
  }
}


// Carrier class
class Photon extends Particle { 
  constructor(xinit,yinit, vxinit, vyinit) {
    super(xinit,yinit);
    this.vx = vxinit;
    this.vy = vyinit;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,255);
    ellipse(this.x, this.y-0.6, this.diameter, this.diameter);
  }
}

// Carrier class
class Carrier extends Particle { 
  constructor(xinit,yinit) {
    super(xinit,yinit);
    this.x = xinit;
    this.y = yinit;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    this.electronMembrane = 0;
    this.holeMembrane = 0;
    this.electronMetal = 0;
    this.electronWire = 0;
    this.pos = createVector(xinit,yinit);
    this.vel = createVector(random(-this.speed, this.speed),random(-this.speed, this.speed));
    this.acc = createVector();
  }
}

class Electron extends Carrier { 
  constructor(xinit,yinit, idin, oin) {
    super(xinit,yinit);
    this.id = idin;
    this.others = oin;
    this.charge = -1;
  }
  collide() {
    for (let i = this.id + 1; i < electrons.length; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = 1.5*(this.others[i].diameter + this.diameter);
      if ((distance < minDist)&&((this.x<rightSide)&&(this.y<bottomSide-4))) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
    }
    move() {
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if ((electronMembrane==1)&&(this.y<topSide+2)&&(this.vx>4)) {this.vx = 1}

    if ((metal===0)) {
        if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
        if ((electronMembrane==1)&&(this.y<topSide+2)) {this.vy=0}
        if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
        if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
        if ((holeMembrane==1)&&(this.y>bottomSide-9)) {this.vy=-this.vy,this.y=bottomSide-9}
    }
    if ((metal==1)) {
        if ((electronMembrane==1)&&(this.y<topSide+2)) {this.vy=0}
        if ((electronMembrane==1)&&(this.y<topSide+2)&&(this.x > rightSide - 43)) {this.vy=-random(2),this.vx=+random(2)}
        if ((this.y<topSide)&&(this.x < rightSide - 33)) {this.y = topSide, this.vy = -this.vy}
        if ((this.y<topSide-10)&&(this.x >= rightSide - 33)) {this.y = topSide-10, this.vy = -this.vy}
        if ((this.y>bottomSide+10)&&(this.x >= rightSide + 43)) {this.y = bottomSide+10, this.vy = 0, this.vx = -2}
        if ((this.x>rightSide)&&(this.x<rightSide+43)&&(this.y>topSide+1)&&(this.y<bottomSide-1)) {this.x = rightSide, this.vx = -this.vx}
        if (this.x>rightSide+43) {this.x = rightSide+43, this.vx = 0, this.vy = 2, rotationSpeed = rotationSpeed + 0.03}
        if ((holeMembrane==1)&&(this.y>bottomSide-9)&&(this.x<rightSide-20)) {this.vy=-this.vy,this.y=bottomSide-9}
        if ((this.y>=bottomSide+10)&&(this.x < rightSide - 5)) {this.y = bottomSide+11+random(2), this.x = rightSide-10+random(2), this.vy = 0, this.vx = 0}
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,20);
    ellipse(this.x, this.y, this.diameter+10, this.diameter+10);
    stroke(255);
    fill(electronColor);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Hole extends Carrier { 
  constructor(xinit,yinit, idin, oin) {
    super(xinit,yinit);
    this.id = idin;
    this.others = oin;
    this.charge = +1;
  }
  collide() {
    for (let i = this.id + 1; i < holes.length; i++) {
      //console.log(this.others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = 1.5*(this.others[i].diameter + this.diameter);
      //console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }
    move() {
    if (this.x<leftSide) {this.x = leftSide, this.vx = -this.vx}
    if (this.x>rightSide) {this.x = rightSide, this.vx = -this.vx}
    if (this.y<topSide) {this.y = topSide, this.vy = -this.vy}
    if (this.y>bottomSide) {this.y = bottomSide, this.vy = -this.vy}
    if ((electronMembrane==1)&&(this.y<topSide+9)) {this.vy=-this.vy,this.y=topSide+9}
    if ((holeMembrane==1)&&(this.y>bottomSide-2)) {this.vy=0}
    if ((holeMembrane==1)&&(this.y>bottomSide-2)&&(this.vx>4)) {this.vx = 1}
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
    stroke(255,0);
    fill(255,20);
    ellipse(this.x, this.y, this.diameter+10, this.diameter+10);
    stroke(255);
    fill(holeColor);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

// The load is a fan which turns
class Fan {
    constructor() {
        this.speed = 2;
    }
    display() {
        if (rotationSpeed>3) {rotationSpeed = 3}
        rotationAngle = rotationAngle + rotationSpeed;
        fill(211, 211, 211);
        stroke(211, 211, 211);
        push();
        translate(rightSide+43,(topSide+bottomSide)/2);
        rotate(radians(rotationAngle));
        beginShape();
            vertex(-5, 5);
            vertex(0, 25);
            vertex(5, 5);
            vertex(25, 0);
            vertex(5, -4);
            vertex(0, -25);
            vertex(-5, -4);
            vertex(-25, 0);
        endShape();
        pop();
    }
}