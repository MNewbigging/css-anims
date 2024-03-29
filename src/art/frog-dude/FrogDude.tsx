import { observer } from 'mobx-react';
import React from 'react';

import { EyeElements, FrogDudeState } from './FrogDudeState';

import './frog-dude.scss';

@observer
export class FrogDude extends React.Component {
  private frogState: FrogDudeState;
  private panelRef = React.createRef<HTMLDivElement>();
  private eyeNames: string[] = ['left', 'right'];

  componentDidMount() {
    this.frogState = new FrogDudeState(this.panelRef.current, this.eyeNames);
  }

  public render() {
    return (
      <div ref={this.panelRef} className={'frog-dude panel'}>
        <div className={'body'}></div>
        <div className={'mouth'}></div>
        {this.eyeNames.map((name) => this.renderEye(name))}
      </div>
    );
  }

  private renderEye(name: string) {
    return (
      <div key={name} className={name + ' eye'}>
        <div id={name + '-socket'} className={name + ' socket'}>
          <div id={name + '-iris'} className={'iris'}></div>
        </div>
      </div>
    );
  }
}
