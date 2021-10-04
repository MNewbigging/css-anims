import { observable } from 'mobx';

interface Eye {
  element: HTMLDivElement;
}

export class FrogDudeState {
  private panel: HTMLDivElement;
  private eyes: HTMLDivElement[] = [];

  constructor(panelElement: HTMLDivElement, leftEye: HTMLDivElement) {
    this.panel = panelElement;

    this.eyes.push(leftEye);

    this.panel.addEventListener('mousemove', this.onMouseMove);
  }

  private readonly onMouseMove = (e: MouseEvent) => {
    const panelRect = this.panel.getBoundingClientRect();
    console.log('pRect', panelRect);

    console.log(`x: ${e.clientX} y: ${e.clientY}`);

    const px = e.clientX - panelRect.left;
    const py = e.clientY - panelRect.top;

    console.log(`px: ${px} py: ${py}`);

    this.eyes.forEach((eye) => {
      const eyeRect = eye.getBoundingClientRect();

      const ex = (px * 80) / panelRect.width + eyeRect.width / 2;
      const ey = (py * 80) / panelRect.height + eyeRect.height / 2;

      eye.style.left = ex + '%';
      eye.style.top = ey + '%';
    });
  };

  private adjustEye(mouseX: number, mouseY: number, eye: HTMLDivElement) {
    const ex = (mouseX * 100) / window.innerWidth;
    const ey = (mouseY * 100) / window.innerHeight;

    eye.style.left = ex + '%';
    eye.style.top = ey + '%';
  }
}
