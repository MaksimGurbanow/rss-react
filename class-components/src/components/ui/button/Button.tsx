import React from 'react';
import { Callback } from '../../../types/types';
import './button.css';

export interface ButtonProps {
  children: React.ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick: Callback;
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  style?: React.HTMLAttributes<HTMLButtonElement>['style'];
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
      <button
        type={this.props.type || 'button'}
        onClick={this.handleClick}
        className={`${this.props.className} button`}
        style={this.props.style}
      >
        {this.props.children}
      </button>
    );
  }
}
