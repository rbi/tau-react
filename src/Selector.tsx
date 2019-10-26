import * as React from "react";

declare let tau: any;

export interface SelectorItem {
  title: string
}

export interface SelectorProps {
  items: SelectorItem[]
  onSelected?: (item: SelectorItem) => void
}

export class Selector extends React.Component<SelectorProps> {

  private selectorRef = React.createRef<HTMLDivElement>();
  private selectedItem: SelectorItem|null = null;

  render() {
    return  <div className="ui-selector" ref={this.selectorRef} onClick={this.handleClick.bind(this)} >
      { this.props.items.map((item, index) => {
        return <div key={""+index} className="ui-item" data-title={item.title} />
      })}
    </div>
  }

  componentDidMount() {
    if(!this.selectorRef.current) {
      throw "Expected HTML element for the selector to be present but it wasnt."
    }

    this.selectorRef.current.addEventListener("selectoritemchange", (ev: any) => {
      this.selectedItem = this.props.items[ev.detail.index];
    });

    let radius = window.innerHeight / 2 * 0.8;
    tau.widget.Selector(this.selectorRef.current, {itemRadius: radius});
  }

  private handleClick(event: React.MouseEvent) {
    if(!this.props.onSelected) {
      return
    }
    if((event.target as any).classList.contains("ui-selector-indicator") && this.selectedItem) {
      this.props.onSelected(this.selectedItem);
    }
  }
}
