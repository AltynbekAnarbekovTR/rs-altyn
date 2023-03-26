import React, { Component } from 'react';

interface TextInputProps {
  className: string;
  label: string;
  id: string;
  refer: React.RefObject<HTMLInputElement>;
}

export class TextInput extends Component<TextInputProps, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor={this.props.id}>
          {this.props.label}
          <input data-testid="title" id={this.props.id} type="text" ref={this.props.refer} />
        </label>
      </div>
    );
  }
}

export default TextInput;
