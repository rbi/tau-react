import * as React from "react";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMoreButtonClicked?: () => void;
}

export class Header extends React.Component<HeaderProps> {
  render() {
    return <header className={"ui-header" + this.props.onMoreButtonClicked? " ui-has-more":""}>
      { this.props.title &&
        <h2 className="ui-title">
            {this.props.title}
        </h2>
      }
      { this.props.subtitle &&
        <h3 className="ui-subtitle">
          {this.props.subtitle}
        </h3>
      }
      {this.props.onMoreButtonClicked &&
        <button type="button" className="ui-more" onClick={this.props.onMoreButtonClicked} style={{zIndex: 1000}}/>
      }
    </header>
  }
}
