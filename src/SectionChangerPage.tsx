import * as React from 'react'

import {Page, PageProps } from "./Page"
import {HardwareButton} from "./HardwareButton"

declare let tau: any;

export interface SectionProps {
  active?: boolean
}

export class Section extends React.Component<SectionProps> {
  render() {
    return <section className={this.props.active? "ui-section-active": ""}>
      {this.props.children}
    </section>
  }
}

export interface SectionChangerPageProps {
  active?: boolean
  onHardwareButton?: (button: HardwareButton) => void
    changeSectionOnRotaryDent?: boolean
  header?: JSX.Element;
  children: JSX.Element[];
}


export class SectionChangerPage extends React.Component<SectionChangerPageProps> {
  private pageIndicatorRef = React.createRef<HTMLDivElement>();
  private sectionChangerRef = React.createRef<HTMLDivElement>();

  private sectionChanger: any;
  private indicator: any;

  render() {

    return <Page active={this.props.active} onHardwareButton={this.props.onHardwareButton} onPageBeforeShow={() => this.setupPageIndicator()} onPageHide={() => this.tearDownPageIndicator()}>
      {this.props.header && this.props.header}
      <div className="ui-page-indicator" ref={this.pageIndicatorRef} />
      <div className="ui-content" ref={this.sectionChangerRef} style={{height: "100vh"}/* tau.circle.css messes up the height*/}>
        <div>
          {this.props.children}
        </div>
      </div>
    </Page>
  }

  componentDidMount() {
    if(! this.sectionChangerRef.current) {
      throw "Expected HTML element for the section changer to be present but wasn't."
    }
    this.sectionChangerRef.current.addEventListener("sectionchange", (e: any) => this.indicator.setActive(e.detail.active) , false);
  }


  private setupPageIndicator() {
    this.indicator = tau.widget.PageIndicator(this.pageIndicatorRef.current, {numberOfPages: React.Children.count(this.props.children)});

    let children = React.Children.toArray(this.props.children);
    let activeSection = children.findIndex(child => child && child.props && child.props.active ? child.props.active: false);
    if(activeSection != -1) {
      this.indicator.setActive(activeSection);
    }

    this.sectionChanger = tau.widget.SectionChanger(this.sectionChangerRef.current, {
      circular: false,
      orientation: "horizontal"
    });
    if (this.props.changeSectionOnRotaryDent !== undefined && !this.props.changeSectionOnRotaryDent) {
      document.removeEventListener("rotarydetent", this.sectionChanger, true);
    }
  }

  private tearDownPageIndicator() {
    this.sectionChanger.destroy();
    this.indicator.destroy();
  }
}
