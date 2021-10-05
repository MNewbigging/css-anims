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

      console.log(`originX: ${originX} originY: ${originY}`);

      // Create the eye range
      const range = socketRect.width * 3;

      // Get the iris
      const iris = document.getElementById(`${name}-iris`) as HTMLDivElement;

      this.eyes.push({
        iris,
        originX,
        originY,
        range,
      });

      console.log('eyes', this.eyes);
    });

    this.panel.addEventListener('mousemove', this.onMoveMouse);
  }

  private readonly onMouseMove = (e: MouseEvent) => {
    const panelRect = this.panel.getBoundingClientRect();

    const px = e.clientX - panelRect.left;
    const py = e.clientY - panelRect.top;

    /**
     * TODO
     * Here I should translate px, py by same translation the eye origin is from px and py
     */

    this.eyes.forEach((eye) => {
      const ex = (px * 80) / panelRect.width; // + eye.halfWidth;
      const ey = (py * 80) / panelRect.height; // + eye.halfHeight;

      eye.iris.style.left = ex + '%';
      eye.iris.style.top = ey + '%';

      console.log(`left: ${ex} top: ${ey}`);
    });
  };

  private readonly onMoveMouse = (e: MouseEvent) => {
    const panelRect = this.panel.getBoundingClientRect();

    // Get mouse pos within panel
    const mx = e.clientX - panelRect.left;
    const my = e.clientY - panelRect.top;

    console.log(`mx: ${mx} my: ${my}`);

    this.eyes.forEach((eye) => {
      // Get distance from mouse to eye
      const dx = mx - eye.originX;
      const dy = my - eye.originY;

      // Distance relative to eye range; dist as percentage of range
      const rx = (dx / eye.range) * 100;
      const ry = (dy / eye.range) * 100;

      console.log(`dx: ${dx} dy: ${dy}`);

      // If range percentage is less than 100 (i.e in range), move eyes
      // by 50 (midpoint) + range percentage, up to max
      // if (rx > 100) {
      //   const left = 50;
      // }

      // Adjust for center pos with 50%
      const cx = 50 + rx;
      const cy = 50 + ry;

      // Cannot be bigger than 90 or smaller than 0
      let left = 50;
      let top = 50;

      if (cx > 0 && cx < 90 && cy > 0 && cy < 90) {
        left = cx;
        top = cy;
      }

      console.log(`left: ${left} top:${top}`);

      eye.iris.style.left = left + '%';
      eye.iris.style.top = top + '%';
    });
  };
}
