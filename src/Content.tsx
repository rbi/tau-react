import * as React from "react";

export default class Content extends React.Component {
  render() {
    return <div className="ui-content">
      {this.props.children}
    </div>
  }
}
