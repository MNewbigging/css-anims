import { observer } from 'mobx-react';
import React from 'react';

import { FrogDudeState } from './FrogDudeState';

import './frog-dude.scss';

@observer
export class FrogDude extends React.Component {
  private frogState: FrogDudeState;
  private panelRef = React.createRef<HTMLDivElement>();
  private leftEyeRef = React.createRef<HTMLDivElement>();
  private rightEyeRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.panelRef.current && this.leftEyeRef.current) {
      this.frogState = new FrogDudeState(this.panelRef.current, this.leftEyeRef.current);
    }
  }

  public render() {
    return (
      <div ref={this.panelRef} className={'frog-dude panel'}>
        {this.renderEye()}
      </div>
    );
  }

  private renderEye() {
    return (
      <div className={'eye'}>
        <div ref={this.leftEyeRef} className={'iris'}></div>
      </div>
    );
  }
}
