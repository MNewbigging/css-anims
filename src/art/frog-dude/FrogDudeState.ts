import { observable } from 'mobx';

export interface EyeElements {
  socket: HTMLDivElement;
  iris: HTMLDivElement;
}

interface Eye {
  iris: HTMLDivElement;
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
  originX: number;
  originY: number;
}

export class FrogDudeState {
  private panel: HTMLDivElement;
  private eyes: Eye[] = [];

  constructor(panelElement: HTMLDivElement, eyeElements: EyeElements[]) {
    this.panel = panelElement;
    const panelRect = panelElement.getBoundingClientRect();

    eyeElements.forEach((element) => {
      const socket = element.socket.getBoundingClientRect();
      // const originX = socket.left - socket.width / 2 - panelRect.left;
      // const originY = socket.top + socket.height / 2 - panelRect.top;

      const originX = socket.left - panelRect.left - socket.width / 2;
      const originY = socket.top - panelRect.top - socket.height / 2;
      console.log('socket width:', socket.width);
      console.log(`originX: ${originX} originY: ${originY}`);

      const iris = element.iris.getBoundingClientRect();
      const halfWidth = iris.width / 2;
      const halfHeight = iris.height / 2;

      this.eyes.push({
        iris: element.iris,
        width: iris.width,
        height: iris.height,
        halfWidth,
        halfHeight,
        originX,
        originY,
      });
    });

    this.panel.addEventListener('mousemove', this.onMouseMove);
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
      const ex = (px * 80) / panelRect.width + eye.halfWidth;
      const ey = (py * 80) / panelRect.height + eye.halfHeight;

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
      // Get difference of eye to mouse pos
      const dx = mx - eye.originX;
      const dy = my - eye.originY;

      console.log(`dx: ${dx} dy: ${dy}`);

      // How many eye-lengths is the difference?
      const left = (dx / eye.width) * 10;
      const top = (dy / eye.height) * 10;

      // Adjust for max value
      const leftAdj = left < 100 ? left : 70;

      eye.iris.style.left = left + '%';
      //eye.iris.style.top = dy + '%';

      console.log(`left: ${left} top: ${top}`);
    });
  };
}
