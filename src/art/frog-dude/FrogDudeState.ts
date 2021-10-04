import { observable } from 'mobx';

interface Eye {
  element: HTMLDivElement;
  halfWidth: number;
  halfHeight: number;
}

export class FrogDudeState {
  private panel: HTMLDivElement;
  private panelRect: DOMRect;
  private eyes: Eye[] = [];

  constructor(panelElement: HTMLDivElement, eyeElements: HTMLDivElement[]) {
    this.panel = panelElement;
    this.panelRect = panelElement.getBoundingClientRect();

    eyeElements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      this.eyes.push({
        element,
        halfWidth: rect.width / 2,
        halfHeight: rect.height / 2,
      });
    });

    this.panel.addEventListener('mousemove', this.onMouseMove);
  }

  private readonly onMouseMove = (e: MouseEvent) => {
    const panelRect = this.panel.getBoundingClientRect();

    const px = e.clientX - panelRect.left;
    const py = e.clientY - panelRect.top;

    this.eyes.forEach((eye) => {
      const ex = (px * 80) / panelRect.width + eye.halfWidth;
      const ey = (py * 80) / panelRect.height + eye.halfHeight;

      eye.element.style.left = ex + '%';
      eye.element.style.top = ey + '%';
    });
  };
}
