import * as React from "react";

export interface TextInputProps {
  name?: string
  placeholder?: string
  value?: string
  type?: "text" | "password"
  handleChange?: (newVal:string) => void
}

declare let tau: any;

export class TextInput extends React.Component<TextInputProps> {

  private inputRef = React.createRef<HTMLInputElement>();
  private handleChangeBound = this.handleChange.bind(this);
  private visibilityObserver = new IntersectionObserver(this.handleChangeBound, {});

  render() {
    return <input name={this.props.name} type={this.props.type?this.props.type:"text"} value={this.props.value} placeholder={this.props.placeholder} onChange={()=>{}} ref={this.inputRef}/>
  }

  componentDidMount() {
    this.registerChangeListener();
  }

  componentWillUnmount() {
    this.unregisterChangeListener()
  }

  private registerChangeListener() {
    if(!(this.props.handleChange && this.inputRef.current)) {
      return;
    }

    let selectors =  tau.util.selectors;
    let page = selectors.getClosestByClass(this.inputRef.current, "ui-page");
    if (!page) {
      return;
    }

    var textInputPane = selectors.getChildrenByClass(page, "ui-textinput-pane")[0];
    if (!textInputPane) {
      textInputPane = document.createElement("div");
      textInputPane.classList.add("ui-textinput-pane")
      page.appendChild(textInputPane);
    }
    this.visibilityObserver.observe(textInputPane);
  }

  private unregisterChangeListener() {
    this.visibilityObserver.disconnect
  }

  private handleChange() {
    if(!(this.props.handleChange && this.inputRef.current)) {
      return;
    }
    if(this.inputRef.current.value !== this.props.value) {
      this.props.handleChange(this.inputRef.current.value)
    }
  }
}
