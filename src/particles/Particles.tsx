import { observer } from 'mobx-react';
import React from 'react';

import { ParticlesState } from './ParticlesState';

import './particles.scss';

@observer
export class Particles extends React.Component {
  private particlesState: ParticlesState;

  componentDidMount() {
    const canvas = document.getElementById('smoke-canvas') as HTMLCanvasElement;
    if (canvas) {
      this.particlesState = new ParticlesState(canvas.getContext('2d'));
    }
  }

  public render() {
    return <canvas id={'smoke-canvas'} className={'panel particles'}></canvas>;
  }
}
