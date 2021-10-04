import { observable } from 'mobx';

export class FrogDudeState {
  private panelElement: HTMLDivElement;
  private panelRect: DOMRect;

  @observable public x = 0;
  @observable public y = 0;

  constructor(panelElement: HTMLDivElement) {
    this.panelElement = panelElement;
    this.panelRect = panelElement.getBoundingClientRect();

    this.panelElement.addEventListener('mousemove', this.onMouseMove);
  }

  private readonly onMouseMove = (e: MouseEvent) => {
    const x = e.clientX - this.panelRect.left;
    const y = e.clientY - this.panelRect.top;

    const tx = (e.clientX * 100) / this.panelRect.width;
    const ty = (e.clientY * 100) / this.panelRect.height;

    const eye = document.getElementById('eye');
    eye.style.top = ty + '%';
    eye.style.left = tx + '%';
  };
}
