import * as React from "react";

export interface FooterProps {
  hasBottomButtons?: boolean
}

export default class Footer extends React.Component<FooterProps> {
  render() {
    return <div className={"ui-footer" + (this.props.hasBottomButtons? " ui-bottom-button": "") }>
      {this.props.children}
    </div>
  }
}
