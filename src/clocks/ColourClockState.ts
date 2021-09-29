import { observable } from 'mobx';

export class ColourClockState {
  @observable public time = '';

  constructor() {
    setInterval(this.getColourTime, 1000);
  }

  private getColourTime = () => {
    // Get the current time
    const time = new Date();
    const hours = time.getHours().toString();
    const mins = time.getMinutes().toString();
    const secs = time.getSeconds().toString();

    // Format above strings
    const hourStr = hours.length < 2 ? '0' + hours : hours;
    const minsStr = mins.length < 2 ? '0' + mins : mins;
    const secsStr = secs.length < 2 ? '0' + secs : secs;

    // Set time string
    this.time = `#${hourStr}${minsStr}${secsStr}`;
  };
}
