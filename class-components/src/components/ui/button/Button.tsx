import React from 'react';
import { Callback } from '../../../types/types';

export interface ButtonProps {
  children: React.ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick: Callback;
}

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (
      <button type={this.props.type || 'button'} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
