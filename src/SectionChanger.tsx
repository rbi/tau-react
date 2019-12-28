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

export interface SectionChangerProps {
  changeSectionOnRotaryDent?: boolean
  children: JSX.Element[];
}

class Aux extends React.Component {
  render() {
    return this.props.children;
  }
}


export class SectionChanger extends React.Component<SectionChangerProps> {
  private pageIndicatorRef = React.createRef<HTMLDivElement>();
  private sectionChangerRef = React.createRef<HTMLDivElement>();

  private setupPageIndicatorBound = this.setupPageIndicator.bind(this);
  private tearDownPageIndicatorBound = this.tearDownPageIndicator.bind(this);

  private sectionChanger: any;
  private indicator: any;

  render() {

    return <Aux>
      <div className="ui-page-indicator" ref={this.pageIndicatorRef} />
      <div className="ui-content" ref={this.sectionChangerRef} style={{height: "100vh"}/* tau.circle.css messes up the height*/}>
        <div>
          {this.props.children}
        </div>
      </div>
    </Aux>
  }

  componentDidMount() {
    if(! this.sectionChangerRef.current) {
      throw "Expected HTML element for the section changer to be present but wasn't."
    }
    this.sectionChangerRef.current.addEventListener("sectionchange", (e: any) => this.indicator.setActive(e.detail.active) , false);

    let page = this.getNearestPage();
    if (page) {
      page.addEventListener("pagebeforeshow", this.setupPageIndicatorBound);
      page.addEventListener("pagehide", this.tearDownPageIndicatorBound);
    }
  }

  componentWillUnmount() {
    let page = this.getNearestPage();
    if (page) {
      page.removeEventListener("pagebeforeshow", this.setupPageIndicatorBound);
      page.removeEventListener("pagehide", this.tearDownPageIndicatorBound);
    }
  }

  private getNearestPage() {
    let selectors =  tau.util.selectors;
    return selectors.getClosestByClass(this.sectionChangerRef.current, "ui-page");
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
