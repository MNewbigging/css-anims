import { observer } from 'mobx-react';
import React from 'react';

import { FrogDudeState } from './FrogDudeState';

import './frog-dude.scss';

@observer
export class FrogDude extends React.Component {
  private frogState: FrogDudeState;
  private ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.ref.current) {
      this.frogState = new FrogDudeState(this.ref.current);
    }
  }

  public render() {
    return (
      <div ref={this.ref} className={'frog-dude panel'}>
        {this.renderEye()}
      </div>
    );
  }

  private renderEye() {
    return (
      <div className={'eye'}>
        <div id={'eye'} className={'iris'}></div>
      </div>
    );
  }
}
