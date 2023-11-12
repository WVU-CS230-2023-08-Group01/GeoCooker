import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
import './Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div id='root'>
        <NavMenu id='nav-menu'/>
        <Container tag="main" id='container'>
          {this.props.children}
        </Container>
        <Footer id='footer' />
      </div>
    );
  }
}
