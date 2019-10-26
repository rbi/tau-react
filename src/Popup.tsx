import * as React from "react";

declare let tau: any;

export interface PopupProps {
  title?: string;
  onClose: () => void;
}

export class Popup extends React.Component<PopupProps> {

  private popupRef = React.createRef<HTMLDivElement>();

  render() {
    return <div className="ui-popup" ref={this.popupRef}>
      { this.props.title &&
        <div className="ui-popup-header">
          {this.props.title}
        </div>
      }
      <div className="ui-popup-content">
        { this.props.children }
      </div>
    </div>
  }

  componentDidMount() {
    if(! this.popupRef.current) {
      throw "Expected popup HTML element to be present but it wasn't.";
    }
    this.popupRef.current.addEventListener("popuphide", this.props.onClose);
    tau.openPopup(this.popupRef.current);
  }

  componentWillUnmount() {
    tau.closePopup(this.popupRef.current);
  }
}
