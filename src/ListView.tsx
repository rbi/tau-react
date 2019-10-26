import * as React from "react";

declare let tau: any;

export interface ListElementProps {
  divider?: boolean
}

export class ListElement extends React.Component<ListElementProps> {

  render() {
    return <li className={this.props.divider?"ui-listview-divider":""}>{this.props.children}</li>
  }
}

export class ListView extends React.Component {

  private listRef = React.createRef<HTMLUListElement>()

  render() {
    return <ul className="ui-listview" ref={this.listRef}>
      {this.props.children}
    </ul>
  }

  componentDidMount() {
    if(tau && tau.support.shape.circle) {
      tau.widget.Listview(this.listRef.current);
    }
  }
}

