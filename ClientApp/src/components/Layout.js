import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';
import { Footer } from './Footer'

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div id='root'>
        <NavMenu id='nav-menu'/>
        <Container tag="main" id='container'>
          {this.props.children}
        </Container>
        {/*{ <Footer id='footer' /> }*/}

      </div>
    );
  }
}
