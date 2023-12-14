import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import Profile from "./Profile";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export const NavSection = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <div className="container">
            {!isAuthenticated && (
                <>
                    <LoginButton />
                </>
            )}
            {isAuthenticated && (
                <>

                    <LogoutButton className="d-inline"/>
                    <NavLink tag={Link} className="d-inline text-dark" to="/Profile">Profile</NavLink>
                    <img src={user.picture} alt="User Avatar" href="/Profile" className="rounded-circle img-fluid d-inline align-top"   style={{ width: '30px', height: '30px' }}
/>
                </>
            )}
        </div>
    );
};

export default NavSection;