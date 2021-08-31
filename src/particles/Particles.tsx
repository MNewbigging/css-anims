import React from 'react';

import { ParticlesState, Vec2 } from './ParticlesState';

import './particles.scss';

export class Particles extends React.Component {
  private particlesState: ParticlesState;

  componentDidMount() {
    const canvas = document.getElementById('smoke-canvas') as HTMLCanvasElement;
    if (canvas) {
      this.particlesState = new ParticlesState(
        canvas,
        new Vec2(canvas.width / 2, canvas.height / 2)
      );
    }
  }

  public render() {
    return <canvas id={'smoke-canvas'} className={'panel particles'}></canvas>;
  }
}
