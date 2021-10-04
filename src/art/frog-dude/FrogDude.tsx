import { observer } from 'mobx-react';
import React from 'react';

import { EyeElements, FrogDudeState } from './FrogDudeState';

import './frog-dude.scss';

@observer
export class FrogDude extends React.Component {
  private frogState: FrogDudeState;
  private panelRef = React.createRef<HTMLDivElement>();
  private irisRef = React.createRef<HTMLDivElement>();
  private socketRef = React.createRef<HTMLDivElement>();
  private rightEyeRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // Setup eye data
    const eyeElements: EyeElements = {
      socket: this.socketRef.current,
      iris: this.irisRef.current,
    };

    this.frogState = new FrogDudeState(this.panelRef.current, [eyeElements]);
  }

  public render() {
    return (
      <div ref={this.panelRef} className={'frog-dude panel'}>
        <div className={'eye-socket left'}>
          <div ref={this.socketRef} className={'eye'}>
            <div ref={this.irisRef} className={'iris'}></div>
          </div>
        </div>
      </div>
    );
  }

  private renderEye() {
    return (
      <div className={'eye'}>
        <div ref={this.irisRef} className={'iris'}></div>
      </div>
    );
  }
}
