import * as React from "react";

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
  private registerChangeListenerBound = this.registerChangeListener.bind(this);

  private selfVisibilityObserver = new IntersectionObserver(this.registerChangeListenerBound, {});

  render() {
    return <input name={this.props.name} type={this.props.type?this.props.type:"text"} value={this.props.value} placeholder={this.props.placeholder} onChange={()=>{}} ref={this.inputRef}/>
  }

  componentDidMount() {
    if(!(this.props.handleChange && this.inputRef.current)) {
      return;
    }
    // ui-textinput-pane element is createy by tau which hasn't done so yet when the component did mount.
    this.selfVisibilityObserver.observe(this.inputRef.current);
  }

  componentWillUnmount() {
    this.unregisterChangeListener()
  }

  private registerChangeListener() {
    if(!this.inputRef.current) {
      return;
    }

    let inputPanes = document.getElementsByClassName("ui-textinput-pane");
    for(var i = 0; i < inputPanes.length; i++) {
      this.visibilityObserver.observe(inputPanes[i]);
    }
  }

  private unregisterChangeListener() {
    this.visibilityObserver.disconnect
    this.selfVisibilityObserver.disconnect
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
