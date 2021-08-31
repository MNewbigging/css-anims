import { observable } from 'mobx';

export interface Particle {
  id: string;
  age: number;
  lifespan: number; // no. of frames this particle is kept alive
  posX: number;
  posY: number;
  velX: number;
  velY: number;
}

export class ParticlesState {
  @observable public particles: Particle[] = [];
  private readonly canvasCtx: CanvasRenderingContext2D;
  private particleImage: HTMLImageElement;
  private readonly maxParticles = 20;

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx;

    const image = new Image();
    image.src = './smoke_01.png';
    image.onload = () => {
      this.particleImage = image;
    };

    window.requestAnimationFrame(() => this.update(0.66));
  }

  private update(dt: number) {
    // Do we need to add more particles?
    if (this.particles.length < this.maxParticles) {
      this.addParticle();
    }

    // Update particle positions
    this.particles.forEach((p) => this.updateParticle(p, dt));

    // Tick down particle lifespans and kill if life over
    this.particles.forEach((p) => this.ageParticle(p, dt));

    // Draw particles
    this.particles.forEach((p) => this.drawParticle(p));

    window.requestAnimationFrame(() => this.update(0.66));
  }

  private addParticle() {
    const p: Particle = {
      id: 'p',
      age: 0,
      lifespan: 5,
      posX: 0,
      posY: 0,
      velX: 0,
      velY: 1,
    };

    this.particles.push(p);
  }

  private updateParticle(particle: Particle, dt: number) {
    particle.posX += particle.velX * dt;
    particle.posY += particle.velY * dt;
  }

  private ageParticle(particle: Particle, dt: number) {
    particle.age += dt;

    if (particle.age >= particle.lifespan) {
      this.removeParticle(particle);
    }
  }

  private removeParticle(particle: Particle) {
    this.particles = this.particles.filter((p) => p.id !== particle.id);
  }

  private drawParticle(particle: Particle) {
    if (!this.particleImage) {
      return;
    }

    this.canvasCtx.drawImage(this.particleImage, particle.posX, particle.posY);
  }
}
