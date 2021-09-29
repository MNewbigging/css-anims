import { observer } from 'mobx-react';
import React from 'react';

import { ColourClockState } from './ColourClockState';

import './colour-clock.scss';

@observer
export class ColourClock extends React.Component {
  private readonly colourClockState = new ColourClockState();

  public render() {
    return (
      <div
        className={'panel colour-clock'}
        style={{ backgroundColor: `${this.colourClockState.time}` }}
      >
        {this.colourClockState.time}
      </div>
    );
  }
}
