import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
//import LoginButton from './Authentication/LoginButton';
//import LogoutButton from './Authentication/LogoutButton';
//import Profile from './Authentication/Profile';

import './NavMenu.css';
import NavSection from './Authentication/NavSection';
import FilterInput from './FilterData';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            collapsed: true,
            dropdownOpen: false,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" container light>
                    <NavbarBrand tag={Link} to="/">      <img
                        src="https://scidata.nyc3.cdn.digitaloceanspaces.com/GeoCooker/GKinlineBLACK.png"
                        alt="Logo"
                        style={{ width: '300px', height: 'auto' }}
                    /></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

                        <ul className="navbar-nav flex-grow">

                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/AddRecipe">Add Recipe</NavLink>
                            </NavItem>
                            <hr style={{ borderTop: '1px solid lightgrey', margin: '10px 0' }} />
                            <NavSection></NavSection>
                            
                               
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}



