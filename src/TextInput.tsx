import * as React from "react";

declare let tau: any;

export interface TextInputProps {
  name?: string
  placeholder?: string
  value?: string
  type?: "text" | "password"
  handleChange?: (newVal:string) => void
}

export class TextInput extends React.Component<TextInputProps> {

  private inputRef = React.createRef<HTMLInputElement>();
  private handleChangeBound = this.handleChange.bind(this);
  private visibilityObserver = new IntersectionObserver(this.handleChangeBound, {});

  private widget: any = null;

  render() {
    return <input name={this.props.name} type={this.props.type?this.props.type:"text"} value={this.props.value} placeholder={this.props.placeholder} onChange={()=>{}} ref={this.inputRef}/>
  }

  componentDidMount() {
    this.widget = tau.widget.TextInput(this.inputRef.current);
    this.registerChangeListener();
  }

  componentWillUnmount() {
    this.unregisterChangeListener()
    this.widget.destroy();
  }

  private registerChangeListener() {
    if(!(this.props.handleChange && this.inputRef.current)) {
      return;
    }

    let inputPanes = document.getElementsByClassName("ui-textinput-pane");
    for(var i = 0; i < inputPanes.length; i++) {
      this.visibilityObserver.observe(inputPanes[i]);
    }
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
