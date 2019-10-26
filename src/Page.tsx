import * as React from "react";

import {HardwareButton} from "./HardwareButton";

declare let tau: any;

export interface PageProps {
  active?: boolean
  onPageBeforeShow?: () => void
    onPageHide?: () => void
    onHardwareButton?: (button: HardwareButton) => void
}

export class Page extends React.Component<PageProps> {

  private pageRef = React.createRef<HTMLDivElement>();
  private handleTizenHwKeyBound: (e:any) => void;
  private handleRotaryDetentBound: (e:any) => void;

  constructor(props: PageProps) {
    super(props)
    this.handleTizenHwKeyBound = this.handleTizenHwKey.bind(this)
    this.handleRotaryDetentBound = this.handleRotaryDetent.bind(this);
  }

  render() {
    return <div className="ui-page" ref={this.pageRef}>
      {this.props.children}
    </div>
  }

  componentDidMount() {
    if(! this.pageRef.current) {
      throw "Expected HTML element for the page to be present but wasn't."
    }

    if(this.props.onPageBeforeShow) {
      this.pageRef.current.addEventListener("pagebeforeshow", this.props.onPageBeforeShow);
    }

    if(this.props.onPageHide) {
      this.pageRef.current.addEventListener("pagehide", this.props.onPageHide);
    }

    this.registerHardwareButtonListener();
  }

  componentDidUpdate() {
    if(this.props.active) {
      tau.changePage(this.pageRef.current)
    }
    this.registerHardwareButtonListener();
  }

  componentWillUnmount() {
    this.unregisterHardwareButtonListener();
  }

  private registerHardwareButtonListener() {
    this.unregisterHardwareButtonListener()

    if(this.props.onHardwareButton && this.props.active) {
      document.addEventListener('tizenhwkey', this.handleTizenHwKeyBound);
      window.addEventListener("rotarydetent", this.handleRotaryDetentBound);
    }
  }

  private unregisterHardwareButtonListener() {
    document.removeEventListener('tizenhwkey', this.handleTizenHwKeyBound);
    window.removeEventListener("rotarydetent", this.handleRotaryDetentBound);
  }

  private handleTizenHwKey(e: any) {
    if(this.props.onHardwareButton) {
      this.props.onHardwareButton(e.keyName);
    }
  }

  private handleRotaryDetent(e: any) {
    if(!this.props.onHardwareButton) {
      return
    }
    const direction = e.detail.direction;
    if(direction === "CW") {
      this.props.onHardwareButton(HardwareButton.ROTARY_DETENT_CLOCKWISE);
    } if(direction === "CCW") {
      this.props.onHardwareButton(HardwareButton.ROTARY_DETENT_COUNTER_CLOCKWISE);
    }
  }
}
