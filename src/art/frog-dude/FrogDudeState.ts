import { observable } from 'mobx';

export interface EyeElements {
  socket: HTMLDivElement;
  iris: HTMLDivElement;
}

interface Eye {
  iris: HTMLDivElement;
  originX: number;
  originY: number;
  range: number;
  left: number;
  top: number;
}

export class FrogDudeState {
  private panel: HTMLDivElement;
  private eyes: Eye[] = [];

  constructor(panelElement: HTMLDivElement, eyeNames: string[]) {
    this.panel = panelElement;
    const panelRect = panelElement.getBoundingClientRect();

    eyeNames.forEach((name) => {
      // Get the socket element for this eye and its bounds
      const socket = document.getElementById(`${name}-socket`);
      const socketRect = socket.getBoundingClientRect();

      // Find the center point for the socket
      const originX = socketRect.left - panelRect.left + socketRect.width / 2;
      const originY = socketRect.top - panelRect.top + socketRect.height / 2;

      // Create the eye range
      const range = socketRect.width * 3;

      // Get the iris
      const iris = document.getElementById(`${name}-iris`) as HTMLDivElement;

      this.eyes.push({
        iris,
        originX,
        originY,
        range,
        left: 50,
        top: 50,
      });
    });

    this.panel.addEventListener('mousemove', this.onMouseMove);
  }

  private readonly onMouseMove = (e: MouseEvent) => {
    const panelRect = this.panel.getBoundingClientRect();

    // Get mouse pos within panel
    const mx = e.clientX - panelRect.left;
    const my = e.clientY - panelRect.top;

    this.eyes.forEach((eye) => {
      // Get distance from mouse to eye
      const dx = mx - eye.originX;
      const dy = my - eye.originY;

      // Distance relative to eye range; dist as percentage of range
      const rx = (dx / eye.range) * 100;
      const ry = (dy / eye.range) * 100;

      // Adjust for center pos with 50%
      const cx = 50 + rx;
      const cy = 50 + ry;

      // Clamp values within 0 and 90
      const min = 20;
      const max = 80;
      const left = this.clamp(min, max, cx);
      const top = this.clamp(min, max, cy);

      eye.iris.style.left = left + '%';
      eye.iris.style.top = top + '%';
    });
  };

  private clamp(min: number, max: number, value: number) {
    return Math.min(Math.max(value, min), max);
  }
}
