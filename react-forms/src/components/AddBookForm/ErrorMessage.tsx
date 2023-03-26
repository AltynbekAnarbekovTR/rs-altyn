import React, { Component } from 'react';

interface ErrorMessageProps {
  className: string;
  inputError: string;
  testId?: string;
}

export class ErrorMessage extends Component<ErrorMessageProps, {}> {
  render() {
    return (
      <p data-testid={this.props.testId} className={this.props.className}>
        {this.props.inputError !== '' && this.props.inputError}
      </p>
    );

    // return (
    //   <div className={this.props.className}>
    //     <label htmlFor={this.props.id}>
    //       {this.props.label}
    //       <input data-testid="title" id={this.props.id} type="text" ref={this.props.refer} />
    //     </label>
    //   </div>
    // );
  }
}

export default ErrorMessage;
