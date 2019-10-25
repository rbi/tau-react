import * as React from "react";

export interface ButtonProps {
  text: string
  onClick?: () => void;
}

export default class Button extends React.Component<ButtonProps> {
  render() {
    return <button type="button" className="ui-btn" onClick={this.props.onClick} >
      {this.props.text}
    </button>
  }
}

