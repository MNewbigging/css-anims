import { observable } from 'mobx';

export class Vec2 {
  constructor(public x = 0, public y = 0) {}
}

export class Particle {
  public age: number = 0;
  public lifespan: number; // no. of frames this particle is kept alive
  public position: Vec2;
  public velocity: Vec2;
  public rotation: number; // in degrees

  constructor(lifespan: number, position: Vec2, velocity: Vec2, rotation = 0) {
    this.lifespan = lifespan;
    this.position = position;
    this.velocity = velocity;
    this.rotation = rotation;
  }

  // Updates position and age of particle
  public update(dt: number) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.age += dt;

    // As it gets older, particle veers right
    this.velocity.x += this.age / 30;
  }
}

export class ParticlesState {
  public particles: Particle[] = [];
  private readonly canvas: HTMLCanvasElement;
  private readonly canvasCtx: CanvasRenderingContext2D;
  private readonly startPos: Vec2;
  private particleImage: HTMLImageElement;
  private lastFrameTime: number;
  private addCounter: number = 0;
  private addDelay: number = 0.7;

  constructor(canvas: HTMLCanvasElement, startPos: Vec2) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.startPos = startPos;

    // Asset link depends on running local/published
    const location = window.location.href;
    let path = '';
    if (location.includes('localhost')) {
      path = 'dist/assets/smoke_01.png';
    } else {
      path = 'assets/smoke_01.png';
    }

    const image = new Image();
    image.src = window.location + path;
    image.width = 2;
    image.height = 2;
    image.onload = () => {
      this.particleImage = image;
      this.lastFrameTime = performance.now();
      window.requestAnimationFrame(this.update);
    };
  }

  private update = (timestamp: number) => {
    // work out delta time
    const dt = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;
    this.addCounter += dt;

    // Clear canvas
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the house
    this.drawHouse();

    // Do we need to add more particles?
    if (this.addCounter >= this.addDelay) {
      this.addParticle();
      this.addCounter = 0;
    }

    // Update and draw particles
    this.particles.forEach((p) => p.update(dt));

    // Clear out any dead particles
    this.removeDeadParticles();

    // Draw updated, remaining particles
    this.particles.forEach((p) => this.drawParticle(p));

    window.requestAnimationFrame(this.update);
  };

  private addParticle() {
    const lifespan = 5;
    const pos = new Vec2(this.startPos.x - 2.5, this.startPos.y - 50);
    const vel = new Vec2(0, -10);
    const rot = Math.floor(Math.random() * 360);

    const p = new Particle(lifespan, pos, vel, rot);

    this.particles.push(p);
  }

  private removeDeadParticles() {
    this.particles = this.particles.filter((p) => p.age < p.lifespan);
  }

  private drawParticle(particle: Particle) {
    if (!this.particleImage) {
      return;
    }

    const ctx = this.canvasCtx;

    ctx.save();

    // Translate context to origin of the particle
    ctx.translate(particle.position.x + 25, particle.position.y + 25);

    // Rotate context
    ctx.rotate((particle.rotation * Math.PI) / 180);

    // Fade in or out depending on age
    let alpha = 1;
    const remainingLife = particle.lifespan - particle.age;
    if (particle.age < 1) {
      alpha = particle.age;
    } else if (remainingLife < 1) {
      alpha = remainingLife;
    }
    ctx.globalAlpha = alpha;

    // Draw image - dx and dy are affected by above translation
    ctx.drawImage(this.particleImage, -25, -25, 50, 50);

    ctx.restore();
  }

  private drawHouse() {
    const ctx = this.canvasCtx;

    const houseWidth = 100;
    const houseHeight = 60;
    const houseLeft = this.canvas.width / 2 - houseWidth / 2;
    const houseYOffset = 85;
    const houseMid = houseLeft + houseWidth / 2;
    const houseRight = houseLeft + houseWidth;

    // Main house body
    ctx.beginPath();
    ctx.rect(houseLeft, houseYOffset, houseWidth, houseHeight);
    ctx.stroke();
    ctx.fillStyle = '#ccb494';
    ctx.fill();

    // Door
    ctx.beginPath();
    ctx.rect(houseMid - 10, houseYOffset + 30, 20, 30);
    ctx.fillStyle = '#795644';
    ctx.fill();

    // Window left
    ctx.beginPath();
    ctx.rect(houseLeft + 10, houseYOffset + 8, 20, 20);
    ctx.fillStyle = '#b3e5fc';
    ctx.fill();

    // Window right
    ctx.beginPath();
    ctx.rect(houseLeft + 70, houseYOffset + 8, 20, 20);
    ctx.fillStyle = '#b3e5fc';
    ctx.fill();

    // Chimney
    const chimneyLeft = houseMid + 10;
    ctx.beginPath();
    ctx.rect(chimneyLeft + 5, houseYOffset - 25, 15, 15);
    ctx.stroke();
    ctx.fillStyle = '#c38452';
    ctx.fill();

    // Roof
    ctx.beginPath();
    ctx.moveTo(houseLeft, houseYOffset);
    ctx.lineTo(houseMid, houseYOffset - 30);
    ctx.lineTo(houseRight, houseYOffset);
    ctx.strokeStyle = '#663e2e';
    ctx.stroke();
    ctx.fillStyle = '#663e2e';
    ctx.fill();
  }
}
